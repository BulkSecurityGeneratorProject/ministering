package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Org;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Org entity.
 */
public interface OrgSearchRepository extends ElasticsearchRepository<Org, Long> {
}
