-- -------------------------------------------------------------------------------
-- Some scripts
-- -------------------------------------------------------------------------------
-- Get list of assignments for a member id
select
    f.*
  from
    member m1,
    ministry m2,
    stewardship s,
    assignment a,
    family f
  where
    m1.id = m2.member_id
    and s.companionship_id = m2.companionship_id
    and a.stewardship_id = s.id
    and a.family_id = f.id
    and m1.id = 1;

-- Get list of families that are assigned to members.
select
    f.*
from
    family f,
    assignment a
WHERE a.family_id = f.id;

-- ----------------------------------------------------------------------
-- Ministering Table creation
-- ----------------------------------------------------------------------
create table assignment
(
	id int auto_increment
		primary key,
	stewardship_id int not null,
	family_id int null
)
comment 'The family assignments for the companionship.' engine=InnoDB
;

create index assignment_stewardship_id_fk
	on assignment (stewardship_id)
;

create index assignment_family_id_fk
	on assignment (family_id)
;

create table companion
(
	id int auto_increment
		primary key,
	member_id int not null,
	companionship_id int not null
)
comment 'A member companion.' engine=InnoDB
;

create index companion_member_id_fk
	on companion (member_id)
;

create index companion_companionship_id_fk
	on companion (companionship_id)
;

create table companionship
(
	id int auto_increment
		primary key,
	name varchar(50) not null
)
comment 'The companionship of members, lastname/lastname.' engine=InnoDB
;

alter table companion
	add constraint companion_companionship_id_fk
		foreign key (companionship_id) references companionship (id)
			on update cascade on delete cascade
;

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

alter table assignment
	add constraint assignment_family_id_fk
		foreign key (family_id) references family (id)
			on update cascade on delete cascade
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
	birthdate date null,
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

alter table companion
	add constraint companion_member_id_fk
		foreign key (member_id) references member (id)
			on update cascade on delete cascade
;

alter table email
	add constraint email_member_id_fk
		foreign key (member_id) references member (id)
			on update cascade on delete cascade
;

create table ministry
(
	id int auto_increment
		primary key,
	member_id int not null,
	companionship_id int null,
	stewardship_id int null,
	constraint ministry_member_id_fk
		foreign key (member_id) references member (id)
			on update cascade on delete cascade,
	constraint ministry_companionship_id_fk
		foreign key (companionship_id) references companionship (id)
			on update cascade on delete cascade
)
engine=InnoDB
;

create index ministry_member_id_fk
	on ministry (member_id)
;

create index ministry_companionship_id_fk
	on ministry (companionship_id)
;

create index ministry_stewardship_id_fk
	on ministry (stewardship_id)
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

create table stewardship
(
	id int auto_increment
		primary key,
	companionship_id int not null,
	constraint stewardship_companionship_id_fk
		foreign key (companionship_id) references companionship (id)
			on update cascade on delete cascade
)
comment 'The stewardship of the member.' engine=InnoDB
;

create index stewardship_companionship_id_fk
	on stewardship (companionship_id)
;

alter table assignment
	add constraint assignment_stewardship_id_fk
		foreign key (stewardship_id) references stewardship (id)
			on update cascade on delete cascade
;

alter table ministry
	add constraint ministry_stewardship_id_fk
		foreign key (stewardship_id) references stewardship (id)
			on update cascade on delete cascade
;


