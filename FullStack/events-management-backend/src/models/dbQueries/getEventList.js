const sequelize = require("../../config/database")

async function getEventlist(date,category,location){
    try {
        const response = await sequelize.query(`select e.title, e.description, e.event_date, e.category, l.city, l.state from sys.events e inner join sys.locations l on e.location_id = l.id where e.event_date = ${date} and e.category = ${category} and l.city = ${location}`, {type: sequelize.QueryTypes.SELECT});
        if (response.length > 0) {
            return response;
        }else{
            return "No Event Found"
        }
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}
    
module.exports = getEventlist