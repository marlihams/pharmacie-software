module.exports=function(){

	return {
		'M1':"Erreur Interne. Impossible d'acceder à la page souhaitée. ",
		'M2':"Contactez votre administrateur",
		"M3":"Echec creation de produit. ",
		"M4": "veuillez réessayer ulterieurement",
		"M5":"le produit ",
		"M6":" a bien été creer",
		"M7":"!!!SUCCESS", 
		"M8":"mise à jour du produit réussi ",
		"M9":"Echec mis à jour du produit. ",
		"M10":"Echec suppression du produit. ",
		"M11":"Aucun fichier à télécharger",
		"M12":"Impossible de lire le fichier. ",
		"M13":"Fichier Corrompu ",
		"M14":"!!!Echec", 
		"M15":"les produits ont bien été rajoutés. ",
		"M16":"Erreur Interne",
		"M16":" a bien été supprimé.",
		"M17":"Une erreur interne s'est produite lors du filtre",


	};

//err_code:0 redirect to error page
//err_code:1 display error on the page


};
/*
 res.json({err_code:1,status:false,message:MESSAGE.M3+MESSAGE.M4,error:err});
*/