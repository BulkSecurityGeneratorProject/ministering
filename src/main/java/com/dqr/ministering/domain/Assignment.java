package com.dqr.ministering.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Assignment.
 */
@Entity
@Table(name = "assignment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "assignment")
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "assignment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Stewardship> stewardships = new HashSet<>();

    @OneToMany(mappedBy = "assignment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Family> families = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Stewardship> getStewardships() {
        return stewardships;
    }

    public Assignment stewardships(Set<Stewardship> stewardships) {
        this.stewardships = stewardships;
        return this;
    }

    public Assignment addStewardship(Stewardship stewardship) {
        this.stewardships.add(stewardship);
        stewardship.setAssignment(this);
        return this;
    }

    public Assignment removeStewardship(Stewardship stewardship) {
        this.stewardships.remove(stewardship);
        stewardship.setAssignment(null);
        return this;
    }

    public void setStewardships(Set<Stewardship> stewardships) {
        this.stewardships = stewardships;
    }

    public Set<Family> getFamilies() {
        return families;
    }

    public Assignment families(Set<Family> families) {
        this.families = families;
        return this;
    }

    public Assignment addFamily(Family family) {
        this.families.add(family);
        family.setAssignment(this);
        return this;
    }

    public Assignment removeFamily(Family family) {
        this.families.remove(family);
        family.setAssignment(null);
        return this;
    }

    public void setFamilies(Set<Family> families) {
        this.families = families;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Assignment assignment = (Assignment) o;
        if (assignment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Assignment{" +
            "id=" + getId() +
            "}";
    }
}
