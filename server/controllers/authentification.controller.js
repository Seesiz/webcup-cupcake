const authentificationService = require("../services/authentification.services");
const {initXpUser, initCompetence} = require("../services/competence.services");
const authentifierUser = async (request, response) => {
    try {
      const { login, password } = request.body;

      const utilisateur = await authentificationService.authUsers(login, password);

      // On check si l'utilisateur a été trouvée dans notre base de donnée
      if (utilisateur) {
        const reponse = {
          status: 'Success',
          code: 200,
          message: 'Utilisateur authentifié avec succès.',
          data: utilisateur
        };

        return response.status(200).send(reponse);

      } else {
        const reponse = {
          status: 'Failed',
          code: 401,
          message: 'Utilisateur introuvable ou login et/ou mot de passe incorrecte.',
        };

        return response.status(401).send(reponse);
      }
    } catch (e) {
      const reponse = {
        status: 'Failed',
        code: 500,
        message: ` Error ${e.message}`,
      };

      return response.status(500).send(reponse);
    }
}

// Création de fonction pour l'inscription des utilisateurs (methode Post)
// Prendra en parametre le nom, prenom et email de l'utilisateur et son nouveau mot de passe
const registerUser = async (request, response) => {
    try {
      const { nom, prenom, email, password } = request.body;

      const utilisateur = await authentificationService.registerUser(nom, prenom || "", email, password);

      // On check si l'utilisateur a été créé dans notre base de donnée
      if (utilisateur) {
        const competence = await initCompetence(utilisateur.id);
        const userXP = await initXpUser(utilisateur.id);
        utilisateur.motdepasse = '';
        const reponse = {
          status: 'Success',
          code: 200,
          message: 'Utilisateur créé avec succès.',
          data: utilisateur
        };

        return response.status(200).send(reponse);

      } else {
        const reponse = {
          status: 'Failed',
          code: 401,
          message: 'Erreur lors de la création de l\'utilisateur.',
        };

        return response.status(401).send(reponse);
      }
    } catch (e) {
      console.log("error register" , e);
      const reponse = {
        status: 'Failed',
        code: 500,
        message: ` Error ${e.message}`,
      };

      return response.status(500).send(reponse);
    }
}

module.exports = {
    authentifierUser,
    registerUser
}
