package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.Org;
import com.dqr.ministering.repository.OrgRepository;
import com.dqr.ministering.repository.search.OrgSearchRepository;
import com.dqr.ministering.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.dqr.ministering.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrgResource REST controller.
 *
 * @see OrgResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class OrgResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private OrgRepository orgRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.OrgSearchRepositoryMockConfiguration
     */
    @Autowired
    private OrgSearchRepository mockOrgSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrgMockMvc;

    private Org org;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrgResource orgResource = new OrgResource(orgRepository, mockOrgSearchRepository);
        this.restOrgMockMvc = MockMvcBuilders.standaloneSetup(orgResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Org createEntity(EntityManager em) {
        Org org = new Org()
            .name(DEFAULT_NAME);
        return org;
    }

    @Before
    public void initTest() {
        org = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrg() throws Exception {
        int databaseSizeBeforeCreate = orgRepository.findAll().size();

        // Create the Org
        restOrgMockMvc.perform(post("/api/orgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(org)))
            .andExpect(status().isCreated());

        // Validate the Org in the database
        List<Org> orgList = orgRepository.findAll();
        assertThat(orgList).hasSize(databaseSizeBeforeCreate + 1);
        Org testOrg = orgList.get(orgList.size() - 1);
        assertThat(testOrg.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Org in Elasticsearch
        verify(mockOrgSearchRepository, times(1)).save(testOrg);
    }

    @Test
    @Transactional
    public void createOrgWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orgRepository.findAll().size();

        // Create the Org with an existing ID
        org.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrgMockMvc.perform(post("/api/orgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(org)))
            .andExpect(status().isBadRequest());

        // Validate the Org in the database
        List<Org> orgList = orgRepository.findAll();
        assertThat(orgList).hasSize(databaseSizeBeforeCreate);

        // Validate the Org in Elasticsearch
        verify(mockOrgSearchRepository, times(0)).save(org);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = orgRepository.findAll().size();
        // set the field null
        org.setName(null);

        // Create the Org, which fails.

        restOrgMockMvc.perform(post("/api/orgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(org)))
            .andExpect(status().isBadRequest());

        List<Org> orgList = orgRepository.findAll();
        assertThat(orgList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrgs() throws Exception {
        // Initialize the database
        orgRepository.saveAndFlush(org);

        // Get all the orgList
        restOrgMockMvc.perform(get("/api/orgs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(org.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getOrg() throws Exception {
        // Initialize the database
        orgRepository.saveAndFlush(org);

        // Get the org
        restOrgMockMvc.perform(get("/api/orgs/{id}", org.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(org.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOrg() throws Exception {
        // Get the org
        restOrgMockMvc.perform(get("/api/orgs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrg() throws Exception {
        // Initialize the database
        orgRepository.saveAndFlush(org);

        int databaseSizeBeforeUpdate = orgRepository.findAll().size();

        // Update the org
        Org updatedOrg = orgRepository.findById(org.getId()).get();
        // Disconnect from session so that the updates on updatedOrg are not directly saved in db
        em.detach(updatedOrg);
        updatedOrg
            .name(UPDATED_NAME);

        restOrgMockMvc.perform(put("/api/orgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrg)))
            .andExpect(status().isOk());

        // Validate the Org in the database
        List<Org> orgList = orgRepository.findAll();
        assertThat(orgList).hasSize(databaseSizeBeforeUpdate);
        Org testOrg = orgList.get(orgList.size() - 1);
        assertThat(testOrg.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Org in Elasticsearch
        verify(mockOrgSearchRepository, times(1)).save(testOrg);
    }

    @Test
    @Transactional
    public void updateNonExistingOrg() throws Exception {
        int databaseSizeBeforeUpdate = orgRepository.findAll().size();

        // Create the Org

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrgMockMvc.perform(put("/api/orgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(org)))
            .andExpect(status().isBadRequest());

        // Validate the Org in the database
        List<Org> orgList = orgRepository.findAll();
        assertThat(orgList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Org in Elasticsearch
        verify(mockOrgSearchRepository, times(0)).save(org);
    }

    @Test
    @Transactional
    public void deleteOrg() throws Exception {
        // Initialize the database
        orgRepository.saveAndFlush(org);

        int databaseSizeBeforeDelete = orgRepository.findAll().size();

        // Get the org
        restOrgMockMvc.perform(delete("/api/orgs/{id}", org.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Org> orgList = orgRepository.findAll();
        assertThat(orgList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Org in Elasticsearch
        verify(mockOrgSearchRepository, times(1)).deleteById(org.getId());
    }

    @Test
    @Transactional
    public void searchOrg() throws Exception {
        // Initialize the database
        orgRepository.saveAndFlush(org);
        when(mockOrgSearchRepository.search(queryStringQuery("id:" + org.getId())))
            .thenReturn(Collections.singletonList(org));
        // Search the org
        restOrgMockMvc.perform(get("/api/_search/orgs?query=id:" + org.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(org.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Org.class);
        Org org1 = new Org();
        org1.setId(1L);
        Org org2 = new Org();
        org2.setId(org1.getId());
        assertThat(org1).isEqualTo(org2);
        org2.setId(2L);
        assertThat(org1).isNotEqualTo(org2);
        org1.setId(null);
        assertThat(org1).isNotEqualTo(org2);
    }
}
