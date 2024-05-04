const CompetenceDerive = require("../models/CompetenceDerivee.model");
const CompetenceRacine = require("../models/CompetenceRacine.model");
const UtilisateurCompetenceTyped = require("../models/UserCompetenceTyped.model");


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
        const competenceDerive = await CompetenceDerive.findAll({
            order: [['ordre', 'ASC']]
        });
    
        // Retourner les compétences racine récupérées
        return competenceDerive.map((userSkill) => userSkill.dataValues);;
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
        return userSkills.map((userSkill) => userSkill.dataValues);
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences de l\'utilisateur :', error);
        throw new Error('Erreur lors de la récupération des compétences de l\'utilisateur');
    }
}
  
const getUserSkillsByRoute = async (userId, skillRouteId) => {
    const skills = (await getSkillDerived()).filter(skill => {
        return skill.id_racine === skillRouteId;
    });
    const userSkills = (await getUserSkill(userId, skillRouteId)).map(userSkill => userSkill.id_competence);
    console.log(userSkills);
    console.log(skills);
    return skills.map(skill => {
        console.log("id", skill.id, !userSkills.includes(skill.id));
      return {
        ...skill,
        blocked: !userSkills.includes(skill.id)
      };
    });
};
  
const getUserSkillAndPrepare = async (userId) => {
    let skillRoutes = await getSkillRoutes();
    let result = [];
    for (let i = 0; i < skillRoutes.length; i++) {
        let skills = await getUserSkillsByRoute(userId, skillRoutes[i].id);
        result.push({
            root: skillRoutes[i].title,
            skills: skills
        });
    }
    return result;
  
}

module.exports = {
    getUserSkillAndPrepare,
    getSkillDerived,
    getSkillRoutes,
    getUserSkill,
    getUserSkillsByRoute
}
  
  