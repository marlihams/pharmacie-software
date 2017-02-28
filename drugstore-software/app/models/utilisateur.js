//rUtilisateur: prenom,nom, profil
//Profil={pharmacien, admin,super admin}

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto=require('crypto'),
    jwt=require("jsonwebtoken");


var UtilisateurSchema = new Schema({

    name: String,
    username:{type:String, index:true,lowercase:true,unique:true},
    prenom: String,
    // telephone: {type:String, required:true},
    telephone:String,
    dateNaissance:Date,
    profil:{type:String, enum:['pharmacien','admin','superAdmin'], required:true},
    salt:String,
    hash:String
});




UtilisateurSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/* method allowing to test the validation of a password */
UtilisateurSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};


/* methode de generation de token qui sera stocké chez l'utilisateur */
UtilisateurSchema.methods.generateJWT = function() {

  // set expiration to 1 days
  var today = new Date();
  var exp = new Date();
  exp.setDate(today.getDate() +1);
  console.log("expiration date on server "+ exp);
  console.log("milliseconde " +exp.getTime()); 

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: exp.getTime(),
  },process.env.secretName);
};

mongoose.model('Utilisateur', UtilisateurSchema);




