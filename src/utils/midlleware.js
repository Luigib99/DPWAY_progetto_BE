const User = require('../model/User');
const Role = require('../model/Role');

class Middleware {
    static instance = null;

    constructor() {
        if (Middleware.instance) {
            return Middleware.instance;
        }
        Middleware.instance = this;
    }

    async verifyAdmin(req, res, next) {
        try {
            const executorId = req.params.executorId;

            if (!executorId) {
                return res.status(400).json({ message: 'ID utente (executorId) mancante' });
            }

            const user = await User.findByPk(executorId, {
                include: Role
            });

            if (!user) {
                return res.status(404).json({ message: 'Utente non trovato' });
            }

            const isAdmin = user.Roles.some(role => role.name === 'Admin');

            if (!isAdmin) {
                return res.status(403).json({ message: 'Accesso negato: solo gli admin possono eseguire questa azione' });
            }

            next();
        } catch (error) {
            console.error('Errore nel middleware di verifica admin:', error);
            res.status(500).json({ message: 'Errore interno del server', error: error.message });
        }
    }
}

module.exports = new Middleware();
