package com.dqr.ministering.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.dqr.ministering.domain.enumeration.FamilyType;

/**
 * A Member.
 */
@Entity
@Table(name = "member")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "member")
public class Member implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private FamilyType type;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birthdate")
    private Instant birthdate;

    @OneToMany(mappedBy = "member")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Org> orgs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Family family;

    @ManyToOne
    @JsonIgnoreProperties("members")
    private Phone phone;

    @ManyToOne
    @JsonIgnoreProperties("members")
    private Email email;

    @ManyToOne
    @JsonIgnoreProperties("members")
    private SocialMedia socialMedia;

    @ManyToOne
    @JsonIgnoreProperties("members")
    private Notes notes;

    @ManyToOne
    @JsonIgnoreProperties("members")
    private Companion companion;

    @ManyToOne
    @JsonIgnoreProperties("members")
    private Ministry ministry;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FamilyType getType() {
        return type;
    }

    public Member type(FamilyType type) {
        this.type = type;
        return this;
    }

    public void setType(FamilyType type) {
        this.type = type;
    }

    public String getFirstName() {
        return firstName;
    }

    public Member firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Member middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public Member lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Instant getBirthdate() {
        return birthdate;
    }

    public Member birthdate(Instant birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(Instant birthdate) {
        this.birthdate = birthdate;
    }

    public Set<Org> getOrgs() {
        return orgs;
    }

    public Member orgs(Set<Org> orgs) {
        this.orgs = orgs;
        return this;
    }

    public Member addOrg(Org org) {
        this.orgs.add(org);
        org.setMember(this);
        return this;
    }

    public Member removeOrg(Org org) {
        this.orgs.remove(org);
        org.setMember(null);
        return this;
    }

    public void setOrgs(Set<Org> orgs) {
        this.orgs = orgs;
    }

    public Family getFamily() {
        return family;
    }

    public Member family(Family family) {
        this.family = family;
        return this;
    }

    public void setFamily(Family family) {
        this.family = family;
    }

    public Phone getPhone() {
        return phone;
    }

    public Member phone(Phone phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(Phone phone) {
        this.phone = phone;
    }

    public Email getEmail() {
        return email;
    }

    public Member email(Email email) {
        this.email = email;
        return this;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public SocialMedia getSocialMedia() {
        return socialMedia;
    }

    public Member socialMedia(SocialMedia socialMedia) {
        this.socialMedia = socialMedia;
        return this;
    }

    public void setSocialMedia(SocialMedia socialMedia) {
        this.socialMedia = socialMedia;
    }

    public Notes getNotes() {
        return notes;
    }

    public Member notes(Notes notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(Notes notes) {
        this.notes = notes;
    }

    public Companion getCompanion() {
        return companion;
    }

    public Member companion(Companion companion) {
        this.companion = companion;
        return this;
    }

    public void setCompanion(Companion companion) {
        this.companion = companion;
    }

    public Ministry getMinistry() {
        return ministry;
    }

    public Member ministry(Ministry ministry) {
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
        Member member = (Member) o;
        if (member.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), member.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Member{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            "}";
    }
}
