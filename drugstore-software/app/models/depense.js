
//Dépense: nom, prix, commentaire,date,image

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepenseSchema = new Schema({
    title: {type:String,required:true},
    commentaire: String,
    date: Date,
    prix: Number,
    type:{type:String, enum:['autre','actionnaire','entreprise'],default:"generique"},
    validateActionnaire:{type:Boolean,default:false},
    validateEntreprise:{type:Boolean,default:false},
    userId: {type:mongoose.Schema.Types.ObjectId,default:null},
});

mongoose.model('Depense', DepenseSchema,"depenses");

/* type ==true  depense =globale 
	type ==false depense=bon actionnaire ou entreprise
	
	userId identifiant de l'utilisateur qui a modifie la dépense

*/