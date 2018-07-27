package com.dqr.ministering.repository;

import com.dqr.ministering.domain.Ministry;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ministry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MinistryRepository extends JpaRepository<Ministry, Long> {

}
