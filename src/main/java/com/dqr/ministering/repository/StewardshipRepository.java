package com.dqr.ministering.repository;

import com.dqr.ministering.domain.Stewardship;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stewardship entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StewardshipRepository extends JpaRepository<Stewardship, Long> {

}
