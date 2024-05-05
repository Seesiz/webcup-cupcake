// Description: Services pour l'authentification des utilisateurs
const User = require("../models/User.model");

/**
 *
 * @param {String} login le login de l'utilisateur
 * @param {String} password le mot de passe de l'utilisateur
 * @returns l'objet de l'utilisateur ou null en cas d'erreur ou l'user est introuvable
 */
const authUsers = async (login, password) => {
    try {
        const user = await User.findOne({
            where: {
                email: login,
                motdepasse: password
            }
        });
        if (user) {
            user.motdepasse = '';
        }

        return user; // Retourne l'utilisateur trouvé ou null s'il n'existe pas
    } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);
        return null; // En cas d'erreur, renvoie null
    }
}

// Création de fonction pour l'inscription des utilisateurs
// Prendra en parametre le nom, prenom et email de l'utilisateur et son nouveau mot de passe
const registerUser = async (nom, prenom, email, password) => {
    try {
        const user = await User.create({
            nom: nom,
            prenom: prenom,
            email: email,
            motdepasse: password
        });

        return user; // Retourne l'utilisateur créé
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        return null; // En cas d'erreur, renvoie null
    }
}

module.exports = {
    authUsers,
    registerUser
}
