const trocService = require('../services/troc.services');

const getAllAnnonces = async (req, res) => {
    try {
        // Récupérer la liste des annonces
        const annonces = await trocService.getListeAnnonces();
    
        // Retourner la liste des annonces au format JSON
        res.json(annonces);
    } catch (error) {
        // Gérer les erreurs si la récupération échoue
        console.error('Erreur lors de la récupération de la liste des annonces :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la liste des annonces' });
    }
}

const createPost = async (req, res) => {
    try {
        const { userId, competenceId, competenceRechercheId, titre, description } = req.body;
    
        // Vérifier si toutes les données nécessaires sont fournies
        if (!userId || !competenceId || !titre || !description) {
            return res.status(400).json({ message: 'Toutes les données nécessaires doivent être fournies' });
        }
    
        // Créer un nouveau post d'annonce
        const nouvelleAnnonce = await trocService.posterAnnonce(userId, competenceId, competenceRechercheId, titre, description);
    
        // Retourner le nouveau post d'annonce créé
        res.status(201).json(nouvelleAnnonce);
    } catch (error) {
        // Gérer les erreurs si la création échoue
        console.error('Erreur lors de la création du post d\'annonce :', error);
        res.status(500).json({ message: 'Erreur lors de la création du post d\'annonce' });
    }
}

const proposerAnnonce = async (req, res) => {
    try {
        const { annonceId, proposeurId, competenceProposeeId } = req.body;
    
        // Vérifier si toutes les données nécessaires sont fournies
        if (!annonceId || !proposeurId || !competenceProposeeId) {
            return res.status(400).json({ message: 'Toutes les données nécessaires doivent être fournies' });
        }
    
        // Proposer une annonce
        const nouvelleProposition = await trocService.proposerAnnonce(annonceId, proposeurId, competenceProposeeId);
    
        // Retourner la nouvelle proposition d'annonce créée
        res.status(201).json(nouvelleProposition);
    } catch (error) {
        // Gérer les erreurs si la proposition échoue
        console.error('Erreur lors de la proposition d\'annonce :', error);
        res.status(500).json({ message: 'Erreur lors de la proposition d\'annonce' });
    }
  }
  
const getListePropositionsParPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const propositions = await trocService.getPropositionAnnonce(postId);
    
        // Retourner la liste des propositions au format JSON
        res.json(propositions);
    } catch (error) {
        // Gérer les erreurs si la récupération échoue
        console.error('Erreur lors de la récupération de la liste des propositions pour le post :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la liste des propositions pour le post' });
    }
}

module.exports = {
    getAllAnnonces,
    createPost,
    proposerAnnonce,
    getListePropositionsParPost
};