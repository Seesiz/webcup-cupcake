const CompetenceDerive = require("../models/CompetenceDerivee.model");
const CompetenceRacine = require("../models/CompetenceRacine.model");


const getSkillRoutes = async () => {
    // Get all 'CompetenceRacine' in the database
    try {
        // Utiliser la méthode findAll de CompetenceRacine pour récupérer tous les éléments
        const competencesRacine = await CompetenceRacine.findAll();
    
        // Retourner les compétences racine récupérées
        return competencesRacine;
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences racine :', error);
        throw new Error('Erreur lors de la récupération des compétences racine');
    }
}
  
const getSkillDerived = async () => {
    // Get all 'CompetenceDerive' in the database
    try {
        // Utiliser la méthode findAll de CompetenceDerive pour récupérer tous les éléments
        const competenceDerive = await CompetenceDerive.findAll();
    
        // Retourner les compétences racine récupérées
        return competenceDerive;
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences racine :', error);
        throw new Error('Erreur lors de la récupération des compétences racine');
    }
}

const getUserSkill = async (userId, skillRouteId) => {
    try {
        // Utiliser la méthode findAll de UtilisateurCompetence pour trouver toutes les compétences de l'utilisateur
        const userSkills = await UtilisateurCompetenceTyped.findAll({
            where: {
                id_utilisateur: userId,
                root: skillRouteId
            }
        });
    
        // Retourner les compétences de l'utilisateur
        return userSkills;
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences de l\'utilisateur :', error);
        throw new Error('Erreur lors de la récupération des compétences de l\'utilisateur');
    }
}
  
const getUserSkillsByRoute = async (userId, skillRouteId) => {
    const skills = getSkillDerived().filter(skill => skill.root === skillRouteId);
    const userSkills = getUserSkill(userId, skillRouteId).map(userSkill => userSkill.id_competence);
  
    return skills.map(skill => {
      return {
        ...skill,
        blocked: !userSkills.includes(skill.id)
      };
    });
};
  
const getUserSkillAndPrepare = async (userId) => {
    let skillRoutes = await getSkillRoutes()
    return skillRoutes.map(route => {
      return {
        root: route.title,
        skills: getUserSkillsByRoute(userId, route.title)
      };
    });
  
}

module.exports = {
    getUserSkillAndPrepare,
    getSkillDerived,
    getSkillRoutes,
    getUserSkill,
    getUserSkillsByRoute
}
  
  