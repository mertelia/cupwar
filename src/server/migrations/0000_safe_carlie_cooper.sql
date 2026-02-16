CREATE TABLE "scores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "scores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nick" text NOT NULL,
	"score" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"country" text
);
