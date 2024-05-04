

-- Création d'un nouvel utilisateur
CREATE USER 'webcup'@'%' IDENTIFIED BY 'webcuppass';

-- Attribution des privilèges à l'utilisateur
GRANT ALL PRIVILEGES ON webcup_competence.* TO 'webcup'@'%';

-- Création des tables utilisateurs
CREATE TABLE utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) default '',
    avatar VARCHAR(255) default '',
    email VARCHAR(255) NOT NULL,
    motdepasse VARCHAR(255) NOT NULL,
    date_inscription DATETIME DEFAULT NOW()
);

-- Création des tables de compétences racines Eau, Feu, Terre et Air
CREATE TABLE COMPETENCE_RACINE (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    couleur VARCHAR(100) default ''
);

-- Créationd des tables des compétences dérivés des compétences racines
CREATE TABLE COMPETENCE_DERIVE (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    types VARCHAR(100) NOT NULL,
    icon VARCHAR(255) default '',
    description TEXT,
    ordre INT default 0,
    id_racine INT,
    FOREIGN KEY (id_racine) REFERENCES COMPETENCE_RACINE(id)
);

-- Création de la table de liaison entre les compétences et les utilisateurs
CREATE TABLE UTILISATEUR_COMPETENCE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_utilisateur INT,
    id_competence INT,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id),
    FOREIGN KEY (id_competence) REFERENCES COMPETENCE_DERIVE(id)
);

-- Création de view pour récupérer les compétences d'un utilisateur
CREATE VIEW COMPETENCES_UTILISATEUR AS
    SELECT
        u.id AS id_utilisateur,
        c.id AS id_competence,
        c.title,
        c.types,
        c.icon,
        c.description,
        c.ordre,
        c.id_racine as root
    FROM UTILISATEUR_COMPETENCE u
    JOIN COMPETENCE_DERIVE c ON u.id_competence = c.id;

-- Création de view avec Utilisateur_competence et le type de compétence
CREATE VIEW UTILISATEUR_COMPETENCE_TYPED AS
    SELECT
        u.*,
        c.id_racine as root
    FROM UTILISATEUR_COMPETENCE u
    JOIN COMPETENCE_DERIVE c ON u.id_competence = c.id;

-- DROP TABLE UTILISATEUR_COMPETENCE;
-- DROP TABLE COMPETENCE_DERIVE;
-- DROP TABLE COMPETENCE_RACINE;

INSERT INTO utilisateur (id, nom, email, motdepasse) VALUES (1, 'admin', 'admin@gmail.com', 'password');
INSERT INTO utilisateur (id, nom, email, motdepasse) VALUES (2, 'webcup', 'webcup@gmail.com', 'password');

-- Insertion des compétences racines
INSERT INTO COMPETENCE_RACINE (id, title, couleur) VALUES (1, 'Eau', '#3498db');
INSERT INTO COMPETENCE_RACINE (id, title, couleur) VALUES (2, 'Feu', '#e74c3c');
INSERT INTO COMPETENCE_RACINE (id, title, couleur) VALUES (3, 'Terre', '#f39c12');
INSERT INTO COMPETENCE_RACINE (id, title, couleur) VALUES (4, 'Air', '#1abc9c');

-- Insertion des compétences dérivées, comme dans Avatar the last Airbender
-- Ajout des elements de base Eau, Feu, Terre et Air
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (1, 'Base Eau', 'Eau', 'fa fa-tint', 'Element de base Eau', 0, 1);
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (2, 'Base Feu', 'Feu', 'fa fa-fire', 'Element de base Feu', 0, 2);
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (3, 'Base Terre', 'Terre', 'fa fa-leaf', 'Element de base Terre', 0, 3);
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (4, 'Base Air', 'Air', 'fa fa-cloud', 'Element de base Air', 0, 4);

-- Ajout des elements derivée de Feu
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (5, 'Foudre', 'Feu', 'fa fa-fire', 'Foudre', 50, 2);
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (6, 'Boue', 'Terre et eau', 'fa fa-fire', 'Foudre', 100, 2);

-- Insertion des compétences dérivées à une personne
INSERT INTO UTILISATEUR_COMPETENCE (id_utilisateur, id_competence) VALUES (1, 1);
INSERT INTO UTILISATEUR_COMPETENCE (id_utilisateur, id_competence) VALUES (2, 2);

-- Création de table pour les post sur l'annonce de proposition d'échange de compétence
-- On y mettra le titre du post et la description
-- L'id de l'utilisateur qui a créé le post
-- L'id de la compétence que l'utilisateur a 
-- L'id de la compétence que l'utilisateur cherche (mais pas obligatoire)
-- La date de création du post
-- La date de modification du post
-- etat du post (0 = en attente, 50 = conclu, 100 = annulé ou supprimé)
CREATE TABLE POST_ANNONCE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    id_utilisateur INT,
    id_competence INT,
    id_competence_recherche INT,
    date_creation DATETIME DEFAULT NOW(),
    date_modification DATETIME DEFAULT NOW(),
    etat INT default 0,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id),
    FOREIGN KEY (id_competence) REFERENCES COMPETENCE_DERIVE(id),
    FOREIGN KEY (id_competence_recherche) REFERENCES COMPETENCE_DERIVE(id)
);

-- Création de table pour les proposition recu par l'annonce de proposition d'échange de compétence
-- On y mettra l'id de l'annonce
-- L'id de l'utilisateur qui a fait la proposition
-- L'id de la compétence que l'utilisateur propose
-- La date de création de la proposition
-- l'etat de la proposition (0 = en attente, 50 = conclu, 100 = annulé ou supprimé)
CREATE TABLE PROPOSITION_ANNONCE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_post INT,
    id_utilisateur INT,
    id_competence INT,
    date_creation DATETIME DEFAULT NOW(),
    etat INT default 0,
    FOREIGN KEY (id_post) REFERENCES POST_ANNONCE(id),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id),
    FOREIGN KEY (id_competence) REFERENCES COMPETENCE_DERIVE(id)
);

-- Création de view pour récupérer les informations des post d'annonce
-- avec les informations de l'utilisateur qui a créé le post
-- et les details sur les compétences (qu'il a et qu'il cherche)
-- avec le nombre de proposition reçu
CREATE VIEW POST_ANNONCE_DETAIL AS
    SELECT 
        p.*,
        u.nom as nom_utilisateur,
        u.prenom as prenom_utilisateur,
        u.avatar as avatar_utilisateur,
        c.title as titre_competence,
        c.types as types_competence,
        c.icon as icon_competence,
        c.description as description_competence,
        c.ordre as ordre_competence,
        c.id_racine as root_competence,
        cr.title as titre_racine_competence,
        cr.couleur as couleur_racine_competence,
        cr.id as id_racine_competence,
        cr.id as id_root_competence,
        (SELECT COUNT(*) FROM PROPOSITION_ANNONCE WHERE id_post = p.id) as nb_proposition
    FROM POST_ANNONCE p
    JOIN utilisateur u ON p.id_utilisateur = u.id
    JOIN COMPETENCE_DERIVE c ON p.id_competence = c.id
    JOIN COMPETENCE_RACINE cr ON c.id_racine = cr.id;

-- Création de view pour récupérer les informations des proposition d'annonce
-- avec les informations de l'utilisateur qui a fait la proposition
-- et les details sur les compétences (qu'il propose)
-- on joindra la table PROPOSITION_ANNONCE aveec POST_ANNONCE
-- pour avoir l'id de la compétence recherché
-- puis on ajoutera un colonne qui va indiquer si la proposition coincide 
-- avec la compétence recherché (1 = oui, 0 = non)
CREATE VIEW PROPOSITION_ANNONCE_DETAIL AS
    SELECT 
        p.*,
        u.nom as nom_utilisateur,
        u.prenom as prenom_utilisateur,
        u.avatar as avatar_utilisateur,
        c.title as titre_competence,
        c.types as types_competence,
        c.icon as icon_competence,
        c.description as description_competence,
        c.ordre as ordre_competence,
        c.id_racine as id_root_competence,
        cr.title as titre_racine_competence,
        cr.couleur as couleur_racine_competence,
        cr.id as id_racine_competence,
        cr.id as root_competence,
        CASE WHEN p.id_competence = pa.id_competence_recherche 
            THEN 1 ELSE 0 
        END as is_matching
    FROM PROPOSITION_ANNONCE p
    JOIN POST_ANNONCE pa ON p.id_post = pa.id
    JOIN utilisateur u ON p.id_utilisateur = u.id
    JOIN COMPETENCE_DERIVE c ON p.id_competence = c.id
    JOIN COMPETENCE_RACINE cr ON c.id_racine = cr.id;

-- Insertion d'annonce fait par l'utilisateur 2
-- qui cherche un utilisateur qui a la compétence Base Feu (id = 2)
-- et qui propose la compétence Base Eau (id = 1)
INSERT INTO POST_ANNONCE (id, titre, description, id_utilisateur, id_competence, id_competence_recherche) VALUES (1, 'Cherche Base Feu', 'Je cherche quelqu''un qui a la compétence Base Feu', 2, 1, 2);

-- Insertion de proposition fait par l'utilisateur 1
-- qui propose la compétence Base Eau (id = 1)
-- pour l'annonce de l'utilisateur 2 (id du post = 1)
INSERT INTO PROPOSITION_ANNONCE (id, id_post, id_utilisateur, id_competence) VALUES (1, 1, 1, 1);

-- Insertion de compétences dérivées, comme dans Avatar the last Airbender
-- Ajout des elements de base Eau, Feu, Terre et Air
INSERT INTO COMPETENCE_DERIVE (id, title, types, icon, description, ordre, id_racine) VALUES (7, 'Glace', 'Eau', 'fa fa-snowflake', 'Glace', 50, 1);

-- Ajout de l'element de glace (id = 7) à l'utilisateur 1
INSERT INTO UTILISATEUR_COMPETENCE (id_utilisateur, id_competence) VALUES (1, 7);

-- Ajout de l'element de foudre (id = 5) à l'utilisateur 2
INSERT INTO UTILISATEUR_COMPETENCE (id_utilisateur, id_competence) VALUES (2, 5);

-- Proposition de l'element Glace
-- Par l'utilisateur 1 pour l'annonce de l'utilisateur 2
INSERT INTO PROPOSITION_ANNONCE (id, id_post, id_utilisateur, id_competence) VALUES (2, 1, 1, 7);

-- SELECT des annonces (titre et id) avec le nombre de proposition reçu
-- avec le view PROPOSITION_ANNONCE_DETAIL
SELECT p.id, p.titre, p.nb_proposition FROM POST_ANNONCE_DETAIL p;

-- Inserons un post annonce pour l'utilisateur 1
-- qui cherche un utilisateur qui a la compétence Base Foudre (id = 5)
-- et qui propose la compétence Base Eau (id = 1)
INSERT INTO POST_ANNONCE 
    (titre, description, id_utilisateur, id_competence, id_competence_recherche) 
VALUES ('Cherche Base Foudre', 'Je cherche quelqu''un qui a la compétence Base Foudre', 1, 1, 5);
create table competence_link (
  id int primary key auto_increment,
  child int,
  parent int,
  foreign key (child) references COMPETENCE_DERIVE(id),
  foreign key (parent) references COMPETENCE_DERIVE(id)
);
alter table competence_link add column xp_required int;
insert into competence_link(child, parent) values (5, 1);
insert into competence_link(child, parent) values (6, 1);
insert into competence_link(child, parent) values (6, 3);

create table user_xp (
  id int primary key auto_increment,
  user_id int,
  xp int,
  xp_plus int,
  foreign key (user_id) references utilisateur(id)
);
insert into user_xp (user_id, xp, xp_plus) values (1, 15, 3);
alter table user_xp add column dateins timestamp default current_timestamp;


alter table COMPETENCE_DERIVE add column x int default 0;
alter table COMPETENCE_DERIVE add column y int default 0;
