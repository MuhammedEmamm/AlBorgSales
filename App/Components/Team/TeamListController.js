﻿(function () {
	'use strict';

	angular.module('app').controller('TeamListController', TeamListController);

	TeamListController.$inject = ['$scope', '$rootScope', '$state', '$http', 'BASE_URL', 'HTTP_HEADERS', '$cookies'];

	function TeamListController($scope, $rootScope, $state, $http, BASE_URL, HTTP_HEADERS, $cookies) {
			if($cookies.getObject('isloggedin1')!== 'true'){
		//('a') ; 
				$state.go('Login') ; 
			}

		//$('#mapDate').datepicker();
		$('#mapDate').datepicker();;
		$('#mapDate1').datepicker();;
		$scope.minDate = new Date(1990, 1, 1);
		$scope.maxDate = new Date(2040, 1, 1);
		$scope.role = $cookies.getObject('RoleName1');
		$scope.showManagers = true;
		$scope.showReps = true;
		//($scope.role);
		
		var expiresdate = new Date(2040,12,1);
 
		
		$scope.setexperiod = function(){
			$http({
				method : "POST" , 
				url : BASE_URL + "/User/UpdatePeriod",
				headers :{
		
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') , 
					'X-Frame-Options' : 'DENY'
				} , 
				data : {
						"Period":$scope.expr,
						"UserID":$cookies.getObject('UserID1'), 
						"CompanyID":15
				}
			}).then(function(response){
			   if(response.data.IsSuccess){
				   $scope.message = "Changed Successfully" ; 
				   console.log(response.data) ; 
				   window.location.reload() ; 
				   $("#PModal").modal("hide") ; 
			   } 
			});
			
		} ; 
		
		$scope.ResetPassword = function(x){
			$scope.date = new Date()  ; 

			$scope.PressReset = true;

//			console.log($scope.date) ; 
			$http({
				method: 'POST',
				url: BASE_URL + '/User/ResetPassword',
				data: {
					"UserID": x,
					"CompanyID": 15,
					"NewPassword":"1234",
  					"CreationDate":$scope.date
  
				},
				headers: {
			
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') , 
					'X-Frame-Options' : 'DENY'
				}
				
			}).then(function(res){
				console.log(res.data) ; 
				if(res.data.IsSuccess){
					
					$scope.message1 = "Password Changed To 1234." ;
						$cookies.putObject('EX_P1',$scope.date  , {
						'expires': (expiresdate)
					}) ;
					$('#okModal2').modal('show');
	
				}
				else{
					$scope.message1 = "Error From Server." ;
					
				}

			}) ;
			
			
		} ; 
		
		
		var getTeam = function () {

			$http({
				method: 'POST',
				url: BASE_URL + '/SalesRep/GetTeam',
				data: {
					"CompanyID": 15
				},
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                }
			}).then(function (res) {
				//(res.data);
				$scope.team = res.data.Response;
				document.getElementById('loading').style.display = "none";
				document.getElementById('loading1').style.display = "none";
				document.getElementById('loading2').style.display = "none";

				$scope.team.forEach(function (i) {
					if (i.Status === 'Activated') {
						i.active = true;
					} else {
						i.active = false;
					}
				});
				//($scope.team);
			});

		};

		
		 $scope.getSalesReps = function (x) {
			//(x);
			$http({
				method: 'POST',
				url: BASE_URL + '/SalesRep/GetSalesRepList',
				data: {
					"UserID": x,
					"CompanyID": 15
				},
 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                }
			}).then(function (res) {
				//(res.data);
				$scope.team = res.data.Response;
				//($scope.team);
			});

		};
		
		var getManagerList = function () {
			$http({
				method: 'POST',
				url: BASE_URL + '/SalesRep/GetManagerList',
				data: {
					"CompanyID": 15
				},
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                }
			}).then(function (res) {
				$scope.managerList = res.data.Response;
				$scope.managerList.push({
					ID:$cookies.getObject('UserID1'),
					Name : "All Sales Reps"
				}) ; 
								//($scope.managerList) ; 

				//(res.data);
			});
		};
		
		var getManagers = function () {
			$http({
				method: 'POST',
				url: BASE_URL + '/SalesRep/GetTeamManagers',
				data: {
					"CompanyID": 15
				},
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                }
			}).then(function (res) {
				$scope.managers = res.data.Response;
				document.getElementById('loading1').style.display = "none";
				document.getElementById('loading').style.display = "none";

				$scope.managers.forEach(function (i) {
					if (i.Status === 'Activated') {
						i.active = true;
					} else {
						i.active = false;
					}
				});
				//(res.data);
			});
		};
		
		var statusTo;
		$scope.updateRepActivity = function (rep) {


			if (rep.Status === 'Activated') {
				statusTo = 'Deactivated';
			} else if (rep.Status === 'Deactivated') {
				statusTo = 'Activated';
			}

			$http({
				method: 'POST',
				url: BASE_URL + '/SalesRep/ActivateDeactivate',
				data: {
					"ManagerID": rep.ManagerID,
					"SalesRepID": rep.SalesRepID,
					"StatusCode": statusTo,
					"CompanyID": 15
				},
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                }
			}).then(function (res) {
				//(res.data);
				getTeam();
			});
		};

		$scope.updateManagerActivity = function (manager) {
			getManagers();

			$('#myModal').modal('show');
			$('body').addClass('modal-open');
			$('.modal-backdrop').add();

			if (manager.Status === 'Activated') {
				statusTo = 'Deactivated';
			} else if (manager.Status === 'Deactivated') {
				statusTo = 'Activated';
			}



			$scope.update = function (alt) {
				$http({
					method: 'POST',
					url: BASE_URL + '/SalesRep/DeactivateManager',
					data: {
						"ManagerID": manager.ManagerID,
						"AlternativeManagerID": alt,
						"StatusCode": manager.Status,
						"CompanyID": 15
					},
				 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                }

				}).then(function (res) {
					//(res.data);
					getManagers();
					$('#myModal').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();

					$('#okModal').modal('show');
					$('body').addClass('modal-open');
					$('.modal-backdrop').add();

				}).catch(function (object) {
					//(object.data);
					getManagers();
					$('#myModal').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
				});
			}


		};
		$scope.getmap = function () {
			console.log($scope.mapDate) ; 
			////(document.getElementById('mapDate').value)	
			////($scope.SalesRepID) ; 
			
			$scope.mapDate = document.getElementById('mapDate').value;
			$http({
				method: "POST",
				url: BASE_URL + "/Visit/MapLocaion",
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                },
				data: {
					Day: $scope.mapDate,
					SalesRepID: $scope.SalesRepID,
					CompanyID: 15
				}
			}).then(function (response) {
				$scope.allmarkers = response.data.Response;
				//($scope.allmarkers);

				angular.extend($scope, {
					centerProperty: {
						lat: 30.044281,
						lng: 31.340002
					},
					zoomProperty: 10,
					markersProperty: $scope.allmarkers,
					clickedLatitudeProperty: null,
					clickedLongitudeProperty: null,
				});

			});
		};
		$scope.getmap1 = function () {
			////(document.getElementById('mapDate').value)	
			////($scope.SalesRepID) ; 
			
			$scope.mapDate1 = document.getElementById('mapDate1').value;
			$http({
				method: "POST",
				url: BASE_URL + "/Visit/MapLocaion",
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                },
				data: {
					Day: $scope.mapDate1,
					SalesRepID: $scope.SalesRepID,
					CompanyID: 15
				}
			}).then(function (response) {
				$scope.allmarkers = response.data.Response;
				//($scope.allmarkers);

				angular.extend($scope, {
					centerProperty: {
						lat: 30.044281,
						lng: 31.340002
					},
					zoomProperty: 10,
					markersProperty: $scope.allmarkers,
					clickedLatitudeProperty: null,
					clickedLongitudeProperty: null,
				});

			});
		};

		angular.extend($scope, {
			centerProperty: {
				lat: 30.044281,
				lng: 31.340002
			},
			zoomProperty: 10,
			markersProperty: [],
			clickedLatitudeProperty: null,
			clickedLongitudeProperty: null,
		});
		getTeam();
		if($scope.role === 'SalesAdmin')
		getManagers();
		if($scope.role === 'SalesAdmin')
		getManagerList();
	}
})();
