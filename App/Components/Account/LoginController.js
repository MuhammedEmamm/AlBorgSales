(function () {
	'use strict';

	angular.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$rootScope', 'BASE_URL', '$http', '$state', 'AUTH_EVENTS', 'AuthService', '$cookies', 'Idle'];

	function LoginController($scope, $rootScope, BASE_URL, $http, $state, AUTH_EVENTS, AuthService, $cookies, Idle) {
		$scope.Presslogin = false;
		$rootScope.login = true;
		$scope.lock = 1;

		Idle.unwatch();
		$scope.credentials = {
			username: '',
			password: ''
		};
		if ($cookies.getObject("Remme1")) {
			$state.go('DoctorsList');
		}

		$scope.login = function (credentials) {
			$scope.Presslogin = true;

			AuthService.login(credentials, $scope.remme, $scope.lock).then(function (user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$scope.Presslogin = true;

				$state.go('DoctorsList');

			}, function () {
				console.log('failed');
				$scope.Presslogin = false;
				if ($scope.lock !== 3) {
					$scope.lock++;
				}

				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				$scope.invalidMsg = "Invalid username or password.";
			});
		};
		$scope.Updatepass = function () {
			$scope.date = new Date();

			$http({
				method: 'POST',
				url: BASE_URL + '/User/UpdatePassword',
				data: {
					"Name": $scope.UN,
					"CompanyID": 15,
					"NewPassword": $scope.NP,
					"OldPassword": $scope.OP,
					"CreationDate": $scope.date

				},
				headers: {

					"content-type": "Application/json",
					'X-Frame-Options': 'DENY'
				}

			}).then(function (res) {
				//(res.data) ; 
				window.location.reload();


			});

		};

	}
})();