package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Assignment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Assignment entity.
 */
public interface AssignmentSearchRepository extends ElasticsearchRepository<Assignment, Long> {
}
