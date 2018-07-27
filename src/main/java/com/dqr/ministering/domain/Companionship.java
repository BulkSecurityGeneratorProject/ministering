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
 * A Companionship.
 */
@Entity
@Table(name = "companionship")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "companionship")
public class Companionship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private Stewardship companionship;

    @ManyToOne
    @JsonIgnoreProperties("companionships")
    private Notes notes;

    @ManyToOne
    @JsonIgnoreProperties("companionships")
    private Stewardship stewardship;

    @ManyToOne
    @JsonIgnoreProperties("companionships")
    private Companion companion;

    @ManyToOne
    @JsonIgnoreProperties("companionships")
    private Ministry ministry;

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

    public Companionship name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Stewardship getCompanionship() {
        return companionship;
    }

    public Companionship companionship(Stewardship stewardship) {
        this.companionship = stewardship;
        return this;
    }

    public void setCompanionship(Stewardship stewardship) {
        this.companionship = stewardship;
    }

    public Notes getNotes() {
        return notes;
    }

    public Companionship notes(Notes notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(Notes notes) {
        this.notes = notes;
    }

    public Stewardship getStewardship() {
        return stewardship;
    }

    public Companionship stewardship(Stewardship stewardship) {
        this.stewardship = stewardship;
        return this;
    }

    public void setStewardship(Stewardship stewardship) {
        this.stewardship = stewardship;
    }

    public Companion getCompanion() {
        return companion;
    }

    public Companionship companion(Companion companion) {
        this.companion = companion;
        return this;
    }

    public void setCompanion(Companion companion) {
        this.companion = companion;
    }

    public Ministry getMinistry() {
        return ministry;
    }

    public Companionship ministry(Ministry ministry) {
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
        Companionship companionship = (Companionship) o;
        if (companionship.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companionship.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Companionship{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
