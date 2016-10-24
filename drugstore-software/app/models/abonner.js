
//Abonner: prénom, nom, téléphone, date de naissance, commandes, points

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AbonnerSchema = new Schema({

    nom: {type:String,index:true},
    prenom: String,
    telephone: {type:String, required:true},
    dateNaissance:Date,
    points:Number,
    commandes:[{type:mongoose.Schema.Types.ObjectId, ref:"Commande"}]
});

mongoose.model('Abonner', AbonnerSchema);




