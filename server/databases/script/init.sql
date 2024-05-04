

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
INSERT INTO UTILISATEUR_COMPETENCE (id_utilisateur, id_competence) VALUES (1, 1);

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
