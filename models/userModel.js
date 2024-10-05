const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    const usersData = fs.readFileSync(usersFile);
    return JSON.parse(usersData);
}

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

module.exports = {
    getUsers,
    saveUsers
};