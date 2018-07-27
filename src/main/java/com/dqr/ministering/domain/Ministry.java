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
 * A Ministry.
 */
@Entity
@Table(name = "ministry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "ministry")
public class Ministry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "ministry")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Member> members = new HashSet<>();

    @OneToMany(mappedBy = "ministry")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Companionship> companionships = new HashSet<>();

    @OneToMany(mappedBy = "ministry")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Stewardship> stewardships = new HashSet<>();

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

    public Ministry members(Set<Member> members) {
        this.members = members;
        return this;
    }

    public Ministry addMember(Member member) {
        this.members.add(member);
        member.setMinistry(this);
        return this;
    }

    public Ministry removeMember(Member member) {
        this.members.remove(member);
        member.setMinistry(null);
        return this;
    }

    public void setMembers(Set<Member> members) {
        this.members = members;
    }

    public Set<Companionship> getCompanionships() {
        return companionships;
    }

    public Ministry companionships(Set<Companionship> companionships) {
        this.companionships = companionships;
        return this;
    }

    public Ministry addCompanionship(Companionship companionship) {
        this.companionships.add(companionship);
        companionship.setMinistry(this);
        return this;
    }

    public Ministry removeCompanionship(Companionship companionship) {
        this.companionships.remove(companionship);
        companionship.setMinistry(null);
        return this;
    }

    public void setCompanionships(Set<Companionship> companionships) {
        this.companionships = companionships;
    }

    public Set<Stewardship> getStewardships() {
        return stewardships;
    }

    public Ministry stewardships(Set<Stewardship> stewardships) {
        this.stewardships = stewardships;
        return this;
    }

    public Ministry addStewardship(Stewardship stewardship) {
        this.stewardships.add(stewardship);
        stewardship.setMinistry(this);
        return this;
    }

    public Ministry removeStewardship(Stewardship stewardship) {
        this.stewardships.remove(stewardship);
        stewardship.setMinistry(null);
        return this;
    }

    public void setStewardships(Set<Stewardship> stewardships) {
        this.stewardships = stewardships;
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
        Ministry ministry = (Ministry) o;
        if (ministry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ministry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ministry{" +
            "id=" + getId() +
            "}";
    }
}
