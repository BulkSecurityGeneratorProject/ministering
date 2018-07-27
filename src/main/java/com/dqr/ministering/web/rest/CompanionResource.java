package com.dqr.ministering.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dqr.ministering.domain.Companion;
import com.dqr.ministering.repository.CompanionRepository;
import com.dqr.ministering.repository.search.CompanionSearchRepository;
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
 * REST controller for managing Companion.
 */
@RestController
@RequestMapping("/api")
public class CompanionResource {

    private final Logger log = LoggerFactory.getLogger(CompanionResource.class);

    private static final String ENTITY_NAME = "companion";

    private final CompanionRepository companionRepository;

    private final CompanionSearchRepository companionSearchRepository;

    public CompanionResource(CompanionRepository companionRepository, CompanionSearchRepository companionSearchRepository) {
        this.companionRepository = companionRepository;
        this.companionSearchRepository = companionSearchRepository;
    }

    /**
     * POST  /companions : Create a new companion.
     *
     * @param companion the companion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companion, or with status 400 (Bad Request) if the companion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/companions")
    @Timed
    public ResponseEntity<Companion> createCompanion(@RequestBody Companion companion) throws URISyntaxException {
        log.debug("REST request to save Companion : {}", companion);
        if (companion.getId() != null) {
            throw new BadRequestAlertException("A new companion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Companion result = companionRepository.save(companion);
        companionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/companions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /companions : Updates an existing companion.
     *
     * @param companion the companion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companion,
     * or with status 400 (Bad Request) if the companion is not valid,
     * or with status 500 (Internal Server Error) if the companion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/companions")
    @Timed
    public ResponseEntity<Companion> updateCompanion(@RequestBody Companion companion) throws URISyntaxException {
        log.debug("REST request to update Companion : {}", companion);
        if (companion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Companion result = companionRepository.save(companion);
        companionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /companions : get all the companions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of companions in body
     */
    @GetMapping("/companions")
    @Timed
    public List<Companion> getAllCompanions() {
        log.debug("REST request to get all Companions");
        return companionRepository.findAll();
    }

    /**
     * GET  /companions/:id : get the "id" companion.
     *
     * @param id the id of the companion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companion, or with status 404 (Not Found)
     */
    @GetMapping("/companions/{id}")
    @Timed
    public ResponseEntity<Companion> getCompanion(@PathVariable Long id) {
        log.debug("REST request to get Companion : {}", id);
        Optional<Companion> companion = companionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companion);
    }

    /**
     * DELETE  /companions/:id : delete the "id" companion.
     *
     * @param id the id of the companion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/companions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompanion(@PathVariable Long id) {
        log.debug("REST request to delete Companion : {}", id);

        companionRepository.deleteById(id);
        companionSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/companions?query=:query : search for the companion corresponding
     * to the query.
     *
     * @param query the query of the companion search
     * @return the result of the search
     */
    @GetMapping("/_search/companions")
    @Timed
    public List<Companion> searchCompanions(@RequestParam String query) {
        log.debug("REST request to search Companions for query {}", query);
        return StreamSupport
            .stream(companionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
