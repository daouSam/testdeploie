const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: async (pwd) => {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(pwd, salt)
    },
    comparePassword: async (pwd, exist_pwd) => await bcrypt.compare(pwd, exist_pwd)
}