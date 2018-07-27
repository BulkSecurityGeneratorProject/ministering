package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Family;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Family entity.
 */
public interface FamilySearchRepository extends ElasticsearchRepository<Family, Long> {
}
