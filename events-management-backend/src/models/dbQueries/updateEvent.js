const sequelize = require("../../config/database");
const Event = require("../Event");

async function updateEvent(id, title, date, category, location){
    const transaction = await sequelize.transaction();
    try {
        await Event.update({
            title: title,
            event_date: date,
            category: category,
            description: "Updated event",
            created_by: 1
        }, {where: {id : id}, transaction});
        await transaction.commit();
        console.log("Updated an event")
    } catch (error) {
        await transaction.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = updateEvent;