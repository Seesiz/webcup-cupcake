const PostAnnonce = require('../models/PostAnnonce.model');
const PostAnnonceDetail = require('../models/PostAnnonceDetail.model');
const PropositionAnnonceDetail = require('../models/PropositionAnnonceDetail.model');
const { addCompetenceUser, removeCompetenceUser } = require('./competence.services');

const posterAnnonce = async (userId, competenceId, competenceRechercheId, titre, description) => {
    try {
        // Insérer un nouveau post d'annonce dans la base de données
        const nouvelleAnnonce = await PostAnnonce.create({
            id_utilisateur: userId,
            id_competence: competenceId,
            id_competence_recherche: competenceRechercheId,
            titre: titre,
            description: description
        });

        // Retourner le nouvel objet d'annonce créé
        return nouvelleAnnonce;
    } catch (error) {
        // Gérer les erreurs si l'insertion échoue
        console.error('Erreur lors du post de l\'annonce :', error);
        throw new Error('Erreur lors du post de l\'annonce');
    }
}

const getListeAnnonces = async () => {
    try {
        // Récupérer la liste des annonces avec les détails
        const annonces = await PostAnnonceDetail.findAll();
    
        // Retourner la liste des annonces
        return annonces;
    } catch (error) {
        // Gérer les erreurs si la récupération échoue
        console.error('Erreur lors de la récupération de la liste des annonces :', error);
        throw new Error('Erreur lors de la récupération de la liste des annonces');
    }
}

const proposerAnnonce = async (annonceId, proposeurId, competenceProposeeId) => {
    try {
        // Insérer une nouvelle proposition d'annonce dans la base de données
        const nouvelleProposition = await PropositionAnnonce.create({
            id_post: annonceId,
            id_utilisateur: proposeurId,
            id_competence: competenceProposeeId
        });
    
        // Retourner la nouvelle proposition d'annonce créée
        return nouvelleProposition;
    } catch (error) {
        // Gérer les erreurs si l'insertion échoue
        console.error('Erreur lors de la proposition de l\'annonce :', error);
        throw new Error('Erreur lors de la proposition de l\'annonce');
    }
}

const getPropositionAnnonce = async (annonceId) => {
    try {
        // Récupérer la liste des propositions pour une annonce donnée
        const propositions = await PropositionAnnonceDetail.findAll({
            where: {
                id_post: annonceId
            },
            order: [["date_creation", "DESC"]]
        });
  
        // Retourner la liste des propositions
        return propositions;
    } catch (error) {
        // Gérer les erreurs si la récupération échoue
        console.error('Erreur lors de la récupération des propositions de l\'annonce :', error);
        throw new Error('Erreur lors de la récupération des propositions de l\'annonce');
    }
}

// Créons une fonction qui prendra en parametre l'id de l'annonce et qui permettra de cloturer l'annonce
// en changeant le statut de l'annonce à cloturé (colonne etat) sur terminé (value: 50)
const endAnnonce = async (annonceId) => {
    // on update si l'annonce existe
    const annonce = await PostAnnonce.findOne({
        where: {
            id: annonceId
        }
    });
    // puis on update si l'on a trouvé l'annonce
    if (annonce) {
        annonce.etat = 50;
        await annonce.save();
        return annonce;
    }
    return null;
}

// Créons une fonction pour echanger la competence de deux utilisateurs
// on donnera en argument l'id de l'utilisateur qui propose l'echange, 
// l'id de l'utilisateur qui accepte l'echange
// l'id de la competence que l'utilisateur qui propose l'echange 
// l'id de la competence que l'utilisateur qui accepte l'echange 
// l'id de l'annonce qui a permis de faire l'echange
const echangerCompetence = async (userIdProposeur, userIdAccepteur, competenceIdProposeur, competenceIdAccepteur, idAnnonce) => {
    try {
        // On commence par supprimer la competence de l'utilisateur qui propose l'echange
        await addCompetenceUser(userIdProposeur, competenceIdAccepteur);
        await addCompetenceUser(userIdAccepteur, competenceIdProposeur);

        await removeCompetenceUser(userIdProposeur, competenceIdProposeur);
        await removeCompetenceUser(userIdAccepteur, competenceIdAccepteur);

        // On cloture l'annonce
        await endAnnonce(idAnnonce);
        
        // On retourne un message de succes
        return true;
    } catch (error) {
        // Gérer les erreurs si l'insertion échoue
        console.error('Erreur lors de l\'echange de competence :', error);
        throw new Error('Erreur lors de l\'echange de competence');
    }
}

const getPropositionAnnonceById = async (propositionId) => {
    try {
        // Récupérer la proposition d'annonce par son id
        const proposition = await PropositionAnnonceDetail.findOne({
            where: {
                id: propositionId
            }
        });
        return proposition;
    } catch (error) {
        // Gérer les erreurs si la récupération échoue
        console.error('Erreur lors de la récupération de la proposition de l\'annonce :', error);
        throw new Error('Erreur lors de la récupération de la proposition de l\'annonce');
    }
}

// Créons une fonction getAnnonceById qui prendra en parametre l'id de l'annonce
// et qui permettra de recuperer l'annonce
const getAnnonceById = async (annonceId) => {
    try {
        // Récupérer l'annonce par son id
        const annonce = await PostAnnonceDetail.findOne({
            where: {
                id: annonceId
            }
        });
        return annonce;
    } catch (error) {
        // Gérer les erreurs si la récupération échoue
        console.error('Erreur lors de la récupération de l\'annonce :', error);
        throw new Error('Erreur lors de la récupération de l\'annonce');
    }

}

// créons une fonction troquerCompetence 
// qui prendra en parametre l'id de l'annonce et l'id de la proposition
// et qui permettra de faire l'echange de competence
const troquerCompetence = async (annonceId, propositionId) => {
    try {
        // On récupère la proposition
        const proposition = await getPropositionAnnonceById(propositionId);
        const annonce = await getAnnonceById(annonceId);
        // On fait l'echange de competence
        await echangerCompetence(annonce.id_utilisateur, proposition.id_utilisateur, annonce.id_competence, proposition.id_competence, annonceId);
        return true;
    } catch (error) {
        // Gérer les erreurs si l'insertion échoue
        console.error('Erreur lors de l\'echange de competence :', error);
        throw new Error('Erreur lors de l\'echange de competence');
    }
}

module.exports = {
    posterAnnonce,
    getListeAnnonces,
    proposerAnnonce,
    getPropositionAnnonce,
    echangerCompetence,
    getPropositionAnnonceById,
    troquerCompetence,
    getAnnonceById
};
