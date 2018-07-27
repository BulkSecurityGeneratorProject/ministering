package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.SocialMedia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SocialMedia entity.
 */
public interface SocialMediaSearchRepository extends ElasticsearchRepository<SocialMedia, Long> {
}
