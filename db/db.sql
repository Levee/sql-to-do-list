create table "tdlist" (
	id serial primary key,
	name varchar(50) not null,
	detail varchar(300) not null,
	priority varchar not null 
		constraint chk_priority 
		check (priority in('Low', 'Normal', 'High', 'Urgent'))
		default 'Normal',
	status varchar not null
		constraint chk_status
		check (status in('Uncompleted', 'Completed'))
		default 'Uncompleted',
	time_done time default null
);