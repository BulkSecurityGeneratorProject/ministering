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


-- ------------------------------------------------------------------------------
-- Population script
-- ------------------------------------------------------------------------------
INSERT INTO ministering.org (id, name) VALUES (1, 'Copperhill 10th Ward');

INSERT INTO ministering.family (id, name, couple_name, address) VALUES (1, 'Romney', 'David and Christine', '4033 South Powderwood Drive, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (2, 'King', 'Peter and Lori', '4226 Williamsburg Drive, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (3, 'Beynon', 'Annette', '4240 South 6400 West, West Valley City, Utah 84128-6524');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (4, 'Kelly', 'Norman and Jill', '4213 South 6820 West, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (5, 'Sandstrom', 'Chris and Angela', '6564 West Brookview Circle, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (6, 'Smith', 'Tim and Mary', '4277 South 6220 West, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (7, 'Rackley', 'Donna', '4240 South 6400 West, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (8, 'Beckstrom', 'Scott and Dianna', '6498 West 4200 South, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (9, 'Brown', 'Scott and Lisa', '6314 West King Valley Drive, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (10, 'Fischer', 'Melissa Anne', '6486 West 4200 South, West Valley City, Utah 84128');
INSERT INTO ministering.family (id, name, couple_name, address) VALUES (11, 'Schwab', 'Richard and Jessica', '6334 West 4215 South, West Valley City, Utah 84128');

INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (1, 1, 1, 'HEAD_OF_HOUSE', 'David', 'Quenten', 'Romney', '1962-08-29');
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (2, 1, 1, 'SPOUSE', 'Christine', 'H', 'Romney', '1961-12-29');
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (3, 1, 2, 'HEAD_OF_HOUSE', 'Peter', null, 'King', null);
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (4, 1, 2, 'SPOUSE', 'Lori', null, 'King', null);
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (5, 1, 8, 'HEAD_OF_HOUSE', 'Scott', null, 'Beckstrom', '1962-01-01');
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (6, 1, 8, 'SPOUSE', 'Dianna', null, 'Beckstrom', '1972-01-01');
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (7, 1, 8, 'CHILD', 'Kyle', null, 'Beckstrom', '1998-01-01');
INSERT INTO ministering.member (id, org_id, family_id, type, first_name, middle_name, last_name, birthdate) VALUES (8, 1, 4, 'CHILD', 'Adam', null, 'King', null);

INSERT INTO ministering.email (id, member_id, type, address) VALUES (1, 1, 'INDIVIDUAL', 'dqromney@gmail.com');
INSERT INTO ministering.email (id, member_id, type, address) VALUES (2, 2, 'INDIVIDUAL', 'hatchc4@gmail.com');

INSERT INTO ministering.phone (id, member_id, type, number, text_msg_okay) VALUES (1, 1, 'MOBILE', '801-834-4855', 1);
INSERT INTO ministering.phone (id, member_id, type, number, text_msg_okay) VALUES (2, 2, 'MOBILE', '801-834-1084', 1);
INSERT INTO ministering.phone (id, member_id, type, number, text_msg_okay) VALUES (3, 1, 'LAND_LINE', '801-967-1692', 0);
INSERT INTO ministering.phone (id, member_id, type, number, text_msg_okay) VALUES (4, 2, 'LAND_LINE', '801-967-1692', 0);

INSERT INTO ministering.companionship (id, name) VALUES (1, 'Romney/King');
INSERT INTO ministering.companionship (id, name) VALUES (2, 'Beckstrom/Beckstrom/King');

INSERT INTO ministering.companion (id, member_id, companionship_id) VALUES (1, 1, 1);
INSERT INTO ministering.companion (id, member_id, companionship_id) VALUES (2, 3, 1);
INSERT INTO ministering.companion (id, member_id, companionship_id) VALUES (3, 5, 2);
INSERT INTO ministering.companion (id, member_id, companionship_id) VALUES (4, 7, 2);
INSERT INTO ministering.companion (id, member_id, companionship_id) VALUES (5, 8, 2);

INSERT INTO ministering.stewardship (id, companionship_id) VALUES (1, 1);
INSERT INTO ministering.stewardship (id, companionship_id) VALUES (2, 2);

INSERT INTO ministering.ministry (id, member_id, companionship_id, stewardship_id) VALUES (1, 1, 1, 1);
INSERT INTO ministering.ministry (id, member_id, companionship_id, stewardship_id) VALUES (2, 3, 1, 1);
INSERT INTO ministering.ministry (id, member_id, companionship_id, stewardship_id) VALUES (3, 5, 2, 2);
INSERT INTO ministering.ministry (id, member_id, companionship_id, stewardship_id) VALUES (4, 7, 2, 2);
INSERT INTO ministering.ministry (id, member_id, companionship_id, stewardship_id) VALUES (5, 8, 2, 2);

INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (1, 1, 3);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (2, 1, 4);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (3, 1, 5);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (4, 1, 6);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (5, 1, 7);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (6, 2, 9);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (7, 2, 10);
INSERT INTO ministering.assignment (id, stewardship_id, family_id) VALUES (8, 2, 11);

