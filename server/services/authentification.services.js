const SecuritePortails = require("../models/SecuritePortails.model");
const User = require("../models/User.model");
const UserDetails = require("../models/UserDetails.model");

/**
 * 
 * @param {String} login le login de l'utilisateur 
 * @param {String} password le mot de passe de l'utilisateur 
 * @returns l'objet de l'utilisateur ou null en cas d'erreur ou l'user est introuvable
 */
const authUsers = async (login, password) => {
    try {
        const user = await UserDetails.findOne({
            where: {
                login: login,
                password: password
            }
        });

        return user; // Retourne l'utilisateur trouvé ou null s'il n'existe pas
    } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);
        return null; // En cas d'erreur, renvoie null
    }
}

const authSecurite = async (login, password, portails) => {
    try {
        const user = await SecuritePortails.findOne({
            where: {
                login: login,
                password: password,
                portails
            }
        });

        return user; // Retourne l'utilisateur trouvé ou null s'il n'existe pas
    } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);
        return null; // En cas d'erreur, renvoie null
    }
}

module.exports = {
    authUsers,
    authSecurite
}