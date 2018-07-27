package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Companionship;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Companionship entity.
 */
public interface CompanionshipSearchRepository extends ElasticsearchRepository<Companionship, Long> {
}
