const CompetenceDerive = require("../models/CompetenceDerivee.model");
const CompetenceRacine = require("../models/CompetenceRacine.model");
const UtilisateurCompetenceTyped = require("../models/UserCompetenceTyped.model");
const CompetenceLink = require("../models/CompetenceLink.model");
const User = require("../models/User.model");
const UserXp = require("../models/UserXp.model");
const UtilisateurCompetence = require("../models/UserCompetence.model");


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
        const competenceDerive = await CompetenceDerive.findAll({
          order: [['ordre', 'ASC']]
        });
        // Retourner les compétences racine récupérées
        return competenceDerive.map((userSkill) => userSkill.dataValues);
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
        let userSkills = await UtilisateurCompetenceTyped.findAll({
          where: {
            id_utilisateur: userId,
            root: skillRouteId
          }
        });
        // Retourner les compétences de l'utilisateur
        return userSkills.map((userSkill) => userSkill);
    } catch (error) {
        // Gérer les erreurs si la requête échoue
        console.error('Erreur lors de la récupération des compétences de l\'utilisateur :', error);
        throw new Error('Erreur lors de la récupération des compétences de l\'utilisateur');
    }
}

const getUserSkillsByRoute = async (user, skillRouteId) => {
  // console.log("user", user)
    let userId = user.id;
    const skills = (await getSkillDerived()).filter(skill => {
        return skill.id_racine === skillRouteId;
    });
    const userSkills = (await getUserSkill(userId, skillRouteId)).map(userSkill => userSkill.id_competence);
    // console.log(userSkills);
    // console.log(skills);
    let results = []
    let userXp = (await getUserXp(user)).xpPlus
    for (let i = 0; i < skills.length; i++) {
      let skill = skills[i];
      // console.log("id", skill.id, !userSkills.includes(skill.id));
      // console.log("userXp", userXp)
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
  // console.log("search skill parent")
  // console.log("skill", skill)
  let results = await CompetenceLink.findAll({
    where : {
      child: skill.id
    }
  })
  // console.log("found results")
  let parents = results.map(result => result.parent)
  let maxXp = results.reduce((max, current) => {
    return Math.max(max, current.xp_required);
  }, 0);
  // console.log("maxXp: " + maxXp);
  return {
    skill : {
      ...skill,
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
    // console.log("userid", user.id);
    for (let i = 0; i < skillRoutes.length; i++) {

        let skills = await getUserSkillsByRoute(user, skillRoutes[i].id);
        result.push({
            root: skillRoutes[i].title,
            skills: skills
        });
    }
    return result;
}

// Créons une fonction addCompetenceUser pour ajouter une compétence à un utilisateur
// la fonction prendra en argument l'id de l'utilisateur et l'id de la compétence
// et retournera la compétence ajoutée
const addCompetenceUser = async (userId, skillId) => {
  // on vérifie si l'utilisateur a déjà la compétence dans la base de données
  // Si il l'a déjà, on retournera cette cette information, sinon on ajoutera la compétence à l'utilisateur
  return await UtilisateurCompetence.findOrCreate({
    where: {
      id_utilisateur: userId,
      id_competence: skillId
    }
  });
}

// Créons une fonction removeCompetenceUser pour supprimer une compétence à un utilisateur
// la fonction prendra en argument l'id de l'utilisateur et l'id de la compétence
// et retournera la compétence supprimée
const removeCompetenceUser = async (userId, skillId) => {
  // on vérifie si l'utilisateur a déjà la compétence dans la base de données
  // Si il l'a déjà, on la supprimera, sinon on return null
  return await UtilisateurCompetence.destroy({
    where: {
      id_utilisateur: userId,
      id_competence: skillId
    }
  });
}

const getBasicCompetence = async () => {
  return await CompetenceDerive.findAll({
    where: {
      ordre: 0
    }
  });
}

const initCompetence = async (userId) => {
  const listCompetenceBase = await getBasicCompetence();
  // console.log("list comp", listCompetenceBase.length)
  let result = [];
  for (let index = 0; index < listCompetenceBase.length; index++) {
    let todo = await addCompetenceUser(userId, listCompetenceBase[index].id);
    result = [
      ...result,
      todo
    ];
  }
  // console.log("result", result.length);
  return result;
}

const addXpUser = async (userId, xp, xp_plus, date_insertion = new Date()) => {
  const newXp = await UserXp.create({
    userId: userId,
    xp: xp,
    xpPlus: xp_plus,
    date_insertion: date_insertion
  });
  return newXp;
}

const initXpUser = async (userId) => {
  return await addXpUser(userId, 5, 5, new Date())
}


module.exports = {
    getUserSkillAndPrepare,
    getSkillDerived,
    getSkillRoutes,
    getUserSkill,
    getUserSkillsByRoute,
    addCompetenceUser,
    removeCompetenceUser,
    getBasicCompetence,
    initCompetence,
    addXpUser,
    initXpUser
}

