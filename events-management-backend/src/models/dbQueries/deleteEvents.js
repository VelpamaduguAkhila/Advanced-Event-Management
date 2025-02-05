const sequelize = require("../../config/database");
const Event = require("../Event");

async function deleteEvent(id){
    const transaction = await sequelize.transaction();
    try {
        await Event.destroy({
            where: {id: id},
            transaction
        });
        await transaction.commit();
        console.log("Deleted an event")
    } catch (error) {
        await transaction.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = deleteEvent;