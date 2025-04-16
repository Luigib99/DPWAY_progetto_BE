const Blacklist = require('../model/Blacklist');
const User = require('../model/User'); // assicurati che il model User sia importato correttamente

class BlacklistRepository {
    static instance = null;

    constructor() {
        if (BlacklistRepository.instance) {
            return BlacklistRepository.instance;
        }
        BlacklistRepository.instance = this;
    }

    // INSERISCI IN BLACKLIST
    async insert(transaction, userId) {
        const alreadyInBlacklist = await Blacklist.findOne({
            where: { userId },
            transaction
        });

        if (alreadyInBlacklist) {
            throw new Error('Utente già presente nella blacklist');
        }

        const blacklistEntry = await Blacklist.create({
            userId
        }, { transaction });

        const [rowsUpdated] = await User.update(
            { active: false },
            {
                where: { id: userId },
                transaction
            }
        );
        if (rowsUpdated === 0) {
            throw new Error('Utente non trovato o già disattivato');
        }

        return blacklistEntry;
    }

    // RIMUOVI DALLA BLACKLIST
    async remove(userId) {
        const blacklisted = await Blacklist.findOne({ where: { userId } });
        if (!blacklisted) {
            throw new Error('Utente non presente in blacklist');
        }

        await Blacklist.destroy({ where: { userId } });
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Utente non trovato');
        }

        user.active = true;
        await user.save();

        return user;
    }
}

module.exports = new BlacklistRepository();
