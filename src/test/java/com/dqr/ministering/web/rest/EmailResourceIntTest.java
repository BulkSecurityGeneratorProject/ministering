package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.Email;
import com.dqr.ministering.repository.EmailRepository;
import com.dqr.ministering.repository.search.EmailSearchRepository;
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

import com.dqr.ministering.domain.enumeration.EmailType;
/**
 * Test class for the EmailResource REST controller.
 *
 * @see EmailResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class EmailResourceIntTest {

    private static final EmailType DEFAULT_TYPE = EmailType.INDIVIDUAL;
    private static final EmailType UPDATED_TYPE = EmailType.HOUSEHOLD;

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private EmailRepository emailRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.EmailSearchRepositoryMockConfiguration
     */
    @Autowired
    private EmailSearchRepository mockEmailSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmailMockMvc;

    private Email email;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmailResource emailResource = new EmailResource(emailRepository, mockEmailSearchRepository);
        this.restEmailMockMvc = MockMvcBuilders.standaloneSetup(emailResource)
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
    public static Email createEntity(EntityManager em) {
        Email email = new Email()
            .type(DEFAULT_TYPE)
            .address(DEFAULT_ADDRESS);
        return email;
    }

    @Before
    public void initTest() {
        email = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmail() throws Exception {
        int databaseSizeBeforeCreate = emailRepository.findAll().size();

        // Create the Email
        restEmailMockMvc.perform(post("/api/emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isCreated());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeCreate + 1);
        Email testEmail = emailList.get(emailList.size() - 1);
        assertThat(testEmail.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testEmail.getAddress()).isEqualTo(DEFAULT_ADDRESS);

        // Validate the Email in Elasticsearch
        verify(mockEmailSearchRepository, times(1)).save(testEmail);
    }

    @Test
    @Transactional
    public void createEmailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emailRepository.findAll().size();

        // Create the Email with an existing ID
        email.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmailMockMvc.perform(post("/api/emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isBadRequest());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeCreate);

        // Validate the Email in Elasticsearch
        verify(mockEmailSearchRepository, times(0)).save(email);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emailRepository.findAll().size();
        // set the field null
        email.setType(null);

        // Create the Email, which fails.

        restEmailMockMvc.perform(post("/api/emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isBadRequest());

        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmails() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);

        // Get all the emailList
        restEmailMockMvc.perform(get("/api/emails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(email.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }
    

    @Test
    @Transactional
    public void getEmail() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);

        // Get the email
        restEmailMockMvc.perform(get("/api/emails/{id}", email.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(email.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEmail() throws Exception {
        // Get the email
        restEmailMockMvc.perform(get("/api/emails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmail() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);

        int databaseSizeBeforeUpdate = emailRepository.findAll().size();

        // Update the email
        Email updatedEmail = emailRepository.findById(email.getId()).get();
        // Disconnect from session so that the updates on updatedEmail are not directly saved in db
        em.detach(updatedEmail);
        updatedEmail
            .type(UPDATED_TYPE)
            .address(UPDATED_ADDRESS);

        restEmailMockMvc.perform(put("/api/emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmail)))
            .andExpect(status().isOk());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeUpdate);
        Email testEmail = emailList.get(emailList.size() - 1);
        assertThat(testEmail.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testEmail.getAddress()).isEqualTo(UPDATED_ADDRESS);

        // Validate the Email in Elasticsearch
        verify(mockEmailSearchRepository, times(1)).save(testEmail);
    }

    @Test
    @Transactional
    public void updateNonExistingEmail() throws Exception {
        int databaseSizeBeforeUpdate = emailRepository.findAll().size();

        // Create the Email

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmailMockMvc.perform(put("/api/emails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isBadRequest());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Email in Elasticsearch
        verify(mockEmailSearchRepository, times(0)).save(email);
    }

    @Test
    @Transactional
    public void deleteEmail() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);

        int databaseSizeBeforeDelete = emailRepository.findAll().size();

        // Get the email
        restEmailMockMvc.perform(delete("/api/emails/{id}", email.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Email in Elasticsearch
        verify(mockEmailSearchRepository, times(1)).deleteById(email.getId());
    }

    @Test
    @Transactional
    public void searchEmail() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);
        when(mockEmailSearchRepository.search(queryStringQuery("id:" + email.getId())))
            .thenReturn(Collections.singletonList(email));
        // Search the email
        restEmailMockMvc.perform(get("/api/_search/emails?query=id:" + email.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(email.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Email.class);
        Email email1 = new Email();
        email1.setId(1L);
        Email email2 = new Email();
        email2.setId(email1.getId());
        assertThat(email1).isEqualTo(email2);
        email2.setId(2L);
        assertThat(email1).isNotEqualTo(email2);
        email1.setId(null);
        assertThat(email1).isNotEqualTo(email2);
    }
}
