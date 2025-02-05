const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const getEventlist = require("../models/dbQueries/getEventList");
const addEvent = require('../models/dbQueries/addEvent');
const updateEvent = require('../models/dbQueries/updateEvent');
const deleteEvent = require('../models/dbQueries/deleteEvents');
const getRegistrations = require("../models/dbQueries/getRegistrations");
const registerEvent = require("../models/dbQueries/registerEvent");

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const { date, category, location } = req.query;
        const eventsList = await getEventlist(date, category, location)
        res.json(eventsList);
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, date, category, location } = req.body;
        const response = await addEvent(title, date, category, location);
        res.status(201).json({ response });
    } catch (error) {
        console.log(error.message)
    }
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, category, location } = req.body;
        const response = await updateEvent(id, title, date, category, location);
        res.json({ response });
    } catch (error) {
        console.log(error.message)
    }
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteEvent(id);
        res.status(204).send(response);
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/:id/register', verifyToken, async (req, res) => {
    // Implement registration logic
    try {
        const { id } = req.params;
        const {email} = req.body;
        const response = await registerEvent(id,email);
        res.status(201).send(response);
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/registrations', verifyToken, async (req, res) => {
    // Implement fetching registrations logic
    try {
        const response = await getRegistrations();
        res.json({ response });
    } catch (error) {
        console.log(error.message)
    }});

module.exports = router;
