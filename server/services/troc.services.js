const PostAnnonce = require('../models/PostAnnonce.model');
const PostAnnonceDetail = require('../models/PostAnnonceDetail.model');
const PropositionAnnonceDetail = require('../models/PropositionAnnonceDetail.model');

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

module.exports = {
    posterAnnonce,
    getListeAnnonces,
    proposerAnnonce,
    getPropositionAnnonce
};
