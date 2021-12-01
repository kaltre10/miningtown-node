const express = require('express');
const { Schema, Mongoose } = require('mongoose');
const User = require('../models/Users');

exports.unlockPlanet = async (req, res) => {
    const { wallet, planet, amount } = req.body
    const user = await User.find({ wallet })
    const gmOld = user[0].gm
    const gm = gmOld - amount

    if (gmOld < amount)
        res.json({ "msg": "Invalid: insuficient gm balance" })

    await User.findOneAndUpdate({ wallet }, { gm })

    if (planet == 0 && amount==600)
        await User.findOneAndUpdate({ wallet }, { planets: [1, 0, 0, 0, 0, 0] })

    if (planet == 1 && amount ==1000)
        await User.findOneAndUpdate({ wallet }, { planets: [1, 1, 0, 0, 0, 0] })

    if (planet == 2 && amount >2900)
        await User.findOneAndUpdate({ wallet }, { planets: [1, 1, 1, 0, 0, 0] })

    if (planet == 3)
        await User.findOneAndUpdate({ wallet }, { planets: [1, 1, 1, 1, 0, 0] })

    if (planet == 4)
        await User.findOneAndUpdate({ wallet }, { planets: [1, 1, 1, 1, 1, 0] })

    if (planet == 5)
        await User.findOneAndUpdate({ wallet }, { planets: [1, 1, 1, 1, 1, 1] })

    res.json(planet)
}

exports.mine = async (req, res) => {
    const { wallet, mp, material } = req.body
    try {
        const user = await User.find({ wallet });
        if (Object.keys(user).length === 0)
            return res.status(404).json({ msg: 'Usuario no existe' });
        var iron = await user[0].materials.iron
        var silver = await user[0].materials.silver
        var gold = await user[0].materials.gold
        var diamond = await user[0].materials.diamond
        var ice = await user[0].materials.ice
        var petroleum = await user[0].materials.petroleum
        var gm = await user[0].gm
        var newGm

        

        if (material == "iron") {
            const min = mp
            const max = min * 2
            const mine = Math.round(Math.random() * (max - min) + min);
            iron = iron + mine
            newGm = gm-20
        }

        if (material == "silver") {
            const min1 = mp - 1
            const max1 = min1 * 2
            const mine1 = Math.round(Math.random() * (max1 - min1) + min1);
            silver = silver + mine1
            newGm = gm-40
        }

        if (material == "gold") {
            const min2 = mp 
            const max2 = min2 * 2
            const mine2 = Math.round(Math.random() * (max2 - min2) + min2);
            gold = gold + mine2
            newGm = gm-90
        }
     
        await User.findOneAndUpdate({ wallet }, {
            $set: { "gm": newGm }
        })

        const mas1 = 10
        await User.findOneAndUpdate({ wallet }, {
            $set: { "xp": {
                minery:mas1
            } }
        })

        await User.findOneAndUpdate({ wallet: wallet }, {
            "materials": {
                iron,
                silver,
                gold,
                diamond,
                petroleum,
                ice
            }
        })
        console.log(await user[0].materials)

        res.json(iron)
    } catch (error) {
        console.log(error)
        res.end("error")
    }


}