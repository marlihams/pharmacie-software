/*db=connect("mongodb://localhost/drugstoreparis");

printjson("*********** removing all  data************");
db.produits.remove({});

printjson("start insertion");*/

 exports.produitData=[
{
	nom:"Paracétamol",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Ibuprofène",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"2F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Doliprane",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"1F",
		expirationDate:new Date('2022-08-06'),
		quantite:32
	}
	]

},{
	nom:"Dafalgan",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:130.000,
	details:[
	{
		emplacement:"1F",
		expirationDate:new Date('2022-08-06'),
		quantite:210
	}
	]

},{
	nom:"Levothyrox",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:90.000,
	prixVente:140.000,
	details:[
	{
		emplacement:"3G",
		expirationDate:new Date('2022-08-06'),
		quantite:510
	}
	]

},{
	nom:" Kardegic",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:170.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-07-06'),
		quantite:410
	}
	]

},{
	nom:"Spasfon",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:120.000,
	prixVente:200.000,
	details:[
	{
		emplacement:"6C",
		expirationDate:new Date('2022-03-06'),
		quantite:510
	}
	]

},{
	nom:" Methadone Aphp",
	description:" 7 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:520.000,
	details:[
	{
		emplacement:"3H",
		expirationDate:new Date('2022-12-22'),
		quantite:610
	}
	]

},{
	nom:"Paracetamol Biogaran",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:250.000,
	details:[
	{
		emplacement:"9F",
		expirationDate:new Date('2027-12-06'),
		quantite:30
	}
	]

},{
	nom:"Forlax",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:400.000,
	details:[
	{
		emplacement:"9F",
		expirationDate:new Date('2022-12-06'),
		quantite:10
	}
	]

},{
	nom:"Magne b6",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:10.000,
	prixVente:30.000,
	details:[
	{
		emplacement:"9i",
		expirationDate:new Date('2021-12-06'),
		quantite:223
	}
	]

},{
	nom:"Paracétamol",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:185.000,
	details:[
	{
		emplacement:"2y",
		expirationDate:new Date('2028-12-06'),
		quantite:25
	}
	]

},{
	nom:"Dextropropoxyphene Parac Sand",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:180.000,
	prixVente:240.000,
	details:[
	{
		emplacement:"4y",
		expirationDate:new Date('2022-12-06'),
		quantite:122
	}
	]

},{
	nom:"Biprofenid",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:110.000,
	details:[
	{
		emplacement:"5h",
		expirationDate:new Date('2022-12-06'),
		quantite:96
	}
	]

},{
	nom:"Piascledine",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:45.000,
	prixVente:60.000,
	details:[
	{
		emplacement:"7G",
		expirationDate:new Date('2022-12-06'),
		quantite:46
	},
	{
		emplacement:"cave",
		expirationDate:new Date('2022-12-06'),
		quantite:542
	}
	]

},{
	nom:"Rhino Sulforgan",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"23F",
		expirationDate:new Date('2022-12-06'),
		quantite:310
	}
	]

},{
	nom:"Gaviscon",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:105.000,
	details:[
	{
		emplacement:"3x",
		expirationDate:new Date('2022-12-06'),
		quantite:89
	}
	]

},{
	nom:"Hexaquine",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:30.000,
	prixVente:50.000,
	details:[
	{
		emplacement:"4x",
		expirationDate:new Date('2022-12-06'),
		quantite:126
	}
	]

},{
	nom:"Rhinofluimucil",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:112.000,
	details:[
	{
		emplacement:"5x",
		expirationDate:new Date('2023-12-06'),
		quantite:410
	}
	]

},{
	nom:"Smecta",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:250.000,
	prixVente:320.000,
	details:[
	{
		emplacement:"22F",
		expirationDate:new Date('2022-12-01'),
		quantite:80
	}
	]

},{
	nom:"Plavix",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"35T",
		expirationDate:new Date('2024-12-06'),
		quantite:110
	}
	]

},{
	nom:"Aprovel",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:50.000,
	prixVente:80.000,
	details:[
	{
		emplacement:"34a",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Aerius",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"35b",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Diprosone",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:105.000,
	details:[
	{
		emplacement:"32a",
		expirationDate:new Date('2022-12-06'),
		quantite:110
	}
	]

},{
	nom:"Amoxicilline Merck",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:10
	}
	]

},{
	nom:"Dextropropoxyphene Parac Merck",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:40.000,
	prixVente:80.000,
	details:[
	{
		emplacement:"31a",
		expirationDate:new Date('2022-12-06'),
		quantite:15
	}
	]

},{
	nom:"Paracetamol Teva",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:30.000,
	prixVente:50.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:120
	}
	]

},{
	nom:"Efferalgan Codeine",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"29a",
		expirationDate:new Date('2016-12-22'),
		quantite:25
	}
	]

},{
	nom:"Meteospasmyl",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"28a",
		expirationDate:new Date('2017-12-06'),
		quantite:210
	}
	]

},{
	nom:"Lysanxia",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"28a",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Dacryoserum",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:" Dexeryl",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Renutryl 500",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"25a",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Ketum",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"22a",
		expirationDate:new Date('2022-12-06'),
		quantite:100
	}
	]

},{
	nom:"Lovenox",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"20a",
		expirationDate:new Date('2022-12-06'),
		quantite:112
	}
	]

},{
	nom:"Emlapatch",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:115
	}
	]

},{
	nom:"Stablon",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:80
	}
	]

},{
	nom:" Endotelon",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2017-01-15'),
		quantite:210
	}
	]

},{
	nom:"Biocalyptol",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:" Effexor",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Thiovalone",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Ventoline",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:" Pyostacine",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Dialgirex",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Tiorfan",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Solupred",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Speciafoldine",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Dextropropoxyphene Parac Biog",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Rivotril",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

},{
	nom:"Inipomp",
	description:" 3 comprimet par jour pendant 12 jours. deconseiller pour les femmes enceinte",
	prixAchat:80.000,
	prixVente:100.000,
	details:[
	{
		emplacement:"3F",
		expirationDate:new Date('2022-12-06'),
		quantite:210
	}
	]

}
];


/*odule.exports
printjson(insertion);





 printjson("**************print data********************");
 data=db.produit.find({});
 data.forEach(printjson);
 printjson("total data inserted:"+ data.count());
*/