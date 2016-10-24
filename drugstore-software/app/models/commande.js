
//Commande: details(Produit,quantité), clientType (recommandeur ou abonner),client, récompense,payer,date,

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    var ProduitSchema=require("./produit");

var CommandeSchema = new Schema({
    client: mongoose.Schema.Types.ObjectId,
    clientType:{type:String,enum:['recommandeur','abonner']},
    payer: Boolean,
    recompense: Boolean,
    date: {type:Date, default:Date.now},
    details:[
    {
    	produit:[ProduitSchema],
    	quantite:Number
    }]
});

mongoose.model('Commande', CommandeSchema);