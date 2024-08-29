const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    heroBg:{type:String},
    title:{type:String},
    Category:[{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    scores:{
        difficult:{type:Number},
        skill:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        _id:{type:mongoose.Schema.Types.ObjectId,auto:true},
        icon:{type:String},
        name:{type:String},
        discription:{type:String},
        tips:{type:String},
        cooldownTime:{type:String},
        consumption:{type:String}
    }],
    mainSkillUpgrade:{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    secondarySkillUpgrade:{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    summonerSpells:[{type: mongoose.SchemaTypes.ObjectId,ref:'Summonerspell'}],
    aheadEquipments:[{
        type : mongoose.SchemaTypes.ObjectId,ref:'Equipment'
    }],
    BehindEquipemnt:[{
        type : mongoose.SchemaTypes.ObjectId,ref:'Equipment'
    }],
    recommendedRunes:[{
        type : mongoose.SchemaTypes.ObjectId,ref:'Rune'
    }],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    theBestPartners:[{
        hero:{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        discription:{type:String},
        // relationship:{type:String}
    }],
    counteredByWhom:[{
        hero:{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        discription:{type:String},
    }],
    countered:[{
        hero:{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        discription:{type:String},

    }]

})
module.exports = mongoose.model('Hero',schema,'heroes')