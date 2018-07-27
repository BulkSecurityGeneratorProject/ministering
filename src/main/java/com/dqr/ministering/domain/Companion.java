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
 * A Companion.
 */
@Entity
@Table(name = "companion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "companion")
public class Companion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "companion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Member> members = new HashSet<>();

    @OneToMany(mappedBy = "companion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Companionship> companionships = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Member> getMembers() {
        return members;
    }

    public Companion members(Set<Member> members) {
        this.members = members;
        return this;
    }

    public Companion addMember(Member member) {
        this.members.add(member);
        member.setCompanion(this);
        return this;
    }

    public Companion removeMember(Member member) {
        this.members.remove(member);
        member.setCompanion(null);
        return this;
    }

    public void setMembers(Set<Member> members) {
        this.members = members;
    }

    public Set<Companionship> getCompanionships() {
        return companionships;
    }

    public Companion companionships(Set<Companionship> companionships) {
        this.companionships = companionships;
        return this;
    }

    public Companion addCompanionship(Companionship companionship) {
        this.companionships.add(companionship);
        companionship.setCompanion(this);
        return this;
    }

    public Companion removeCompanionship(Companionship companionship) {
        this.companionships.remove(companionship);
        companionship.setCompanion(null);
        return this;
    }

    public void setCompanionships(Set<Companionship> companionships) {
        this.companionships = companionships;
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
        Companion companion = (Companion) o;
        if (companion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Companion{" +
            "id=" + getId() +
            "}";
    }
}
