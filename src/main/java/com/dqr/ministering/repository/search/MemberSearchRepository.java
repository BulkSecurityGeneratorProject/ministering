package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Member;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Member entity.
 */
public interface MemberSearchRepository extends ElasticsearchRepository<Member, Long> {
}
