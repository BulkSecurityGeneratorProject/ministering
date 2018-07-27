package com.dqr.ministering.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Family.
 */
@Entity
@Table(name = "family")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "family")
public class Family implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "couple_name")
    private String coupleName;

    @Column(name = "address")
    private String address;

    @ManyToOne
    @JsonIgnoreProperties("families")
    private Notes notes;

    @ManyToOne
    @JsonIgnoreProperties("families")
    private Assignment assignment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Family name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCoupleName() {
        return coupleName;
    }

    public Family coupleName(String coupleName) {
        this.coupleName = coupleName;
        return this;
    }

    public void setCoupleName(String coupleName) {
        this.coupleName = coupleName;
    }

    public String getAddress() {
        return address;
    }

    public Family address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Notes getNotes() {
        return notes;
    }

    public Family notes(Notes notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(Notes notes) {
        this.notes = notes;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public Family assignment(Assignment assignment) {
        this.assignment = assignment;
        return this;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
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
        Family family = (Family) o;
        if (family.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), family.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Family{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", coupleName='" + getCoupleName() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
