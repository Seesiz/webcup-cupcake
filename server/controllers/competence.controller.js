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

// créons une fonction qui va débloquer une compétence d'un utilisateur
// On va prendre en POST l'id de l'utilisateur et l'id du compétence à débloquer
const debloquerCompetence = async (request, response) => {
    try {
        const { idUtilisateur, idCompetence } = request.body;
        const result = await addCompetenceUser(idUtilisateur, idCompetence);
        return response.status(200).json(result);
    } catch (error) {
        console.error('Erreur lors de l\'activation de compétence :', error);
        return response.status(500).send({ message: 'Erreur lors de l\'activation du compétence' });
    }
}

module.exports = {
    getCompetenceUser,
    getCompetenceRacine,
    debloquerCompetence
}