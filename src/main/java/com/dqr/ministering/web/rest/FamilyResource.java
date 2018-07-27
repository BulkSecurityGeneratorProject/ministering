package com.dqr.ministering.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dqr.ministering.domain.Family;
import com.dqr.ministering.repository.FamilyRepository;
import com.dqr.ministering.repository.search.FamilySearchRepository;
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
 * REST controller for managing Family.
 */
@RestController
@RequestMapping("/api")
public class FamilyResource {

    private final Logger log = LoggerFactory.getLogger(FamilyResource.class);

    private static final String ENTITY_NAME = "family";

    private final FamilyRepository familyRepository;

    private final FamilySearchRepository familySearchRepository;

    public FamilyResource(FamilyRepository familyRepository, FamilySearchRepository familySearchRepository) {
        this.familyRepository = familyRepository;
        this.familySearchRepository = familySearchRepository;
    }

    /**
     * POST  /families : Create a new family.
     *
     * @param family the family to create
     * @return the ResponseEntity with status 201 (Created) and with body the new family, or with status 400 (Bad Request) if the family has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/families")
    @Timed
    public ResponseEntity<Family> createFamily(@Valid @RequestBody Family family) throws URISyntaxException {
        log.debug("REST request to save Family : {}", family);
        if (family.getId() != null) {
            throw new BadRequestAlertException("A new family cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Family result = familyRepository.save(family);
        familySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/families/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /families : Updates an existing family.
     *
     * @param family the family to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated family,
     * or with status 400 (Bad Request) if the family is not valid,
     * or with status 500 (Internal Server Error) if the family couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/families")
    @Timed
    public ResponseEntity<Family> updateFamily(@Valid @RequestBody Family family) throws URISyntaxException {
        log.debug("REST request to update Family : {}", family);
        if (family.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Family result = familyRepository.save(family);
        familySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, family.getId().toString()))
            .body(result);
    }

    /**
     * GET  /families : get all the families.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of families in body
     */
    @GetMapping("/families")
    @Timed
    public ResponseEntity<List<Family>> getAllFamilies(Pageable pageable) {
        log.debug("REST request to get a page of Families");
        Page<Family> page = familyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/families");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /families/:id : get the "id" family.
     *
     * @param id the id of the family to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the family, or with status 404 (Not Found)
     */
    @GetMapping("/families/{id}")
    @Timed
    public ResponseEntity<Family> getFamily(@PathVariable Long id) {
        log.debug("REST request to get Family : {}", id);
        Optional<Family> family = familyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(family);
    }

    /**
     * DELETE  /families/:id : delete the "id" family.
     *
     * @param id the id of the family to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/families/{id}")
    @Timed
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        log.debug("REST request to delete Family : {}", id);

        familyRepository.deleteById(id);
        familySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/families?query=:query : search for the family corresponding
     * to the query.
     *
     * @param query the query of the family search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/families")
    @Timed
    public ResponseEntity<List<Family>> searchFamilies(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Families for query {}", query);
        Page<Family> page = familySearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/families");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
