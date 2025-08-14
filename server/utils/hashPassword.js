const bcrypt = require('bcrypt')

async function hashPassword(passwordString) {
    return await bcrypt.hash(passwordString, 10);
}

module.exports = {hashPassword}