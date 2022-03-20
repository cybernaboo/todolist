-- Table: public.taches

DROP TABLE IF EXISTS public.taches;

CREATE TABLE IF NOT EXISTS public.taches
(
    id integer NOT NULL DEFAULT nextval('taches_id_seq'::regclass),
    tache character varying(30) COLLATE pg_catalog."default" NOT NULL,
    echeance date,
    cloture boolean NOT NULL DEFAULT false,
    CONSTRAINT taches_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.taches
    OWNER to postgres;