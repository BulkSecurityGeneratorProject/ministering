package com.dqr.ministering.web.rest;

import com.dqr.ministering.MinisteringApp;

import com.dqr.ministering.domain.SocialMedia;
import com.dqr.ministering.repository.SocialMediaRepository;
import com.dqr.ministering.repository.search.SocialMediaSearchRepository;
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

import com.dqr.ministering.domain.enumeration.SocialMediaType;
/**
 * Test class for the SocialMediaResource REST controller.
 *
 * @see SocialMediaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinisteringApp.class)
public class SocialMediaResourceIntTest {

    private static final SocialMediaType DEFAULT_TYPEYPE = SocialMediaType.FACEBOOK;
    private static final SocialMediaType UPDATED_TYPEYPE = SocialMediaType.TWITTER;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private SocialMediaRepository socialMediaRepository;


    /**
     * This repository is mocked in the com.dqr.ministering.repository.search test package.
     *
     * @see com.dqr.ministering.repository.search.SocialMediaSearchRepositoryMockConfiguration
     */
    @Autowired
    private SocialMediaSearchRepository mockSocialMediaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSocialMediaMockMvc;

    private SocialMedia socialMedia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SocialMediaResource socialMediaResource = new SocialMediaResource(socialMediaRepository, mockSocialMediaSearchRepository);
        this.restSocialMediaMockMvc = MockMvcBuilders.standaloneSetup(socialMediaResource)
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
    public static SocialMedia createEntity(EntityManager em) {
        SocialMedia socialMedia = new SocialMedia()
            .typeype(DEFAULT_TYPEYPE)
            .url(DEFAULT_URL);
        return socialMedia;
    }

    @Before
    public void initTest() {
        socialMedia = createEntity(em);
    }

    @Test
    @Transactional
    public void createSocialMedia() throws Exception {
        int databaseSizeBeforeCreate = socialMediaRepository.findAll().size();

        // Create the SocialMedia
        restSocialMediaMockMvc.perform(post("/api/social-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMedia)))
            .andExpect(status().isCreated());

        // Validate the SocialMedia in the database
        List<SocialMedia> socialMediaList = socialMediaRepository.findAll();
        assertThat(socialMediaList).hasSize(databaseSizeBeforeCreate + 1);
        SocialMedia testSocialMedia = socialMediaList.get(socialMediaList.size() - 1);
        assertThat(testSocialMedia.getTypeype()).isEqualTo(DEFAULT_TYPEYPE);
        assertThat(testSocialMedia.getUrl()).isEqualTo(DEFAULT_URL);

        // Validate the SocialMedia in Elasticsearch
        verify(mockSocialMediaSearchRepository, times(1)).save(testSocialMedia);
    }

    @Test
    @Transactional
    public void createSocialMediaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = socialMediaRepository.findAll().size();

        // Create the SocialMedia with an existing ID
        socialMedia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocialMediaMockMvc.perform(post("/api/social-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMedia)))
            .andExpect(status().isBadRequest());

        // Validate the SocialMedia in the database
        List<SocialMedia> socialMediaList = socialMediaRepository.findAll();
        assertThat(socialMediaList).hasSize(databaseSizeBeforeCreate);

        // Validate the SocialMedia in Elasticsearch
        verify(mockSocialMediaSearchRepository, times(0)).save(socialMedia);
    }

    @Test
    @Transactional
    public void checkTypeypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = socialMediaRepository.findAll().size();
        // set the field null
        socialMedia.setTypeype(null);

        // Create the SocialMedia, which fails.

        restSocialMediaMockMvc.perform(post("/api/social-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMedia)))
            .andExpect(status().isBadRequest());

        List<SocialMedia> socialMediaList = socialMediaRepository.findAll();
        assertThat(socialMediaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSocialMedias() throws Exception {
        // Initialize the database
        socialMediaRepository.saveAndFlush(socialMedia);

        // Get all the socialMediaList
        restSocialMediaMockMvc.perform(get("/api/social-medias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialMedia.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeype").value(hasItem(DEFAULT_TYPEYPE.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }
    

    @Test
    @Transactional
    public void getSocialMedia() throws Exception {
        // Initialize the database
        socialMediaRepository.saveAndFlush(socialMedia);

        // Get the socialMedia
        restSocialMediaMockMvc.perform(get("/api/social-medias/{id}", socialMedia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(socialMedia.getId().intValue()))
            .andExpect(jsonPath("$.typeype").value(DEFAULT_TYPEYPE.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSocialMedia() throws Exception {
        // Get the socialMedia
        restSocialMediaMockMvc.perform(get("/api/social-medias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSocialMedia() throws Exception {
        // Initialize the database
        socialMediaRepository.saveAndFlush(socialMedia);

        int databaseSizeBeforeUpdate = socialMediaRepository.findAll().size();

        // Update the socialMedia
        SocialMedia updatedSocialMedia = socialMediaRepository.findById(socialMedia.getId()).get();
        // Disconnect from session so that the updates on updatedSocialMedia are not directly saved in db
        em.detach(updatedSocialMedia);
        updatedSocialMedia
            .typeype(UPDATED_TYPEYPE)
            .url(UPDATED_URL);

        restSocialMediaMockMvc.perform(put("/api/social-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSocialMedia)))
            .andExpect(status().isOk());

        // Validate the SocialMedia in the database
        List<SocialMedia> socialMediaList = socialMediaRepository.findAll();
        assertThat(socialMediaList).hasSize(databaseSizeBeforeUpdate);
        SocialMedia testSocialMedia = socialMediaList.get(socialMediaList.size() - 1);
        assertThat(testSocialMedia.getTypeype()).isEqualTo(UPDATED_TYPEYPE);
        assertThat(testSocialMedia.getUrl()).isEqualTo(UPDATED_URL);

        // Validate the SocialMedia in Elasticsearch
        verify(mockSocialMediaSearchRepository, times(1)).save(testSocialMedia);
    }

    @Test
    @Transactional
    public void updateNonExistingSocialMedia() throws Exception {
        int databaseSizeBeforeUpdate = socialMediaRepository.findAll().size();

        // Create the SocialMedia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSocialMediaMockMvc.perform(put("/api/social-medias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialMedia)))
            .andExpect(status().isBadRequest());

        // Validate the SocialMedia in the database
        List<SocialMedia> socialMediaList = socialMediaRepository.findAll();
        assertThat(socialMediaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SocialMedia in Elasticsearch
        verify(mockSocialMediaSearchRepository, times(0)).save(socialMedia);
    }

    @Test
    @Transactional
    public void deleteSocialMedia() throws Exception {
        // Initialize the database
        socialMediaRepository.saveAndFlush(socialMedia);

        int databaseSizeBeforeDelete = socialMediaRepository.findAll().size();

        // Get the socialMedia
        restSocialMediaMockMvc.perform(delete("/api/social-medias/{id}", socialMedia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SocialMedia> socialMediaList = socialMediaRepository.findAll();
        assertThat(socialMediaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SocialMedia in Elasticsearch
        verify(mockSocialMediaSearchRepository, times(1)).deleteById(socialMedia.getId());
    }

    @Test
    @Transactional
    public void searchSocialMedia() throws Exception {
        // Initialize the database
        socialMediaRepository.saveAndFlush(socialMedia);
        when(mockSocialMediaSearchRepository.search(queryStringQuery("id:" + socialMedia.getId())))
            .thenReturn(Collections.singletonList(socialMedia));
        // Search the socialMedia
        restSocialMediaMockMvc.perform(get("/api/_search/social-medias?query=id:" + socialMedia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialMedia.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeype").value(hasItem(DEFAULT_TYPEYPE.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SocialMedia.class);
        SocialMedia socialMedia1 = new SocialMedia();
        socialMedia1.setId(1L);
        SocialMedia socialMedia2 = new SocialMedia();
        socialMedia2.setId(socialMedia1.getId());
        assertThat(socialMedia1).isEqualTo(socialMedia2);
        socialMedia2.setId(2L);
        assertThat(socialMedia1).isNotEqualTo(socialMedia2);
        socialMedia1.setId(null);
        assertThat(socialMedia1).isNotEqualTo(socialMedia2);
    }
}
