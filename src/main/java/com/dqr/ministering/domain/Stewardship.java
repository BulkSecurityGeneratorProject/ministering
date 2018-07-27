package com.dqr.ministering.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Stewardship.
 */
@Entity
@Table(name = "stewardship")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stewardship")
public class Stewardship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "stewardship")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Companionship> companionships = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("stewardships")
    private Assignment assignment;

    @ManyToOne
    @JsonIgnoreProperties("stewardships")
    private Ministry ministry;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Companionship> getCompanionships() {
        return companionships;
    }

    public Stewardship companionships(Set<Companionship> companionships) {
        this.companionships = companionships;
        return this;
    }

    public Stewardship addCompanionship(Companionship companionship) {
        this.companionships.add(companionship);
        companionship.setStewardship(this);
        return this;
    }

    public Stewardship removeCompanionship(Companionship companionship) {
        this.companionships.remove(companionship);
        companionship.setStewardship(null);
        return this;
    }

    public void setCompanionships(Set<Companionship> companionships) {
        this.companionships = companionships;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public Stewardship assignment(Assignment assignment) {
        this.assignment = assignment;
        return this;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public Ministry getMinistry() {
        return ministry;
    }

    public Stewardship ministry(Ministry ministry) {
        this.ministry = ministry;
        return this;
    }

    public void setMinistry(Ministry ministry) {
        this.ministry = ministry;
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
        Stewardship stewardship = (Stewardship) o;
        if (stewardship.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stewardship.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stewardship{" +
            "id=" + getId() +
            "}";
    }
}
