package com.dqr.ministering.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of EmailSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EmailSearchRepositoryMockConfiguration {

    @MockBean
    private EmailSearchRepository mockEmailSearchRepository;

}
