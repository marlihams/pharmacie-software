//rUtilisateur: prenom,nom, profil
//Profil={pharmacien, admin,super admin}

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UtilisateurSchema = new Schema({

    nom: {type:String, index:true},
    prenom: String,
    telephone: {type:String, required:true},
    dateNaissance:Date,
    profil:{type:String, enum:['pharmacien','admin','superAdmin']},
});

mongoose.model('Utilisateur', UtilisateurSchema);




