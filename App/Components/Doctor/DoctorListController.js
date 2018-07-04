(function () {
    'use strict';

    angular.module('app').controller('DoctorListController', DoctorListController);

    DoctorListController.$inject = ['$scope', '$rootScope', '$state', '$http','BASE_URL', 'HTTP_HEADERS','$cookies'];

    function DoctorListController($scope, $rootScope, $state, $http,BASE_URL, HTTP_HEADERS,$cookies) {

        $scope.role = $cookies.getObject('RoleName1');
		$scope.totalDisplayed = 20;
		$scope.load = false ; 
        var getDoctorList = function () {

            $http({
                method: 'POST',
                url: BASE_URL + '/Doctor/GetDoctors',
                data: {
					"UserID": $cookies.getObject('UserID1'),
                    "RoleID": $cookies.getObject('RoleID1'),
                    "CompanyID": 15
                },
                headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1')
                }
            }).then(function (res) {
                //(res.data);
                $scope.doctors = res.data.Response;
				$scope.load = true; 
				document.getElementById('loading').style.display = "none" ; 
            });

        }  ; 
			$scope.loadMore = function () {
			  $scope.totalDisplayed += 20;  
		};
        getDoctorList();
    }
})();
