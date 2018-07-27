package com.dqr.ministering.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dqr.ministering.domain.Companionship;
import com.dqr.ministering.repository.CompanionshipRepository;
import com.dqr.ministering.repository.search.CompanionshipSearchRepository;
import com.dqr.ministering.web.rest.errors.BadRequestAlertException;
import com.dqr.ministering.web.rest.util.HeaderUtil;
import com.dqr.ministering.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Companionship.
 */
@RestController
@RequestMapping("/api")
public class CompanionshipResource {

    private final Logger log = LoggerFactory.getLogger(CompanionshipResource.class);

    private static final String ENTITY_NAME = "companionship";

    private final CompanionshipRepository companionshipRepository;

    private final CompanionshipSearchRepository companionshipSearchRepository;

    public CompanionshipResource(CompanionshipRepository companionshipRepository, CompanionshipSearchRepository companionshipSearchRepository) {
        this.companionshipRepository = companionshipRepository;
        this.companionshipSearchRepository = companionshipSearchRepository;
    }

    /**
     * POST  /companionships : Create a new companionship.
     *
     * @param companionship the companionship to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companionship, or with status 400 (Bad Request) if the companionship has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/companionships")
    @Timed
    public ResponseEntity<Companionship> createCompanionship(@Valid @RequestBody Companionship companionship) throws URISyntaxException {
        log.debug("REST request to save Companionship : {}", companionship);
        if (companionship.getId() != null) {
            throw new BadRequestAlertException("A new companionship cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Companionship result = companionshipRepository.save(companionship);
        companionshipSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/companionships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /companionships : Updates an existing companionship.
     *
     * @param companionship the companionship to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companionship,
     * or with status 400 (Bad Request) if the companionship is not valid,
     * or with status 500 (Internal Server Error) if the companionship couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/companionships")
    @Timed
    public ResponseEntity<Companionship> updateCompanionship(@Valid @RequestBody Companionship companionship) throws URISyntaxException {
        log.debug("REST request to update Companionship : {}", companionship);
        if (companionship.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Companionship result = companionshipRepository.save(companionship);
        companionshipSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companionship.getId().toString()))
            .body(result);
    }

    /**
     * GET  /companionships : get all the companionships.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companionships in body
     */
    @GetMapping("/companionships")
    @Timed
    public ResponseEntity<List<Companionship>> getAllCompanionships(Pageable pageable) {
        log.debug("REST request to get a page of Companionships");
        Page<Companionship> page = companionshipRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/companionships");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /companionships/:id : get the "id" companionship.
     *
     * @param id the id of the companionship to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companionship, or with status 404 (Not Found)
     */
    @GetMapping("/companionships/{id}")
    @Timed
    public ResponseEntity<Companionship> getCompanionship(@PathVariable Long id) {
        log.debug("REST request to get Companionship : {}", id);
        Optional<Companionship> companionship = companionshipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companionship);
    }

    /**
     * DELETE  /companionships/:id : delete the "id" companionship.
     *
     * @param id the id of the companionship to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/companionships/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompanionship(@PathVariable Long id) {
        log.debug("REST request to delete Companionship : {}", id);

        companionshipRepository.deleteById(id);
        companionshipSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/companionships?query=:query : search for the companionship corresponding
     * to the query.
     *
     * @param query the query of the companionship search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/companionships")
    @Timed
    public ResponseEntity<List<Companionship>> searchCompanionships(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Companionships for query {}", query);
        Page<Companionship> page = companionshipSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/companionships");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
