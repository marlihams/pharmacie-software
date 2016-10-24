
//Produit:nom,prixVente,prixAchat,,details,description,image
//details: emplacement , expirationDate, quantité

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProduitSchema = new Schema({
    nom: {type:String, index:true,required:true, lowercase:true},
    description: String,
    prixAchat: Number,
    prixVente: Number,
    image: Buffer,
    details:[
    {
    	emplacement:String,
    	expirationDate:Date,
    	quantite:Number

    }]
});

mongoose.model('Produit', ProduitSchema);
