const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const eventRoutes = require('./src/routes/events');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Update '*' to a specific origin if needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
