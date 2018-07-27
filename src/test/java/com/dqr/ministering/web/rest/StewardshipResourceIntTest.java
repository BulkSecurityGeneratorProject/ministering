package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.Stewardship;
import com.dqr.ministering.repository.StewardshipRepository;
import com.dqr.ministering.repository.search.StewardshipSearchRepository;
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
 * Test class for the StewardshipResource REST controller.
 *
 * @see StewardshipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class StewardshipResourceIntTest {

    @Autowired
    private StewardshipRepository stewardshipRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.StewardshipSearchRepositoryMockConfiguration
     */
    @Autowired
    private StewardshipSearchRepository mockStewardshipSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStewardshipMockMvc;

    private Stewardship stewardship;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StewardshipResource stewardshipResource = new StewardshipResource(stewardshipRepository, mockStewardshipSearchRepository);
        this.restStewardshipMockMvc = MockMvcBuilders.standaloneSetup(stewardshipResource)
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
    public static Stewardship createEntity(EntityManager em) {
        Stewardship stewardship = new Stewardship();
        return stewardship;
    }

    @Before
    public void initTest() {
        stewardship = createEntity(em);
    }

    @Test
    @Transactional
    public void createStewardship() throws Exception {
        int databaseSizeBeforeCreate = stewardshipRepository.findAll().size();

        // Create the Stewardship
        restStewardshipMockMvc.perform(post("/api/stewardships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stewardship)))
            .andExpect(status().isCreated());

        // Validate the Stewardship in the database
        List<Stewardship> stewardshipList = stewardshipRepository.findAll();
        assertThat(stewardshipList).hasSize(databaseSizeBeforeCreate + 1);
        Stewardship testStewardship = stewardshipList.get(stewardshipList.size() - 1);

        // Validate the Stewardship in Elasticsearch
        verify(mockStewardshipSearchRepository, times(1)).save(testStewardship);
    }

    @Test
    @Transactional
    public void createStewardshipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stewardshipRepository.findAll().size();

        // Create the Stewardship with an existing ID
        stewardship.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStewardshipMockMvc.perform(post("/api/stewardships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stewardship)))
            .andExpect(status().isBadRequest());

        // Validate the Stewardship in the database
        List<Stewardship> stewardshipList = stewardshipRepository.findAll();
        assertThat(stewardshipList).hasSize(databaseSizeBeforeCreate);

        // Validate the Stewardship in Elasticsearch
        verify(mockStewardshipSearchRepository, times(0)).save(stewardship);
    }

    @Test
    @Transactional
    public void getAllStewardships() throws Exception {
        // Initialize the database
        stewardshipRepository.saveAndFlush(stewardship);

        // Get all the stewardshipList
        restStewardshipMockMvc.perform(get("/api/stewardships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stewardship.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getStewardship() throws Exception {
        // Initialize the database
        stewardshipRepository.saveAndFlush(stewardship);

        // Get the stewardship
        restStewardshipMockMvc.perform(get("/api/stewardships/{id}", stewardship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stewardship.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingStewardship() throws Exception {
        // Get the stewardship
        restStewardshipMockMvc.perform(get("/api/stewardships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStewardship() throws Exception {
        // Initialize the database
        stewardshipRepository.saveAndFlush(stewardship);

        int databaseSizeBeforeUpdate = stewardshipRepository.findAll().size();

        // Update the stewardship
        Stewardship updatedStewardship = stewardshipRepository.findById(stewardship.getId()).get();
        // Disconnect from session so that the updates on updatedStewardship are not directly saved in db
        em.detach(updatedStewardship);

        restStewardshipMockMvc.perform(put("/api/stewardships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStewardship)))
            .andExpect(status().isOk());

        // Validate the Stewardship in the database
        List<Stewardship> stewardshipList = stewardshipRepository.findAll();
        assertThat(stewardshipList).hasSize(databaseSizeBeforeUpdate);
        Stewardship testStewardship = stewardshipList.get(stewardshipList.size() - 1);

        // Validate the Stewardship in Elasticsearch
        verify(mockStewardshipSearchRepository, times(1)).save(testStewardship);
    }

    @Test
    @Transactional
    public void updateNonExistingStewardship() throws Exception {
        int databaseSizeBeforeUpdate = stewardshipRepository.findAll().size();

        // Create the Stewardship

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStewardshipMockMvc.perform(put("/api/stewardships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stewardship)))
            .andExpect(status().isBadRequest());

        // Validate the Stewardship in the database
        List<Stewardship> stewardshipList = stewardshipRepository.findAll();
        assertThat(stewardshipList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Stewardship in Elasticsearch
        verify(mockStewardshipSearchRepository, times(0)).save(stewardship);
    }

    @Test
    @Transactional
    public void deleteStewardship() throws Exception {
        // Initialize the database
        stewardshipRepository.saveAndFlush(stewardship);

        int databaseSizeBeforeDelete = stewardshipRepository.findAll().size();

        // Get the stewardship
        restStewardshipMockMvc.perform(delete("/api/stewardships/{id}", stewardship.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stewardship> stewardshipList = stewardshipRepository.findAll();
        assertThat(stewardshipList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Stewardship in Elasticsearch
        verify(mockStewardshipSearchRepository, times(1)).deleteById(stewardship.getId());
    }

    @Test
    @Transactional
    public void searchStewardship() throws Exception {
        // Initialize the database
        stewardshipRepository.saveAndFlush(stewardship);
        when(mockStewardshipSearchRepository.search(queryStringQuery("id:" + stewardship.getId())))
            .thenReturn(Collections.singletonList(stewardship));
        // Search the stewardship
        restStewardshipMockMvc.perform(get("/api/_search/stewardships?query=id:" + stewardship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stewardship.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stewardship.class);
        Stewardship stewardship1 = new Stewardship();
        stewardship1.setId(1L);
        Stewardship stewardship2 = new Stewardship();
        stewardship2.setId(stewardship1.getId());
        assertThat(stewardship1).isEqualTo(stewardship2);
        stewardship2.setId(2L);
        assertThat(stewardship1).isNotEqualTo(stewardship2);
        stewardship1.setId(null);
        assertThat(stewardship1).isNotEqualTo(stewardship2);
    }
}
