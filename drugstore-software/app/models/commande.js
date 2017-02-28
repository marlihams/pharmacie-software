
//Commande: details(Produit,quantité), clientType (recommandeur ou abonner),client, récompense,payer,date,

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    var ProduitSchema=require("./produit");

var CommandeSchema = new Schema({
    title:String,
    client: {type:mongoose.Schema.Types.ObjectId,default:null},
    clientType:{type:String,enum:['recommandeur','abonner','autre'],default:'autre'},
    payer: Boolean,
    montantPayer:Number,
    chiffreAffaire:{type:Number,default:0},
    totalProduits:{type:Number,default:0},
    benefice:{type:Number,default:0},
    recompense: Boolean,
    date: {type:Date, default:Date.now},
    dailySaleId:{type:mongoose.Schema.Types.ObjectId,default:null},
    produits:[
    {
    	produit:ProduitSchema,
    	quantite:{type:Number,required:true}
    }]
});


/**
*  calculate the turnover for a commande
* @function calculateChiffreAffaire 
* @params {Request} command
* @return {Number}  
*/

CommandeSchema.methods.calculChiffreAffaire=function(){
    var produits=this.produits;
    var total=0;
    console.log(produits);

    return produits.reduce((accum,produit,index)=>{
    /*    console.log("produit "+ produit);
        console.log("accumm"+ accum);*/
         total=produit.produit.prixVente * produits[index].quantite;
            console.log(total);
            return  accum==0? total: (accum+total);

     },0);

};

/**
* calculate the benefit of a commande
* @function calculBenefice 
* @params {Request} command
* @return {Number}  
*/

CommandeSchema.methods.calculBenefice=function(){
    var produits=this.produits;
    var total=0;
     return produits.reduce((accum,produit,index)=>{
         total=(produit.produit.prixVente-produit.produit.prixAchat) * produits[index].quantite;
            
            return  accum==0? total:(accum+total);

     },0);

};

CommandeSchema.methods.getTotalProduit=function(){
    var produits=this.produits;

     return produits.reduce((accum,produit)=>{
            
            return   accum +produit.quantite;

     },0);

};



mongoose.model('Commande', CommandeSchema,"commandes");
