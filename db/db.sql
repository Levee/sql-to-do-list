create table "tdlist" (
	id serial primary key,
	name varchar(50) not null,
	detail varchar(300) not null,
	priority int not null 
		constraint chk_priority 
		check (priority in('4', '3', '2', '1'))
		default '2',
	status boolean not null
		default false,
	time_done time default null
);