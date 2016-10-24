
//Dépense: nom, prix, commentaire,date,image

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepenseSchema = new Schema({
    nom: {type:String,required:true},
    commentaire: String,
    date: Date,
    prix: Number,
    image: Buffer
});

mongoose.model('Depense', DepenseSchema);