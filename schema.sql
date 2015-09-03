CREATE TABLE users (
	id integer PRIMARY KEY,
	email_address varchar(100) NOT NULL,
	created_at timestamp DEFAULT localtimestamp NOT NULL,
	last_email_sent timestamp DEFAULT localtimestamp
);