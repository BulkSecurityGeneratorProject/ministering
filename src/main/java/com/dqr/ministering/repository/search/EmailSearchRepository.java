package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Email;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Email entity.
 */
public interface EmailSearchRepository extends ElasticsearchRepository<Email, Long> {
}
