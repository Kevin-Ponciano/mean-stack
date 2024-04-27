const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const router = new express.Router();

// Cadastro de usuário
router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = jwt.sign({_id: user._id.toString()}, 'rosaleneomelhor');
        res.status(201).send({user, token});
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user || req.body.password !== user.password) {
            throw new Error('Unable to login');
        }
        const token = jwt.sign({_id: user._id.toString()}, 'rosaleneomelhor');
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/test', auth, async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
