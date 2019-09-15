(function () {
    'use strict';

    angular.module('app').controller('DoctorListController', DoctorListController);

    DoctorListController.$inject = ['$scope', '$rootScope', '$state', '$http', 'BASE_URL', 'HTTP_HEADERS', '$cookies', 'Idle'];

    function DoctorListController($scope, $rootScope, $state, $http, BASE_URL, HTTP_HEADERS, $cookies, Idle) {

        Idle.watch();
        if ($cookies.getObject('isloggedin1') !== 'true') {
            //('a') ; 
            $state.go('Login');
        }
        $rootScope.login = false;

        $scope.role = $cookies.getObject('RoleName1');
        $scope.totalDisplayed = 20;
        $scope.load = false;
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
                    "UserID": $cookies.getObject('UserID1'),
                    'X-Frame-Options': 'DENY'
                }
            }).then(function (res) {
                //(res.data.Response.length);
                $scope.doctors = res.data.Response;
                $scope.load = true;
                document.getElementById('loading').style.display = "none";
            });

        };
        $scope.loadMore = function () {
            $scope.totalDisplayed += 20;
        };
        getDoctorList();
    }
})();