package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.Companionship;
import com.dqr.ministering.repository.CompanionshipRepository;
import com.dqr.ministering.repository.search.CompanionshipSearchRepository;
import com.dqr.ministering.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
 * Test class for the CompanionshipResource REST controller.
 *
 * @see CompanionshipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class CompanionshipResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CompanionshipRepository companionshipRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.CompanionshipSearchRepositoryMockConfiguration
     */
    @Autowired
    private CompanionshipSearchRepository mockCompanionshipSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCompanionshipMockMvc;

    private Companionship companionship;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanionshipResource companionshipResource = new CompanionshipResource(companionshipRepository, mockCompanionshipSearchRepository);
        this.restCompanionshipMockMvc = MockMvcBuilders.standaloneSetup(companionshipResource)
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
    public static Companionship createEntity(EntityManager em) {
        Companionship companionship = new Companionship()
            .name(DEFAULT_NAME);
        return companionship;
    }

    @Before
    public void initTest() {
        companionship = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanionship() throws Exception {
        int databaseSizeBeforeCreate = companionshipRepository.findAll().size();

        // Create the Companionship
        restCompanionshipMockMvc.perform(post("/api/companionships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companionship)))
            .andExpect(status().isCreated());

        // Validate the Companionship in the database
        List<Companionship> companionshipList = companionshipRepository.findAll();
        assertThat(companionshipList).hasSize(databaseSizeBeforeCreate + 1);
        Companionship testCompanionship = companionshipList.get(companionshipList.size() - 1);
        assertThat(testCompanionship.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Companionship in Elasticsearch
        verify(mockCompanionshipSearchRepository, times(1)).save(testCompanionship);
    }

    @Test
    @Transactional
    public void createCompanionshipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companionshipRepository.findAll().size();

        // Create the Companionship with an existing ID
        companionship.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanionshipMockMvc.perform(post("/api/companionships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companionship)))
            .andExpect(status().isBadRequest());

        // Validate the Companionship in the database
        List<Companionship> companionshipList = companionshipRepository.findAll();
        assertThat(companionshipList).hasSize(databaseSizeBeforeCreate);

        // Validate the Companionship in Elasticsearch
        verify(mockCompanionshipSearchRepository, times(0)).save(companionship);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = companionshipRepository.findAll().size();
        // set the field null
        companionship.setName(null);

        // Create the Companionship, which fails.

        restCompanionshipMockMvc.perform(post("/api/companionships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companionship)))
            .andExpect(status().isBadRequest());

        List<Companionship> companionshipList = companionshipRepository.findAll();
        assertThat(companionshipList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCompanionships() throws Exception {
        // Initialize the database
        companionshipRepository.saveAndFlush(companionship);

        // Get all the companionshipList
        restCompanionshipMockMvc.perform(get("/api/companionships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companionship.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getCompanionship() throws Exception {
        // Initialize the database
        companionshipRepository.saveAndFlush(companionship);

        // Get the companionship
        restCompanionshipMockMvc.perform(get("/api/companionships/{id}", companionship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companionship.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCompanionship() throws Exception {
        // Get the companionship
        restCompanionshipMockMvc.perform(get("/api/companionships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanionship() throws Exception {
        // Initialize the database
        companionshipRepository.saveAndFlush(companionship);

        int databaseSizeBeforeUpdate = companionshipRepository.findAll().size();

        // Update the companionship
        Companionship updatedCompanionship = companionshipRepository.findById(companionship.getId()).get();
        // Disconnect from session so that the updates on updatedCompanionship are not directly saved in db
        em.detach(updatedCompanionship);
        updatedCompanionship
            .name(UPDATED_NAME);

        restCompanionshipMockMvc.perform(put("/api/companionships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanionship)))
            .andExpect(status().isOk());

        // Validate the Companionship in the database
        List<Companionship> companionshipList = companionshipRepository.findAll();
        assertThat(companionshipList).hasSize(databaseSizeBeforeUpdate);
        Companionship testCompanionship = companionshipList.get(companionshipList.size() - 1);
        assertThat(testCompanionship.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Companionship in Elasticsearch
        verify(mockCompanionshipSearchRepository, times(1)).save(testCompanionship);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanionship() throws Exception {
        int databaseSizeBeforeUpdate = companionshipRepository.findAll().size();

        // Create the Companionship

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCompanionshipMockMvc.perform(put("/api/companionships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companionship)))
            .andExpect(status().isBadRequest());

        // Validate the Companionship in the database
        List<Companionship> companionshipList = companionshipRepository.findAll();
        assertThat(companionshipList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Companionship in Elasticsearch
        verify(mockCompanionshipSearchRepository, times(0)).save(companionship);
    }

    @Test
    @Transactional
    public void deleteCompanionship() throws Exception {
        // Initialize the database
        companionshipRepository.saveAndFlush(companionship);

        int databaseSizeBeforeDelete = companionshipRepository.findAll().size();

        // Get the companionship
        restCompanionshipMockMvc.perform(delete("/api/companionships/{id}", companionship.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Companionship> companionshipList = companionshipRepository.findAll();
        assertThat(companionshipList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Companionship in Elasticsearch
        verify(mockCompanionshipSearchRepository, times(1)).deleteById(companionship.getId());
    }

    @Test
    @Transactional
    public void searchCompanionship() throws Exception {
        // Initialize the database
        companionshipRepository.saveAndFlush(companionship);
        when(mockCompanionshipSearchRepository.search(queryStringQuery("id:" + companionship.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(companionship), PageRequest.of(0, 1), 1));
        // Search the companionship
        restCompanionshipMockMvc.perform(get("/api/_search/companionships?query=id:" + companionship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companionship.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Companionship.class);
        Companionship companionship1 = new Companionship();
        companionship1.setId(1L);
        Companionship companionship2 = new Companionship();
        companionship2.setId(companionship1.getId());
        assertThat(companionship1).isEqualTo(companionship2);
        companionship2.setId(2L);
        assertThat(companionship1).isNotEqualTo(companionship2);
        companionship1.setId(null);
        assertThat(companionship1).isNotEqualTo(companionship2);
    }
}
