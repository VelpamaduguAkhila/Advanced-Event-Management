const sequelize = require("../../config/database");

async function getRegistrations(){
    try {
        const response = sequelize.query(`select * from sys.event_registrations er inner join sys.users u on er.user_id = u.id`, {type: sequelize.QueryTypes.SELECT})
        return response;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = getRegistrations;