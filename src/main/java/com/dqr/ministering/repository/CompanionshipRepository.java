package com.dqr.ministering.repository;

import com.dqr.ministering.domain.Companionship;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Companionship entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanionshipRepository extends JpaRepository<Companionship, Long> {

}
