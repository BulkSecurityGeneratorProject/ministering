package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.Companion;
import com.dqr.ministering.repository.CompanionRepository;
import com.dqr.ministering.repository.search.CompanionSearchRepository;
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
 * Test class for the CompanionResource REST controller.
 *
 * @see CompanionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class CompanionResourceIntTest {

    @Autowired
    private CompanionRepository companionRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.CompanionSearchRepositoryMockConfiguration
     */
    @Autowired
    private CompanionSearchRepository mockCompanionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCompanionMockMvc;

    private Companion companion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanionResource companionResource = new CompanionResource(companionRepository, mockCompanionSearchRepository);
        this.restCompanionMockMvc = MockMvcBuilders.standaloneSetup(companionResource)
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
    public static Companion createEntity(EntityManager em) {
        Companion companion = new Companion();
        return companion;
    }

    @Before
    public void initTest() {
        companion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanion() throws Exception {
        int databaseSizeBeforeCreate = companionRepository.findAll().size();

        // Create the Companion
        restCompanionMockMvc.perform(post("/api/companions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companion)))
            .andExpect(status().isCreated());

        // Validate the Companion in the database
        List<Companion> companionList = companionRepository.findAll();
        assertThat(companionList).hasSize(databaseSizeBeforeCreate + 1);
        Companion testCompanion = companionList.get(companionList.size() - 1);

        // Validate the Companion in Elasticsearch
        verify(mockCompanionSearchRepository, times(1)).save(testCompanion);
    }

    @Test
    @Transactional
    public void createCompanionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companionRepository.findAll().size();

        // Create the Companion with an existing ID
        companion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanionMockMvc.perform(post("/api/companions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companion)))
            .andExpect(status().isBadRequest());

        // Validate the Companion in the database
        List<Companion> companionList = companionRepository.findAll();
        assertThat(companionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Companion in Elasticsearch
        verify(mockCompanionSearchRepository, times(0)).save(companion);
    }

    @Test
    @Transactional
    public void getAllCompanions() throws Exception {
        // Initialize the database
        companionRepository.saveAndFlush(companion);

        // Get all the companionList
        restCompanionMockMvc.perform(get("/api/companions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companion.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getCompanion() throws Exception {
        // Initialize the database
        companionRepository.saveAndFlush(companion);

        // Get the companion
        restCompanionMockMvc.perform(get("/api/companions/{id}", companion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companion.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCompanion() throws Exception {
        // Get the companion
        restCompanionMockMvc.perform(get("/api/companions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanion() throws Exception {
        // Initialize the database
        companionRepository.saveAndFlush(companion);

        int databaseSizeBeforeUpdate = companionRepository.findAll().size();

        // Update the companion
        Companion updatedCompanion = companionRepository.findById(companion.getId()).get();
        // Disconnect from session so that the updates on updatedCompanion are not directly saved in db
        em.detach(updatedCompanion);

        restCompanionMockMvc.perform(put("/api/companions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanion)))
            .andExpect(status().isOk());

        // Validate the Companion in the database
        List<Companion> companionList = companionRepository.findAll();
        assertThat(companionList).hasSize(databaseSizeBeforeUpdate);
        Companion testCompanion = companionList.get(companionList.size() - 1);

        // Validate the Companion in Elasticsearch
        verify(mockCompanionSearchRepository, times(1)).save(testCompanion);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanion() throws Exception {
        int databaseSizeBeforeUpdate = companionRepository.findAll().size();

        // Create the Companion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCompanionMockMvc.perform(put("/api/companions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companion)))
            .andExpect(status().isBadRequest());

        // Validate the Companion in the database
        List<Companion> companionList = companionRepository.findAll();
        assertThat(companionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Companion in Elasticsearch
        verify(mockCompanionSearchRepository, times(0)).save(companion);
    }

    @Test
    @Transactional
    public void deleteCompanion() throws Exception {
        // Initialize the database
        companionRepository.saveAndFlush(companion);

        int databaseSizeBeforeDelete = companionRepository.findAll().size();

        // Get the companion
        restCompanionMockMvc.perform(delete("/api/companions/{id}", companion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Companion> companionList = companionRepository.findAll();
        assertThat(companionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Companion in Elasticsearch
        verify(mockCompanionSearchRepository, times(1)).deleteById(companion.getId());
    }

    @Test
    @Transactional
    public void searchCompanion() throws Exception {
        // Initialize the database
        companionRepository.saveAndFlush(companion);
        when(mockCompanionSearchRepository.search(queryStringQuery("id:" + companion.getId())))
            .thenReturn(Collections.singletonList(companion));
        // Search the companion
        restCompanionMockMvc.perform(get("/api/_search/companions?query=id:" + companion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companion.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Companion.class);
        Companion companion1 = new Companion();
        companion1.setId(1L);
        Companion companion2 = new Companion();
        companion2.setId(companion1.getId());
        assertThat(companion1).isEqualTo(companion2);
        companion2.setId(2L);
        assertThat(companion1).isNotEqualTo(companion2);
        companion1.setId(null);
        assertThat(companion1).isNotEqualTo(companion2);
    }
}
