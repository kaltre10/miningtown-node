const express = require('express');
const User = require('../models/Users');

exports.Update = async (req, res) => {

    const { wallet, amount, hash } = req.body;

    try {
        const checkUser = await User.find({ wallet });

        if(Object.keys(checkUser).length === 0) 
            return res.status(404).json({msg: 'Usuario no existe'});
            
        const newData = {};
        if(wallet) newData.wallet = wallet;

        //add gm
        if(amount) newData.gm = amount;

        user = await User.findOneAndUpdate({wallet: wallet}, newData, {new: true});

        //return true
        res.json(true); 
        
    } catch (error) {

        //return error
        console.log(error);
        res.status(400).json(error.message);
    }
}