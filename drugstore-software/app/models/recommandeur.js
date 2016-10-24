//recommandeur:prénom, nom, téléphone, date de naissance,details,taux,commandes
//details={entreprise,docteur,particulier}


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RecommandeurSchema = new Schema({

    nom: {type:String,index:true},
    prenom: String,
    telephone: {type:String,required:true},
    dateNaissance:Date,
    taux:Number,
    details:{type:String,enum:['entreprise','docteur','particulier']},
    commandes:[{type:mongoose.Schema.Types.ObjectId, ref:"Commande"}]
});

mongoose.model('Recommandeur', RecommandeurSchema);




