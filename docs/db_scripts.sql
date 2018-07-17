-- auto-generated definition
create table contact_info
(
    id        int auto_increment
        primary key,
    type      varchar(20)  not null,
    value     varchar(100) null,
    member_id int          not null,
    constraint contact_info_type_uindex
    unique (type),
    constraint contact_info_member_id_fk
    foreign key (member_id) references member (id)
        on update cascade
        on delete cascade
);

create index contact_info_member_id_fk
    on contact_info (member_id);

-- auto-generated definition
create table member
(
    id              int auto_increment
        primary key,
    organization_id int          null,
    last_name       varchar(50)  not null,
    first_name      varchar(50)  not null,
    address_1       varchar(100) null,
    address_2       varchar(100) null,
    city            varchar(50)  null,
    state           varchar(50)  null,
    zipcode         varchar(10)  null,
    constraint member_organization_id_fk
    foreign key (organization_id) references organization (id)
);

create index member_organization_id_fk
    on member (organization_id);

-- auto-generated definition
create table notes
(
    id          int auto_increment
        primary key,
    note        longtext null,
    update_date datetime null,
    create_date datetime not null
);

-- auto-generated definition
create table organization
(
    id   int auto_increment
        primary key,
    name varchar(50) not null,
    constraint organization_name_uindex
    unique (name)
)
    comment 'Organization Ward, i.e. Copperhill 10th Ward';

