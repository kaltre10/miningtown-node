const mongoose = require('mongoose');
/* 
const itemsSchema = new mongoose.Schema({});
const xpSchema = new mongoose.Schema({}); */

const UsersShema = mongoose.Schema({
    wallet: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ships:{
        type:Array,
        default:[]
    },
    items: {
        type: Array,
        default: []
    },
    materials: {
        type: Object,
        default: {
            iron:0,
            silver:0,
            gold:0,
            ice:0,
            petroleum:0,
            diamond:0
        }
    },
    planets:{
        type:Array,
        default:[0,0,0,0,0,0]
    },
    gm: {
        type: Number,
        default: 0
    },
    xp: {
        type: Object,
        default: {
            minery:0,
            figther:0,
            factory:0,
            refinery:0
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    registration: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', UsersShema);