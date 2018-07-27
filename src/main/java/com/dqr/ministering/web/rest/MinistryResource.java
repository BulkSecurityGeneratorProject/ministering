package com.dqr.ministering.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dqr.ministering.domain.Ministry;
import com.dqr.ministering.repository.MinistryRepository;
import com.dqr.ministering.repository.search.MinistrySearchRepository;
import com.dqr.ministering.web.rest.errors.BadRequestAlertException;
import com.dqr.ministering.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Ministry.
 */
@RestController
@RequestMapping("/api")
public class MinistryResource {

    private final Logger log = LoggerFactory.getLogger(MinistryResource.class);

    private static final String ENTITY_NAME = "ministry";

    private final MinistryRepository ministryRepository;

    private final MinistrySearchRepository ministrySearchRepository;

    public MinistryResource(MinistryRepository ministryRepository, MinistrySearchRepository ministrySearchRepository) {
        this.ministryRepository = ministryRepository;
        this.ministrySearchRepository = ministrySearchRepository;
    }

    /**
     * POST  /ministries : Create a new ministry.
     *
     * @param ministry the ministry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ministry, or with status 400 (Bad Request) if the ministry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ministries")
    @Timed
    public ResponseEntity<Ministry> createMinistry(@RequestBody Ministry ministry) throws URISyntaxException {
        log.debug("REST request to save Ministry : {}", ministry);
        if (ministry.getId() != null) {
            throw new BadRequestAlertException("A new ministry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ministry result = ministryRepository.save(ministry);
        ministrySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/ministries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ministries : Updates an existing ministry.
     *
     * @param ministry the ministry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ministry,
     * or with status 400 (Bad Request) if the ministry is not valid,
     * or with status 500 (Internal Server Error) if the ministry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ministries")
    @Timed
    public ResponseEntity<Ministry> updateMinistry(@RequestBody Ministry ministry) throws URISyntaxException {
        log.debug("REST request to update Ministry : {}", ministry);
        if (ministry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ministry result = ministryRepository.save(ministry);
        ministrySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ministry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ministries : get all the ministries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ministries in body
     */
    @GetMapping("/ministries")
    @Timed
    public List<Ministry> getAllMinistries() {
        log.debug("REST request to get all Ministries");
        return ministryRepository.findAll();
    }

    /**
     * GET  /ministries/:id : get the "id" ministry.
     *
     * @param id the id of the ministry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ministry, or with status 404 (Not Found)
     */
    @GetMapping("/ministries/{id}")
    @Timed
    public ResponseEntity<Ministry> getMinistry(@PathVariable Long id) {
        log.debug("REST request to get Ministry : {}", id);
        Optional<Ministry> ministry = ministryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ministry);
    }

    /**
     * DELETE  /ministries/:id : delete the "id" ministry.
     *
     * @param id the id of the ministry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ministries/{id}")
    @Timed
    public ResponseEntity<Void> deleteMinistry(@PathVariable Long id) {
        log.debug("REST request to delete Ministry : {}", id);

        ministryRepository.deleteById(id);
        ministrySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/ministries?query=:query : search for the ministry corresponding
     * to the query.
     *
     * @param query the query of the ministry search
     * @return the result of the search
     */
    @GetMapping("/_search/ministries")
    @Timed
    public List<Ministry> searchMinistries(@RequestParam String query) {
        log.debug("REST request to search Ministries for query {}", query);
        return StreamSupport
            .stream(ministrySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
