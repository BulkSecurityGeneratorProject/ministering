package com.dqr.ministering.repository;

import com.dqr.ministering.domain.Companion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Companion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanionRepository extends JpaRepository<Companion, Long> {

}
