(function () {
	'use strict';

	angular.module('app').factory('AuthService', AuthService);

	AuthService.$inject = ['$http', 'BASE_URL', 'HTTP_HEADERS', '$cookies','AUTH_EVENTS'];

	function AuthService($http, BASE_URL, HTTP_HEADERS, $cookies,AUTH_EVENTS ) {
		var authService = {};
		var expiresdate = new Date(2040,12,1);

		authService.login = function (credentials, x , y) {
				console.log(y) ; 
			if(y === 3){
				var loginData = {		
				"Name": credentials.username,
				"Password": credentials.password,
				"DeviceToken": "",
				"CompanyID": 15,
				"Louck": 1,
				"employeeID": "6c699f76-e696-e711-80f5-000c29c47db9"
			};
				
			}
			else{
				var loginData = {		
				"Name": credentials.username,
				"Password": credentials.password,
				"DeviceToken": "",
				"CompanyID": 15,
				"Louck": 0,
				"employeeID": "6c699f76-e696-e711-80f5-000c29c47db9"
			};
				
			}
			

			return $http({
				method: 'POST',
				url: BASE_URL + '/User/Login',
				data: loginData,
				headers: HTTP_HEADERS
			}).then(function (res) {
								authService.RoleName = res.data.Response.RoleName ; 
				authService.UserID = res.data.Response.UserID ; 
					$cookies.putObject('ZX_A1', res.data.Response.UserID);
				$cookies.putObject('MK_L1', res.data.Response.RoleName);


				if (x) {
					
					$cookies.putObject('SecurityToken1', res.data.Response.SecurityToken, {
						'expires': (expiresdate)
					});
					$cookies.putObject('UserID1', res.data.Response.UserID, {
						'expires': (expiresdate)
					});
					$cookies.putObject('FullName1', res.data.Response.FullName, {
						'expires': (expiresdate)
					});
					$cookies.putObject('ImageURL1', res.data.Response.ImageURL, {
						'expires': (expiresdate)
					});
					$cookies.putObject('RoleID1', res.data.Response.RoleID, {
						'expires': (expiresdate)
					});
					$cookies.putObject('RoleName1', res.data.Response.RoleName, {
						'expires': (expiresdate)
					});
					$cookies.putObject('Remme1', "true", {
						'expires': (expiresdate)
					});
						$cookies.putObject('SUB_NOTIFY1' , 0 , {
						'expires': (expiresdate)
					}) ; 
					
				}
				else{
					
				$cookies.putObject('SecurityToken1', res.data.Response.SecurityToken);
				$cookies.putObject('UserID1', res.data.Response.UserID);
				$cookies.putObject('FullName1', res.data.Response.FullName);
				$cookies.putObject('ImageURL1', res.data.Response.ImageURL);
				$cookies.putObject('RoleID1', res.data.Response.RoleID);
				$cookies.putObject('RoleName1', res.data.Response.RoleName);
				$cookies.putObject('SUB_NOTIFY1' , 0 ) ; 

				}	

			});
		};

		authService.logout = function () {
			$cookies.remove('SecurityToken1');
			$cookies.remove('UserID1');
			$cookies.remove('FullName1');
			$cookies.remove('ImageURL1');
			$cookies.remove('RoleID1');
			$cookies.remove('RoleName1');
			$cookies.remove('Remme1') ; 
			$cookies.remove('isloggedin1') ; 
			$cookies.remove('ZX_A1');
			$cookies.remove('MK_L1');
			
			
		};


		authService.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
		};

		return authService;
	}

})();