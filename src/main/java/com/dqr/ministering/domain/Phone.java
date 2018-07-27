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

import com.dqr.ministering.domain.enumeration.PhoneType;

/**
 * A Phone.
 */
@Entity
@Table(name = "phone")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "phone")
public class Phone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private PhoneType type;

    @NotNull
    @Column(name = "jhi_number", nullable = false)
    private String number;

    @Column(name = "text_msg_okay")
    private Boolean textMsgOkay;

    @OneToMany(mappedBy = "phone")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Member> members = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PhoneType getType() {
        return type;
    }

    public Phone type(PhoneType type) {
        this.type = type;
        return this;
    }

    public void setType(PhoneType type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public Phone number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Boolean isTextMsgOkay() {
        return textMsgOkay;
    }

    public Phone textMsgOkay(Boolean textMsgOkay) {
        this.textMsgOkay = textMsgOkay;
        return this;
    }

    public void setTextMsgOkay(Boolean textMsgOkay) {
        this.textMsgOkay = textMsgOkay;
    }

    public Set<Member> getMembers() {
        return members;
    }

    public Phone members(Set<Member> members) {
        this.members = members;
        return this;
    }

    public Phone addMember(Member member) {
        this.members.add(member);
        member.setPhone(this);
        return this;
    }

    public Phone removeMember(Member member) {
        this.members.remove(member);
        member.setPhone(null);
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
        Phone phone = (Phone) o;
        if (phone.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), phone.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Phone{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", number='" + getNumber() + "'" +
            ", textMsgOkay='" + isTextMsgOkay() + "'" +
            "}";
    }
}
