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

import com.dqr.ministering.domain.enumeration.SocialMediaType;

/**
 * A SocialMedia.
 */
@Entity
@Table(name = "social_media")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "socialmedia")
public class SocialMedia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "typeype", nullable = false)
    private SocialMediaType typeype;

    @Column(name = "url")
    private String url;

    @OneToMany(mappedBy = "socialMedia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Member> members = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SocialMediaType getTypeype() {
        return typeype;
    }

    public SocialMedia typeype(SocialMediaType typeype) {
        this.typeype = typeype;
        return this;
    }

    public void setTypeype(SocialMediaType typeype) {
        this.typeype = typeype;
    }

    public String getUrl() {
        return url;
    }

    public SocialMedia url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Member> getMembers() {
        return members;
    }

    public SocialMedia members(Set<Member> members) {
        this.members = members;
        return this;
    }

    public SocialMedia addMember(Member member) {
        this.members.add(member);
        member.setSocialMedia(this);
        return this;
    }

    public SocialMedia removeMember(Member member) {
        this.members.remove(member);
        member.setSocialMedia(null);
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
        SocialMedia socialMedia = (SocialMedia) o;
        if (socialMedia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), socialMedia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SocialMedia{" +
            "id=" + getId() +
            ", typeype='" + getTypeype() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
