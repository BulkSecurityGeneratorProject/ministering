package com.dqr.ministering.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of FamilySearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class FamilySearchRepositoryMockConfiguration {

    @MockBean
    private FamilySearchRepository mockFamilySearchRepository;

}
