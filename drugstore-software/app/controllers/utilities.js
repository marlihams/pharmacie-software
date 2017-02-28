
/* utilities function */

var devVariable=require("../config/config.js");

exports.convertArrayToJson=function(keys,jsonArray){

	var jsonObject={};
	if (keys.lengh !=sonArray.lengh){
		console.log("error dans la fonction convertArrayToJson");
	}
	keys.forEach(function(key,index){
		jsonObject.key=jsonArray[index];

	});
	return jsonObject;
};

/**
	@function getCurrentWeekInterval
	 determine the begin and the end of the current week



*/
exports.getCurrentWeekInterval=function(){

	
	var weekObject={};
	var beginWeek;
	var endWeek;
	if (devVariable && devVariable.beginWeek && devVariable.beginWeek.length!=0){
		var beginWeek= new Date(devVariable.beginWeek);
		var endWeek=new Date(devVariable.beginWeek);
		endWeek.setDate(beginWeek.getDate()+6);
		 
		weekObject={
			"beginWeek":beginWeek,
			"endWeek":endWeek
		}

	}
	else{

	
		beginWeek=getDateCorrectedFormat();
		endWeek=getDateCorrectedFormat();
		beginWeek.setDate(beginWeek.getDate()-7);

		weekObject={
			"beginWeek":beginWeek,
			"endWeek":endWeek
		}
	}
	return weekObject;
};
exports.getDateFromMonth=function(){


 if (devVariable && devVariable.beginWeek){

 	return  new Date(devVariable.beginWeek);
 }
 else{

 	return new Date();

 }

};


function getDateCorrectedFormat(date){
	
	var d= date ? date:(new Date());
	var dateFormat=""+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
	console.log(dateFormat);

	return new Date(dateFormat);
}

exports.getDateCorrectedFormat=getDateCorrectedFormat;

exports.getCurrentDate=function(){


 if (devVariable && devVariable.currentDate){

 	return  new Date(devVariable.currentDate);
 }
 else{

 	return getDateCorrectedFormat();

 }

};
