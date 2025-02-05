const sequelize = require("../../config/database");
const Event = require("../Event");
const locations = require("../locations");

async function addEvent(title, date, category, location){
    const transaction = await sequelize.transaction();
    try {
        await locations.create({
            id : 3,
            name: location,
            address : location,
            city: location,
            state: location,
            country : "India"
        }, {transaction});
        
        await Event.create({
            title: title,
            event_date: date,
            category: category,
            description: "This is the new event",
            location_id : 3,
            created_by: 1
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