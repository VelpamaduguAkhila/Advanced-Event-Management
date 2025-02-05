const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'Surya@2118', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => console.log('Connected...')).catch(err => console.error(err));

async function getEventlist(){
    try {
        const [response] = await sequelize.query(`select e.title, e.description, e.event_date, e.category, l.city, l.state from sys.events e inner join sys.locations l on e.location_id = l.id where e.event_date = '2025-02-01' and e.category = "WorkShop" and l.city = 'San Francisco'`, {type: sequelize.QueryTypes.SELECT});
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}

setTimeout(() => {
    getEventlist()
},3000);

module.exports = getEventlist
