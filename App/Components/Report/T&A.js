(function () {
    'use strict';

    angular.module('app').controller('TAReportController', TAReportController);

    TAReportController.$inject = ['$scope', '$rootScope', '$state', '$http','BASE_URL', 'HTTP_HEADERS','$cookies'];

    function TAReportController(  $scope, $rootScope, $state, $http, BASE_URL, HTTP_HEADERS,$cookies) {
			
		if($cookies.getObject('isloggedin1')!== 'true'){
				$state.go('Login') ; 
			}
		var today = new Date() ; 
		var curmonth = today.getMonth() ; 
        $scope.role = $cookies.getObject('RoleName1');
		$scope.Name= $cookies.getObject('FullName1');
		$scope.SalesRepID = '12ad960d-e1ad-44a2-bf1b-5ec096a808ad' ; 
		$scope.tareport = function(){
			   $http({
                method: 'POST',
                url: BASE_URL + '/Visit/GetCustomerReport',
                data: {
                    "StartDate": '01/01/2000',
                    "EndDate": '01/01/2030',
                    "RoleID": $cookies.getObject('RoleID1'),
                    "CompanyID": 15
                },
                headers: {
      
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') , 
					'X-Frame-Options' : 'DENY'
                }
            }).then(function (res) {
             //console.log(res.data);
				$scope.report = res.data.Response;
            });
			
			$http({
                method: 'POST',
                url: BASE_URL + '/Visit/GetCustomerReport',
                data: {
                    "StartDate": '01/01/2000',
                    "EndDate": '01/01/2030',
                    "RoleID": $scope.SalesRepID,
                    "CompanyID": 15
                },
                headers: {
      
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') , 
					'X-Frame-Options' : 'DENY'
                }
            }).then(function (res) {
            // console.log(res.data);
				$scope.report = $scope.report.concat(res.data.Response) ; 
				
				console.log($scope.report) ; 
            });
		} ; 
		$scope.tareport() ;
		$scope.getSaleslist = function() {
				$http({
				            
                method: 'POST',
                url: BASE_URL + '/SalesRep/GetSalesRepList',
                data: {
					"UserID" : $cookies.getObject('UserID1') ,
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1'),
										'X-Frame-Options' : 'DENY'

                }
			}).then(function(response){
				console.log(response.data) ; 
				$scope.allSalesRep = response.data.Response ; 
			},
			function(response){
				//("ERROR") ; 	
			})
		} ; 
		$scope.getSaleslist()  ;
    }
})();
