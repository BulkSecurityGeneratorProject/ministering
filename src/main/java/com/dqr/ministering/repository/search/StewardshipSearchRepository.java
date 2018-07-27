package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Stewardship;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Stewardship entity.
 */
public interface StewardshipSearchRepository extends ElasticsearchRepository<Stewardship, Long> {
}
