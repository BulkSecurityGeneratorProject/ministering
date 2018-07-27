package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Companion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Companion entity.
 */
public interface CompanionSearchRepository extends ElasticsearchRepository<Companion, Long> {
}
