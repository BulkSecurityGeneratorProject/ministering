package com.dqr.ministering.repository;

import com.dqr.ministering.domain.Notes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Notes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

}
