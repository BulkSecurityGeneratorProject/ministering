-- New Scripts 07/18/2018
create table email
(
	id int auto_increment
		primary key,
	member_id int not null,
	type varchar(30) not null,
	address varchar(100) not null
)
comment 'The member''s email address.' engine=InnoDB
;

create index email_member_id_fk
	on email (member_id)
;

create table family
(
	id int auto_increment
		primary key,
	name varchar(50) not null,
	couple_name varchar(100) null,
	address varchar(200) null
)
comment 'Family Information' engine=InnoDB
;

create table member
(
	id int auto_increment
		primary key,
	org_id int not null,
	family_id int not null,
	type varchar(20) not null,
	first_name varchar(50) not null,
	middle_name varchar(100) null,
	last_name varchar(50) not null,
	constraint member_family_id_fk
		foreign key (family_id) references family (id)
			on update cascade on delete cascade
)
comment 'A family member.' engine=InnoDB
;

create index member_org_id_index
	on member (org_id)
;

create index member_family_id_fk
	on member (family_id)
;

create index member_type_index
	on member (type)
;

alter table email
	add constraint email_member_id_fk
		foreign key (member_id) references member (id)
			on update cascade on delete cascade
;

create table org
(
	id int auto_increment
		primary key,
	name varchar(100) not null,
	constraint org_name_uindex
		unique (name)
)
comment 'Organization Ward, i.e. Copperhill 10th Ward' engine=InnoDB
;

create table phone
(
	id int auto_increment
		primary key,
	member_id int not null,
	type varchar(30) not null,
	number varchar(30) null,
	text_msg_okay tinyint(1) default '0' not null,
	constraint phone_member_id_fk
		foreign key (member_id) references member (id)
			on update cascade on delete cascade
)
comment 'The member''s phone information.' engine=InnoDB
;

create index phone_member_id_fk
	on phone (member_id)
;

create table social_media
(
	id int auto_increment
		primary key,
	member_id int null,
	type varchar(30) not null,
	url varchar(200) not null,
	constraint social_media_member_id_fk
		foreign key (member_id) references member (id)
			on update cascade on delete cascade
)
comment 'The member''s social media information.' engine=InnoDB
;

create index social_media_member_id_fk
	on social_media (member_id)
;



-- auto-generated definition
create table IF NOT EXISTS org
(
    id   int auto_increment primary key,
    name varchar(100) not null,
    constraint org_name_uindex
    unique (name)
)
    comment 'Organization Ward, i.e. Copperhill 10th Ward';

-- auto-generated definition
create table IF NOT EXISTS member
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
    foreign key (organization_id) references org (id)
);

-- auto-generated definition
create table IF NOT EXISTS contact_info
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


create index member_organization_id_fk
    on member (organization_id);

-- auto-generated definition
create table IF NOT EXISTS notes
(
    id          int auto_increment
        primary key,
    note        longtext null,
    update_date datetime null,
    create_date datetime not null
);




