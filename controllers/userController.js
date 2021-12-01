const express = require('express');
const { Schema, Mongoose } = require('mongoose');
const User = require('../models/Users');

exports.buyGm = async (req, res) => {

    const { wallet, amount, hash } = req.body;
    console.log("wallet: " + wallet + " - monto: " + amount + " - hash: " + hash)
    try {
        const checkUser = await User.find({ wallet });

        if (Object.keys(checkUser).length === 0)
            return res.status(404).json({ msg: 'Usuario no existe' });

        const newData = { wallet, amount };
        if (wallet) newData.wallet = wallet;

        //add gm 
        var _user = await User.find({ wallet });
        if (amount) newData.gm = amount + _user[0].gm

        const user = await User.findOneAndUpdate({ wallet: wallet }, newData, { new: true });
        console.log("Tiene GM: " + user.gm)
        //return true
        res.json(true);

    } catch (error) {

        //return error
        console.log(error);
        res.status(400).json(error.message);
    }
}

exports.buyShip = async (req, res) => {
    const { wallet, hash } = req.body;

    const walletLength = wallet.length
    const last4wallet = wallet.substring(walletLength-4, walletLength)
    const numId = Math.round(Math.random() * (1000 - 9999) + 1000);
    const id = last4wallet+numId

    console.log("nueva nave: "+id)
    //const user = await User.find({ wallet });

    await User.findOneAndUpdate({ wallet: wallet }, {
        $addToSet: {
            "ships": [
                {
                    "name": "Cat-miner",
                    "id": 1,
                    "type": "ship",
                    "subtype": "minership",
                    hash,
                    wallet,
                    id
                }
            ]
        }
    }
    )

    res.json(hash)
    /* 
        if (Object.keys(checkUser).length === 0)
            return res.status(404).json({ msg: 'Usuario no existe' });
    
            const newData = User
             */
    //const user = await User.findOneAndUpdate({ wallet: wallet }, newData, { new: true });
    //console.log("Tiene GM: " + user.gm)
    //return true
    //res.json(newData);
}

exports.getData = async (req, res) => {
    const wallet = req.params.wallet;
    //console.log("Wallet-node: " + wallet)
    try {
        const user = await User.find({ wallet });
        console.log(user)
        if (Object.keys(user).length === 0)
            return res.status(404).json({ msg: 'Usuario no existe' });
        res.json(user)
    } catch (error) {
        console.log(error)
    }
    res.end()
}



