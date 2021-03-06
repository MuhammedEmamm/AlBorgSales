(function () {
	'use strict';

	angular.module('app').controller('AvtReportController', AvtReportController);

	AvtReportController.$inject = ['$scope', '$rootScope', '$state', '$http', 'BASE_URL', 'HTTP_HEADERS', '$cookies'];

	function AvtReportController($scope, $rootScope, $state, $http, BASE_URL, HTTP_HEADERS, $cookies) {
		if ($cookies.getObject('isloggedin1') !== 'true') {
			//('a') ; 
			$state.go('Login');
		}
		var today = new Date();
		var curmonth = today.getMonth();
		$scope.role = $cookies.getObject('RoleName1');
		$scope.avtreport = function () {
			$http({

				method: 'POST',
				url: BASE_URL + '/Visit/GetAVTDetails',
				data: {
					"Month": curmonth,
					"RoleID": $cookies.getObject('RoleID1'),
					"CompanyID": 15
				},
				headers: {
					"content-type": "Application/json",
					"Token": $cookies.getObject('SecurityToken1'),
					"UserID": $cookies.getObject('UserID1'),
					'X-Frame-Options': 'DENY'
				}
			}).then(function (response) {
					//(response.data) ; 
					$scope.allatvs = response.data.Response;
				},
				function (response) {
					//("ERROR") ; 	
				})
		};
		$scope.avtreport();
		$scope.getmanglist = function () {
			$http({

				method: 'POST',
				url: BASE_URL + '/SalesRep/GetManagerList',
				data: {
					"CompanyID": 15
				},
				headers: {
					"content-type": "Application/json",
					"Token": $cookies.getObject('SecurityToken1'),
					"UserID": $cookies.getObject('UserID1'),
					'X-Frame-Options': 'DENY'
				}
			}).then(function (response) {
					//(response.data) ; 
					$scope.allmangs = response.data.Response;
				},
				function (response) {
					//("ERROR") ; 	
				})
		};
		$scope.getmanglist();
	}
})();