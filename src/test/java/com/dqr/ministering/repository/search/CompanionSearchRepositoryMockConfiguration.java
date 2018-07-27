package com.dqr.ministering.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CompanionSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CompanionSearchRepositoryMockConfiguration {

    @MockBean
    private CompanionSearchRepository mockCompanionSearchRepository;

}
