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

import com.dqr.ministering.domain.enumeration.EmailType;

/**
 * A Email.
 */
@Entity
@Table(name = "email")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "email")
public class Email implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private EmailType type;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "email")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Member> members = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmailType getType() {
        return type;
    }

    public Email type(EmailType type) {
        this.type = type;
        return this;
    }

    public void setType(EmailType type) {
        this.type = type;
    }

    public String getAddress() {
        return address;
    }

    public Email address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Member> getMembers() {
        return members;
    }

    public Email members(Set<Member> members) {
        this.members = members;
        return this;
    }

    public Email addMember(Member member) {
        this.members.add(member);
        member.setEmail(this);
        return this;
    }

    public Email removeMember(Member member) {
        this.members.remove(member);
        member.setEmail(null);
        return this;
    }

    public void setMembers(Set<Member> members) {
        this.members = members;
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
        Email email = (Email) o;
        if (email.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), email.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Email{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
