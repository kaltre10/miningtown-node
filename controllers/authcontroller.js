const express = require('express');
const User = require('../models/Users');

exports.Auth = async (req, res) => {

    const { wallet } = req.body;
    console.log("Wallet: "+wallet)
    try {
        const user = await User.findOne({ wallet });
        if(!user) {
            const newUser = await new User({ wallet, status: 1 });
            await newUser.save();
            console.log("Guardado correctamente")
            return res.json(newUser);
        }
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}