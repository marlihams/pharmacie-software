angular.module("core.commande")
		.factory('CommandeService',['$resource',function($resource){
			var commandeService={};
			commandeService.quantity=0;
			commandeService.request= $resource('/commande/:id',{id:'@_id'},{
					update:{
						method:'PUT'
					}/*,
					filter:{
						method:'GET',
						isArray:true
					}*/
				});

			/**
				  getting a commande By his Id
				 @function getcommandById
				 @params commandeId  id of the commande
				 @callback  cb to manage the result 
				 	@callback params  command{Object}

			*/

			commandeService.getCommandById=function(commandeId,cb){

				return commandeService.request.get({id:commandeId},function(commande){
					
					if (cb)
						cb(commande);
				});
			};

			/**
				  update  a  specific command 
				 @function update
				 @params command{Object}  the updated command
				 @callback  cb to manage the result 
				 	@callback params  updatedCommand{Object}

			*/

			commandeService.update=function(command,cb){
				var $commandService=new commandeService.request();
				$commandService._id=command._id;
				$commandService.data=command;

				$commandService.$update(function(updatedCommand){
					if (cb){

						cb(updatedCommand);
					}
				});


			};

			/**
				 delete a command 
				 @function delete
				 @params commandId{String} id of the command
				 @callback  cb to manage the result 

			*/

			commandeService.delete=function(commandId,cb){
				var $commandService=new commandeService.request();
				 
				if(commandId){
					$commandService._id=commandId;
					$commandService.$delete(function(dailySale){

						if (cb){
							cb(dailySale);
						}

					});
				
				}
			};

			/**
				 create a  new command 
				 @function create
				 @params commandId{String} id of the command
				 @callback  cb to manage the result 
				 	@callback params {object} othe created command and his dailySale

			*/

			commandeService.create=function(command,cb){
				var $commandService=new commandeService.request();
				 $commandService.data=command;
				if(command){
					$commandService.$save(function(rep){

						if (cb){
							cb(rep);
						}

					});
				
				}
			};

			return commandeService;

		}]);