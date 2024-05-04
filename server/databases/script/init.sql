

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
        UTILISATEUR_COMPETENCE.*,
        COMPETENCE_DERIVE.id_racine as root
    FROM UTILISATEUR_COMPETENCE u
    JOIN COMPETENCE_DERIVE c ON u.id_competence = c.id;

-- DROP TABLE UTILISATEUR_COMPETENCE;
-- DROP TABLE COMPETENCE_DERIVE;
-- DROP TABLE COMPETENCE_RACINE;

INSERT INTO utilisateur (id, nom, email, motdepasse) VALUES (1, 'admin', 'admin@gmail.com', 'password');
INSERT INTO utilisateur (id, nom, email, motdepasse) VALUES (2, 'webcup', 'webcup@gmail.com', 'password');