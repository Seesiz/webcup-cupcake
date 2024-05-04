const CompetenceDerive = require("../models/CompetenceDerivee.model");
const CompetenceRacine = require("../models/CompetenceRacine.model");
const UtilisateurCompetenceTyped = require("../models/UserCompetenceTyped.model");
const CompetenceLink = require("../models/CompetenceLink.model");
const User = require("../models/User.model");
const UserXp = require("../models/UserXp.model");
const {where} = require("sequelize");


const getSkillRoutes = async () => {
    // Get all 'CompetenceRacine' in the database
    try {
        // Utiliser la méthode findAll de CompetenceRacine pour récupérer tous les éléments
      // Retourner les compétences racine récupérées
        return await CompetenceRacine.findAll();
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
      // Retourner les compétences racine récupérées
        return await CompetenceDerive.findAll({
          order: [['ordre', 'ASC']]
        });
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences racine :', error);
        throw new Error('Erreur lors de la récupération des compétences racine');
    }
}

const getUserSkill = async (userId, skillRouteId) => {
    try {
        // Utiliser la méthode findAll de UtilisateurCompetence pour trouver toutes les compétences de l'utilisateur
      // Retourner les compétences de l'utilisateur
        return await UtilisateurCompetenceTyped.findAll({
          where: {
            id_utilisateur: userId,
            root: skillRouteId
          }
        });
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences de l\'utilisateur :', error);
        throw new Error('Erreur lors de la récupération des compétences de l\'utilisateur');
    }
}

const getUserSkillsByRoute = async (user, skillRouteId) => {
  console.log("user", user)
    let userId = user.id;
    const skills = (await getSkillDerived()).filter(skill => {
        return skill.id_racine === skillRouteId;
    });
    const userSkills = (await getUserSkill(userId, skillRouteId)).map(userSkill => userSkill.id_competence);
    console.log(userSkills);
    console.log(skills);
    let results = []
    let userXp = (await getUserXp(user)).xpPlus
    for (let i = 0; i < skills.length; i++) {
      let skill = skills[i];
      console.log("id", skill.id, !userSkills.includes(skill.id));
      console.log("userXp", userXp)
      let loadedSkill = await prepareSkillParent(skill, userXp)
      results = [
        ...results,
        {
          ...loadedSkill.skill,
          blocked: !userSkills.includes(skill.id),
          unblockable: loadedSkill.unblockable
        }
      ]
    }
    return results
};

const getUserXp = async (user) => {
  return await UserXp.findOne({
    where: {
      userId: user.id
    },
    order: [
      ['dateins', 'DESC'] // Ordonne par dateins de façon décroissante pour obtenir la dernière XP enregistrée en premier
    ]
  })
}

const prepareSkillParent = async (skill, userXp) => {
  console.log("search skill parent")
  let results = await CompetenceLink.findAll({
    where : {
      child: skill.id
    }
  })
  console.log("found results")
  let parents = results.map(result => result.parent)
  let maxXp = results.reduce((max, current) => {
    return Math.max(max, current.xp_required);
  }, 0);
  console.log("maxXp: " + maxXp);
  return {
    skill : {
      ...skill.dataValues,
      parents: parents
    },
    unblockable : userXp >= maxXp
  }
}

const getUserSkillAndPrepare = async (userId) => {
    let skillRoutes = await getSkillRoutes();
    let result = [];
    let user = await  User.findOne({
      where: {
        id : userId
      }
    });
    console.log("userid", user.id);
    for (let i = 0; i < skillRoutes.length; i++) {

        let skills = await getUserSkillsByRoute(user, skillRoutes[i].id);
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

