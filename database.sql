create table if not exists donator.person(
    id_person serial primary key, 
    name varchar(50) not null,
	phone varchar,
	street varchar,
	neighborhood varchar,
	city varchar,
	state varchar,
	cep varchar
);

create table if not exists donator.donation (
    id_donation serial primary key,
    id_person integer references donator.person,
    date timestamp with time zone,
    address jsonb
);

create table if not exists donator.product(
    id_product serial primary key,
    category varchar, 
    description varchar,
    id_donation integer references donator.donation,
    size varchar
);

drop table donator.product;
drop table donator.donation;
drop table donator.person;