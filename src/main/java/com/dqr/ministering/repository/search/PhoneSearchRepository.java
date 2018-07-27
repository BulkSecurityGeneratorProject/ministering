package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Phone;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Phone entity.
 */
public interface PhoneSearchRepository extends ElasticsearchRepository<Phone, Long> {
}
