package com.dqr.ministering.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dqr.ministering.domain.enumeration.NoteType;

/**
 * A Notes.
 */
@Entity
@Table(name = "notes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "notes")
public class Notes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private NoteType type;

    @Column(name = "note")
    private String note;

    @OneToMany(mappedBy = "notes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Member> members = new HashSet<>();

    @OneToMany(mappedBy = "notes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Companionship> companionships = new HashSet<>();

    @OneToMany(mappedBy = "notes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Family> families = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NoteType getType() {
        return type;
    }

    public Notes type(NoteType type) {
        this.type = type;
        return this;
    }

    public void setType(NoteType type) {
        this.type = type;
    }

    public String getNote() {
        return note;
    }

    public Notes note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Set<Member> getMembers() {
        return members;
    }

    public Notes members(Set<Member> members) {
        this.members = members;
        return this;
    }

    public Notes addMember(Member member) {
        this.members.add(member);
        member.setNotes(this);
        return this;
    }

    public Notes removeMember(Member member) {
        this.members.remove(member);
        member.setNotes(null);
        return this;
    }

    public void setMembers(Set<Member> members) {
        this.members = members;
    }

    public Set<Companionship> getCompanionships() {
        return companionships;
    }

    public Notes companionships(Set<Companionship> companionships) {
        this.companionships = companionships;
        return this;
    }

    public Notes addCompanionship(Companionship companionship) {
        this.companionships.add(companionship);
        companionship.setNotes(this);
        return this;
    }

    public Notes removeCompanionship(Companionship companionship) {
        this.companionships.remove(companionship);
        companionship.setNotes(null);
        return this;
    }

    public void setCompanionships(Set<Companionship> companionships) {
        this.companionships = companionships;
    }

    public Set<Family> getFamilies() {
        return families;
    }

    public Notes families(Set<Family> families) {
        this.families = families;
        return this;
    }

    public Notes addFamily(Family family) {
        this.families.add(family);
        family.setNotes(this);
        return this;
    }

    public Notes removeFamily(Family family) {
        this.families.remove(family);
        family.setNotes(null);
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
        Notes notes = (Notes) o;
        if (notes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Notes{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
