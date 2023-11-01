CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(90) NOT NULL,
	"email" varchar(90) NOT NULL,
	"password" varchar(90) NOT NULL
);
