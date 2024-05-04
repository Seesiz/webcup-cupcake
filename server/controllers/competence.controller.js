const { getUserSkillAndPrepare, getSkillRoutes } = require('../services/competence.services');

const getCompetenceRacine = async (req, res) => {
    const competenceRacine = await getSkillRoutes();
    res.json(competenceRacine);
}
const getCompetenceUser = async (req, res) => {
    console.log(req.params.id)
    let userSkills = await getUserSkillAndPrepare(req.params.id)
    res.json(userSkills)
}

module.exports = {
    getCompetenceUser,
    getCompetenceRacine
}