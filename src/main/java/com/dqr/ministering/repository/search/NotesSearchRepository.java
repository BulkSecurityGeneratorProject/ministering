package com.dqr.ministering.repository.search;

import com.dqr.ministering.domain.Notes;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Notes entity.
 */
public interface NotesSearchRepository extends ElasticsearchRepository<Notes, Long> {
}
