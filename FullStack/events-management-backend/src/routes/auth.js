const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await User.findOne({ where: { name: username } });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({name: username, email: email, password_hash: hashedPassword});
            res.status(201).json({ user });
        }
    } catch (error) {
        console.log(error.message);   
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { name: username } });
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'Thisisasecretkey');
        res.json({ token });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
