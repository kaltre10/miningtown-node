const express = require('express');
const User = require('../models/Users');

exports.Update = async (req, res) => {

    const { wallet, amount, hash } = req.body;
    console.log("wallet: "+wallet+" - monto: "+amount+" - hash: "+hash)
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

exports.getData = async (req,res)=>{
    const wallet = req.params.wallet;
    console.log("Wallet-node: "+wallet)
    try {
        const getUser = await User.find({wallet});
        console.log(getUser)
        if(Object.keys(getUser).length === 0) 
            return res.status(404).json({msg: 'Usuario no existe'});
        res.json(getUser)
    } catch (error) {
        console.log(error)
    }
    return res.json(wallet)
}