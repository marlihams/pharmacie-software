angular.module("commandeList").
		component("commandeList",{
	templateUrl:"/component/commande-list/commande-list.template.html",
	controller: ['HomeService',function CommandeListController(HomeService){
		var ctrl=this;
		this.commandes=[
	    {
	      title:"2323456787898" ,
	      payer:true
	    },
	    {
	      title:"23234686787898" ,
	      payer:false
	    },
	    {
	      title:"2323234787898" ,
	      payer:true
	    },
	    {
	      title: "2323456234898",
	      payer:true
	    },
	    {
	      title:"232345676554898" ,
	      payer:false
	    }

	    ];

	  }]


});