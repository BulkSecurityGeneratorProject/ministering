package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Ministry;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ministry entity.
 */
public interface MinistrySearchRepository extends ElasticsearchRepository<Ministry, Long> {
}
