const express = require('express');
const router = express.Router();

const getSkillRoutes = () => {
  return [
    {
      id : 1,
      title: "fire"
    },
    {
      id : 2,
      title: "water"
    },
    {
      id : 3,
      title: "wind"
    },
    {
      id : 4,
      title: "earth"
    }
  ]
}

const getSkillDerived = () => {
  return [
    {
      id : 1,
      title: "fire",
      description: "The based element of fire",
      type: "ATTACK",
      icon: "fire.icon",
      route: "fire",
      order: 0
    },
    {
      id : 2,
      title: "thunder",
      description: "The fire attack is accompanied by striking power",
      type: "ATTACK",
      icon: "fire.icon",
      route: "fire",
      order: 50
    },
    {
      id : 3,
      title: "flash",
      description: "This element can kill a person without defense but require some energy",
      type: "ATTACK",
      icon: "fire.icon",
      route: "fire",
      order: 100
    },
    {
      id : 5,
      title: "water",
      description: "The based element of water",
      type: "ATTACK",
      icon: "water.icon",
      route: "water",
      order: 0
    },
    {
      id : 6,
      title: "wind",
      description: "The based element of wind",
      type: "ATTACK",
      icon: "wind.icon",
      route: "wind",
      order: 0
    },
    {
      id : 7,
      title: "earth",
      description: "The based element of earth",
      type: "ATTACK",
      icon: "earth.icon",
      route: "earth",
      order: 0
    }
  ]
}

const getUserSkill = (userId, skillRouteId) => {
  return [
    {
      id : 1,
      id_utilisateur: 1,
      id_competence: 1
    }
  ]
}


const getUserSkillsByRoute = (userId, skillRouteId) => {
  const skills = getSkillDerived().filter(skill => skill.route === skillRouteId);
  const userSkills = getUserSkill(userId, skillRouteId).map(userSkill => userSkill.id_competence);

  return skills.map(skill => {
    return {
      ...skill,
      blocked: !userSkills.includes(skill.id)
    };
  });
};


const getUserSkillAndPrepare = (userId) => {
  let skillRoutes = getSkillRoutes()
  return skillRoutes.map(route => {
    return {
      route: route.title,
      skills: getUserSkillsByRoute(userId, route.title)
    };
  });

}


router.get('/user/:id/', (req, res) => {
  console.log(req.params.id)
  let userSkills = getUserSkillAndPrepare(req.params.id)
  res.json(userSkills)
});

module.exports = router;
