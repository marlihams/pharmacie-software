 //  Daily sales: commandes, date, etat,bénéfice,CA
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var DailySaleSchema = new Schema({
    title:String,
    chiffreAffaire: Number,
    etat: Boolean,
    benefice: Number,
    date: {type:Date,default:Date.now},
    commandes:[
    {
    	type:mongoose.Schema.Types.ObjectId,
    	ref:"Commande"
    }]
});

mongoose.model('DailySale', DailySaleSchema);




