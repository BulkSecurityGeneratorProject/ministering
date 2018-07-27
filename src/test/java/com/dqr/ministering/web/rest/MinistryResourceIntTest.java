package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.Ministry;
import com.dqr.ministering.repository.MinistryRepository;
import com.dqr.ministering.repository.search.MinistrySearchRepository;
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
 * Test class for the MinistryResource REST controller.
 *
 * @see MinistryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class MinistryResourceIntTest {

    @Autowired
    private MinistryRepository ministryRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.MinistrySearchRepositoryMockConfiguration
     */
    @Autowired
    private MinistrySearchRepository mockMinistrySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMinistryMockMvc;

    private Ministry ministry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MinistryResource ministryResource = new MinistryResource(ministryRepository, mockMinistrySearchRepository);
        this.restMinistryMockMvc = MockMvcBuilders.standaloneSetup(ministryResource)
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
    public static Ministry createEntity(EntityManager em) {
        Ministry ministry = new Ministry();
        return ministry;
    }

    @Before
    public void initTest() {
        ministry = createEntity(em);
    }

    @Test
    @Transactional
    public void createMinistry() throws Exception {
        int databaseSizeBeforeCreate = ministryRepository.findAll().size();

        // Create the Ministry
        restMinistryMockMvc.perform(post("/api/ministries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministry)))
            .andExpect(status().isCreated());

        // Validate the Ministry in the database
        List<Ministry> ministryList = ministryRepository.findAll();
        assertThat(ministryList).hasSize(databaseSizeBeforeCreate + 1);
        Ministry testMinistry = ministryList.get(ministryList.size() - 1);

        // Validate the Ministry in Elasticsearch
        verify(mockMinistrySearchRepository, times(1)).save(testMinistry);
    }

    @Test
    @Transactional
    public void createMinistryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ministryRepository.findAll().size();

        // Create the Ministry with an existing ID
        ministry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMinistryMockMvc.perform(post("/api/ministries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministry)))
            .andExpect(status().isBadRequest());

        // Validate the Ministry in the database
        List<Ministry> ministryList = ministryRepository.findAll();
        assertThat(ministryList).hasSize(databaseSizeBeforeCreate);

        // Validate the Ministry in Elasticsearch
        verify(mockMinistrySearchRepository, times(0)).save(ministry);
    }

    @Test
    @Transactional
    public void getAllMinistries() throws Exception {
        // Initialize the database
        ministryRepository.saveAndFlush(ministry);

        // Get all the ministryList
        restMinistryMockMvc.perform(get("/api/ministries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ministry.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getMinistry() throws Exception {
        // Initialize the database
        ministryRepository.saveAndFlush(ministry);

        // Get the ministry
        restMinistryMockMvc.perform(get("/api/ministries/{id}", ministry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ministry.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMinistry() throws Exception {
        // Get the ministry
        restMinistryMockMvc.perform(get("/api/ministries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMinistry() throws Exception {
        // Initialize the database
        ministryRepository.saveAndFlush(ministry);

        int databaseSizeBeforeUpdate = ministryRepository.findAll().size();

        // Update the ministry
        Ministry updatedMinistry = ministryRepository.findById(ministry.getId()).get();
        // Disconnect from session so that the updates on updatedMinistry are not directly saved in db
        em.detach(updatedMinistry);

        restMinistryMockMvc.perform(put("/api/ministries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMinistry)))
            .andExpect(status().isOk());

        // Validate the Ministry in the database
        List<Ministry> ministryList = ministryRepository.findAll();
        assertThat(ministryList).hasSize(databaseSizeBeforeUpdate);
        Ministry testMinistry = ministryList.get(ministryList.size() - 1);

        // Validate the Ministry in Elasticsearch
        verify(mockMinistrySearchRepository, times(1)).save(testMinistry);
    }

    @Test
    @Transactional
    public void updateNonExistingMinistry() throws Exception {
        int databaseSizeBeforeUpdate = ministryRepository.findAll().size();

        // Create the Ministry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMinistryMockMvc.perform(put("/api/ministries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ministry)))
            .andExpect(status().isBadRequest());

        // Validate the Ministry in the database
        List<Ministry> ministryList = ministryRepository.findAll();
        assertThat(ministryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Ministry in Elasticsearch
        verify(mockMinistrySearchRepository, times(0)).save(ministry);
    }

    @Test
    @Transactional
    public void deleteMinistry() throws Exception {
        // Initialize the database
        ministryRepository.saveAndFlush(ministry);

        int databaseSizeBeforeDelete = ministryRepository.findAll().size();

        // Get the ministry
        restMinistryMockMvc.perform(delete("/api/ministries/{id}", ministry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ministry> ministryList = ministryRepository.findAll();
        assertThat(ministryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Ministry in Elasticsearch
        verify(mockMinistrySearchRepository, times(1)).deleteById(ministry.getId());
    }

    @Test
    @Transactional
    public void searchMinistry() throws Exception {
        // Initialize the database
        ministryRepository.saveAndFlush(ministry);
        when(mockMinistrySearchRepository.search(queryStringQuery("id:" + ministry.getId())))
            .thenReturn(Collections.singletonList(ministry));
        // Search the ministry
        restMinistryMockMvc.perform(get("/api/_search/ministries?query=id:" + ministry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ministry.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ministry.class);
        Ministry ministry1 = new Ministry();
        ministry1.setId(1L);
        Ministry ministry2 = new Ministry();
        ministry2.setId(ministry1.getId());
        assertThat(ministry1).isEqualTo(ministry2);
        ministry2.setId(2L);
        assertThat(ministry1).isNotEqualTo(ministry2);
        ministry1.setId(null);
        assertThat(ministry1).isNotEqualTo(ministry2);
    }
}
