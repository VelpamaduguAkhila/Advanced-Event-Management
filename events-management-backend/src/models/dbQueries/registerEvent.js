const sequelize = require("../../config/database");
const registrations = require("../registrations");
const User = require("../user");

async function addEvent(id, email){
    const transaction = await sequelize.transaction();
    try {
        const getUserId = await User.findOne({where: {email: email}});
        console.log(getUserId);
        await registrations.create({
            user_id : getUserId.id,
            event_id : id,
            registration_date: new Date(),
            status: "registered"
        }, {transaction});
        await transaction.commit();
        console.log("Updated an event")
    } catch (error) {
        await transaction.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = addEvent;