 //  Daily sales: commandes, date, etat,bénéfice,CA
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var DailySaleSchema = new Schema({
    title:String,
    chiffreAffaire: Number,
    etat: Boolean,
    benefice: Number,
    totalProduits:{type:Number,default:0}, 
    date: {type:Date,default:Date.now,index:true},
    commandes:[
    {
    	type:mongoose.Schema.Types.ObjectId,
    	ref:"Commande"
    }]
});



DailySaleSchema.pre('save',function(next){
    if (!this.date){
         this.date=new Date();
        }
        this.date.setHours(0,0,0);
     next();
});

DailySaleSchema.methods.getTotalProduit=function(callback){

    var total=0;
    console.log("function getTotalProduit");
    return this.populate("commandes",function(err,commandes){
        commandes.forEach(function(commande){
            total+=commande.produits.length;
        });
        if (callback)
         callback(total);
    });
};


DailySaleSchema.statics.bestMonthDailySale=function(date,callback){
   
 var beginDayOfMonth=new Date(date.getFullYear(),date.getMonth(),1);
 var lastDayOfMonth=new Date(date.getFullYear(),date.getMonth()+1,0);
  var bestDailySale=null;
  /*console.log("month vaut : "+ beginDayOfMonth +"year : "+lastDayOfMonth);*/
  this.find({date:{'$gte':beginDayOfMonth,"$lte":lastDayOfMonth}})
    .exec(function(err,dailySales){
        if (err){
            console.log("error on static function bestMonthDailySale");
            console.log(err);
        }
       /* console.log(dailySales);*/
        bestDailySale=dailySales[0];
        dailySales.forEach(function(dailySale){

            if(dailySale.chiffreAffaire > bestDailySale.chiffreAffaire) {
                bestDailySale= dailySale;
            }

        });
        if (callback)
            callback(bestDailySale);
    });
    
};

DailySaleSchema.statics.worstMonthDailySale=function(date,callback){
 var beginDayOfMonth=new Date(date.getFullYear(),date.getMonth(),1);
 var lastDayOfMonth=new Date(date.getFullYear(),date.getMonth()+1,0);
  var bestDailySale=null;
 /* console.log("month vaut : "+ beginDayOfMonth +"year : "+lastDayOfMonth);*/
  this.find({date:{'$gte':beginDayOfMonth,"$lte":lastDayOfMonth}})
    .exec(function(err,dailySales){
        if (err){
            console.log("error on static function bestMonthDailySale");
            console.log(err);
        }
     /*   console.log(dailySales);*/
        bestDailySale=dailySales[0];
        dailySales.forEach(function(dailySale){

            if(dailySale.chiffreAffaire < bestDailySale.chiffreAffaire) {
                bestDailySale= dailySale;
            }

        });
        if (callback)
            callback(bestDailySale);
    });
};

DailySaleSchema.statics.findDailySaleByDate=function(date,callback){

  this.findOne({date:date}).populate("commandes").exec(function(err,dailySale){

    if (err){
        console.log("error on static findDailySaleByDate");
        console.log(err);
        return null;
    }

    if(callback)
        callback(dailySale);
  });
  
};

mongoose.model('DailySale', DailySaleSchema,'dailySales');




