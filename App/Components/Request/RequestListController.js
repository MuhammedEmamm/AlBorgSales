(function () {
    'use strict';

    angular.module('app')
        .controller('RequestListController', RequestListController);

    RequestListController.$inject = ['$scope', '$rootScope', '$state', '$http','BASE_URL', 'HTTP_HEADERS','$cookies' , 'filterFilter'];

    function RequestListController($scope, $rootScope, $state, $http, BASE_URL, HTTP_HEADERS,$cookies, filterFilter) {
		
		var role1 = $cookies.getObject('RoleName1') ; 
        var getManagers = function () {
            $http({
                method: 'POST',
                url: BASE_URL + '/SalesRep/GetManagerList',
                data: {
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1') ,
                    "UserID": $cookies.getObject('UserID1')
                }
            }).then(function (res) {
                $scope.managers = res.data.Response;
                $scope.managers.push({ ID: '', Name: '' });
                //(res.data);
            });
        };

        var getRequestList = function () {

            $http({
                method: 'POST',
                url: BASE_URL + '/Visit/GetPendingRequests',
                data: {
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                }
            }).then(function (res) {
                //(res.data);
                $scope.requests = res.data.Response;
								$scope.requests2 = res.data.Response;

            });

        }
		
		var getRequestListfilterd = function (x) {

            $http({
                method: 'POST',
                url: BASE_URL + '/Visit/GetPendingRequests',
                data: {
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                }
            }).then(function (res) {
                //(res.data);
				$scope.requests2 = res.data.Response;
				
            if (x === 1) {
				$scope.requests = filterFilter($scope.requests2,{RequestType : 'Doctor'}) ; 
			}
            if (x === 2) {
                $scope.requests = filterFilter($scope.requests2,{RequestType : 'VisitPlan'}) ;
            }
			
            if (x === 3) {
                $scope.requests =filterFilter($scope.requests2,{RequestType : 'UnplannedVisit'}) ;
            }
				console.log($scope.requests) ; 
				
            });

        } ; 

		
        var deleteRequest = function (requestId) {
            $http({
                method: 'POST',
                url: BASE_URL + '/Doctor/DeleteDoctorRequest',
                data: {
                    "DoctorID": requestId,
                    "CompanyID": 15
                },
                headers: {
                  "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                }
            }).then(function (res) {
                //(res.data);
if($scope.type.id!=0)
				getRequestListfilterd($scope.type.id)
			else
				getRequestList() ; 
            });
        };

        var accept = function (id, type) {
            if (type === 'Doctor') {
                $http({
                    method: 'POST',
                    url: BASE_URL + '/Doctor/ApproveDoctor',
                    data: {
                        "DoctorID": id,
                        "CompanyID": 15
                    },
                    headers: {
                           "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                    }
                }).then(function (res) {
                    //(res.data);
if($scope.type.id!=0)
				getRequestListfilterd($scope.type.id)
			else
				getRequestList() ; 
                });
            }
            if (type === 'VisitPlan') {
                $http({
                    method: 'POST',
                    url: BASE_URL + '/Visit/ApproveVisitPlan',
                    data: {
                        "PlanID": id,
                        "CompanyID": 15
                    },
                    headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                    }
                }).then(function (res) {
                    //(res.data);
					//(id) ; 
if($scope.type.id!=0)
				getRequestListfilterd($scope.type.id)
			else
				getRequestList() ; 
                });
            }
			if(type === 'UnplannedVisit'){
				 $http({
                    method: 'POST',
                    url: BASE_URL + '/Visit/ApproveUnplannedVisit',
                    data: {
                        "VisitID": id,
                        "CompanyID": 15
                    },
                    headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                    }
                }).then(function (res) {
                    //(res.data);
					//(id) ; 
if($scope.type.id!=0)
				getRequestListfilterd($scope.type.id)
			else
				getRequestList() ; 
                });
			}
        };

        var reject = function (id, type) {
            if (type === 'Doctor') {
                deleteRequest(id);
            }
            if (type === 'VisitPlan') {
                $http({
                    method: 'POST',
                    url: BASE_URL + '/Visit/RejectVisitPlan',
                    data: {
                        "PlanID": id,
                        "CompanyID": 15
                    },
                    headers: {
                       "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                    }
                }).then(function (res) {
                    //(res.data);
if($scope.type.id!=0)
				getRequestListfilterd($scope.type.id)
			else
				getRequestList() ; 
                });
            }
			if (type === 'UnplannedVisit') {
                $http({
                    method: 'POST',
                    url: BASE_URL + '/Visit/RejectUnplannedVisit',
                    data: {
                        "PlanID": id,
                        "CompanyID": 15
                    },
                    headers: {
                       "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                    }
                }).then(function (res) {
                    //(res.data);
                  	if($scope.type.id!=0)
				getRequestListfilterd($scope.type.id)
			else
				getRequestList() ; 

                });
            }
			
        };

		$scope.getdeadline = function(){
			$http({
				method : "POST" , 
				url : BASE_URL + "/Visit/GetPlanDeadline",
				headers :{
					"content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
				} , 
				data : {
				"CompanyID":15
				}
			}).then(function(response){
			   $scope.deadline = response.data.Response.DeadlineDay ; 
			}) ; 
		} ; 
		
		$scope.getdeadline() ;
		
		$scope.setdeadline = function(){
			$http({
				method : "POST" , 
				url : BASE_URL +  "/Visit/ChangePlanDeadline",
				headers :{
					"content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
				} , 
				data : {
					"Day" : $scope.deadline ,
				"CompanyID":15
				}
			}).then(function(response){
			   if(response.data.IsSuccess){
				   $scope.message = "Changed Successfully" ; 
				   $scope.getdeadline() ; 
				   window.location.reload() ;
				   $("#changeDeadline").modal("hide") ; 
			   } 
			}) ; 
		} ; 
		
		
        $scope.types = [{ 'id': 0, 'label': 'All Requests' },
            { 'id': 1, 'label': 'New Doctor Request' },
            { 'id': 2, 'label': 'Visit Plan Request' },
			{ 'id': 3, 'label': 'Unplanned Visit Request' }];

        $scope.updateType = function (type) {
            //(type);
			if (type.id === 0) {
                getRequestList();
            }
            if (type.id === 1) {
				$scope.requests = filterFilter($scope.requests2,{RequestType : 'Doctor'}) ; 
			}
            if (type.id === 2) {
                $scope.requests = filterFilter($scope.requests2,{RequestType : 'VisitPlan'}) ;
            }
			
            if (type.id === 3) {
                $scope.requests =filterFilter($scope.requests2,{RequestType : 'UnplannedVisit'}) ;
            }
        };

        getRequestList();
        getManagers();
        $scope.delete = function (requestId) {
            deleteRequest(requestId);
        };
        $scope.role = $cookies.getObject('RoleName1');
        $scope.accept = function (id, type) {
            accept(id, type);
        }
        $scope.reject = function (id, type) {
            reject(id, type);
        }
        $scope.planvisits = function (x,y) {
            //(x);
            var mm = x.substring(0, 1);
            //(mm.length);
            var yy = x.substring(4, 8);
            //(yy.length); 
            //(mm + " " + yy); 
            $http({
                method: "POST",
                url: BASE_URL + "/Visit/GetPlanVisits",
                headers: {
                    "Content-Type": "application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                },
                data: {
                    "Month": mm,
                    "Year": yy,
                    "SalesRepID": y,
                    "CompanyID": 15
                }
            }).then(function (response) {
                //(response.data);
                $("#myModal").modal("show"); 
                $scope.visits = response.data.Response.Visits;
            });

        };
    }
})();
