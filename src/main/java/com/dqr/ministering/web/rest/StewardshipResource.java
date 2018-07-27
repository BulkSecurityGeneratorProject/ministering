package com.dqr.ministering.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dqr.ministering.domain.Stewardship;
import com.dqr.ministering.repository.StewardshipRepository;
import com.dqr.ministering.repository.search.StewardshipSearchRepository;
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
 * REST controller for managing Stewardship.
 */
@RestController
@RequestMapping("/api")
public class StewardshipResource {

    private final Logger log = LoggerFactory.getLogger(StewardshipResource.class);

    private static final String ENTITY_NAME = "stewardship";

    private final StewardshipRepository stewardshipRepository;

    private final StewardshipSearchRepository stewardshipSearchRepository;

    public StewardshipResource(StewardshipRepository stewardshipRepository, StewardshipSearchRepository stewardshipSearchRepository) {
        this.stewardshipRepository = stewardshipRepository;
        this.stewardshipSearchRepository = stewardshipSearchRepository;
    }

    /**
     * POST  /stewardships : Create a new stewardship.
     *
     * @param stewardship the stewardship to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stewardship, or with status 400 (Bad Request) if the stewardship has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stewardships")
    @Timed
    public ResponseEntity<Stewardship> createStewardship(@RequestBody Stewardship stewardship) throws URISyntaxException {
        log.debug("REST request to save Stewardship : {}", stewardship);
        if (stewardship.getId() != null) {
            throw new BadRequestAlertException("A new stewardship cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stewardship result = stewardshipRepository.save(stewardship);
        stewardshipSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/stewardships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stewardships : Updates an existing stewardship.
     *
     * @param stewardship the stewardship to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stewardship,
     * or with status 400 (Bad Request) if the stewardship is not valid,
     * or with status 500 (Internal Server Error) if the stewardship couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stewardships")
    @Timed
    public ResponseEntity<Stewardship> updateStewardship(@RequestBody Stewardship stewardship) throws URISyntaxException {
        log.debug("REST request to update Stewardship : {}", stewardship);
        if (stewardship.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Stewardship result = stewardshipRepository.save(stewardship);
        stewardshipSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stewardship.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stewardships : get all the stewardships.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of stewardships in body
     */
    @GetMapping("/stewardships")
    @Timed
    public List<Stewardship> getAllStewardships() {
        log.debug("REST request to get all Stewardships");
        return stewardshipRepository.findAll();
    }

    /**
     * GET  /stewardships/:id : get the "id" stewardship.
     *
     * @param id the id of the stewardship to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stewardship, or with status 404 (Not Found)
     */
    @GetMapping("/stewardships/{id}")
    @Timed
    public ResponseEntity<Stewardship> getStewardship(@PathVariable Long id) {
        log.debug("REST request to get Stewardship : {}", id);
        Optional<Stewardship> stewardship = stewardshipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stewardship);
    }

    /**
     * DELETE  /stewardships/:id : delete the "id" stewardship.
     *
     * @param id the id of the stewardship to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stewardships/{id}")
    @Timed
    public ResponseEntity<Void> deleteStewardship(@PathVariable Long id) {
        log.debug("REST request to delete Stewardship : {}", id);

        stewardshipRepository.deleteById(id);
        stewardshipSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stewardships?query=:query : search for the stewardship corresponding
     * to the query.
     *
     * @param query the query of the stewardship search
     * @return the result of the search
     */
    @GetMapping("/_search/stewardships")
    @Timed
    public List<Stewardship> searchStewardships(@RequestParam String query) {
        log.debug("REST request to search Stewardships for query {}", query);
        return StreamSupport
            .stream(stewardshipSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
