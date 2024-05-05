const authentificationService = require("../services/authentification.services");
const authentifierUser = async (request, response) => {
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
}

// Création de fonction pour l'inscription des utilisateurs (methode Post)
// Prendra en parametre le nom, prenom et email de l'utilisateur et son nouveau mot de passe
const registerUser = async (request, response) => {
    const { nom, prenom, email, password } = request.body;

    const utilisateur = await authentificationService.registerUser(nom, prenom || "", email, password);

    // On check si l'utilisateur a été créé dans notre base de donnée
    if (utilisateur) {
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
}

module.exports = {
    authentifierUser,
    registerUser
}
