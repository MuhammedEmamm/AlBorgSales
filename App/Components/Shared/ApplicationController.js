﻿(function () {
    'use strict';

    angular.module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', '$rootScope','AuthService', 'BASE_URL', '$state', '$http', '$cookies','AUTH_EVENTS' ,  'Idle' , 'Keepalive' , '$uibModal'];

    function ApplicationController($scope, $rootScope, AuthService, BASE_URL, $state, $http, $cookies,AUTH_EVENTS , Idle, Keepalive, $uibModal) {
		var expiresdate = new Date(2040,12,1);
			if($cookies.getObject('isloggedin1')!== 'true'){
		//('a') ; 
				$state.go('Login') ; 
			}
				$scope.started = false;		

			$scope.oldest = [] ; 
		$scope.oldest.push(-1) ; 
		
			if($cookies.getObject('isloggedin1')=="true"){
				$scope.role = $cookies.getObject('RoleName1');
            	$scope.userName = $cookies.getObject('FullName1');
				$scope.ppUrl = $cookies.getObject('ImageURL1');
			}

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            $scope.role = $cookies.getObject('RoleName1');
            $scope.userName = $cookies.getObject('FullName1');
            $scope.ppUrl = $cookies.getObject('ImageURL1');
						$scope.UID = $cookies.getObject('UserID1');
			$scope.Role = AuthService.RoleName ; 
			$scope.UserID = AuthService.UserID ; 

			if($cookies.getObject('Remme1'))
			$cookies.putObject('isloggedin1',"true"  , {
						'expires': (expiresdate)
					}) ; 
			else 
				$cookies.putObject('isloggedin1' , "true") ; 
            //($scope.userName);
        });
		$scope.aft7 = function(){
			if($cookies.getObject('Remme1'))
						$cookies.putObject('SUB_NOTIFY1' , 0 , {
						'expires': (expiresdate)
					}) ; 
					else 
						$cookies.putObject('SUB_NOTIFY1' , 0 ) ; 
					
			$scope.sub = 0 ; 
			$scope.oldest = $scope.List ;

			
			
          $('#wrapper').toggleClass('right-bar-enabled');
			

};
		$scope.playAudio = function() {
		 	 var audio = new Audio('AlBorgSales/Assets/Notify.mp3');
			 audio.play() ;
    	};
		
		$scope.GetNotification = function() {
			$http({
				method:"POST",
				url: BASE_URL +  "/Visit/GetNotifications",
			 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken1'),
                    "UserID": $cookies.getObject('UserID1') ,
					'X-Frame-Options' : 'DENY'
                },
				data:{
					"CompanyID" : 15
				}
			}).then(function(response){
				
				
						$scope.sub = $cookies.getObject('SUB_NOTIFY1'); 

				if($scope.oldest[0] === -1){
					$scope.oldest = response.data.Response ; 
					//le.log(1) ; 
				}
				else if ($scope.oldest.length < response.data.Response.length){
					
					if($cookies.getObject('Remme1'))
						$cookies.putObject('SUB_NOTIFY1' , response.data.Response.length - $scope.oldest.length , {
						'expires': (expiresdate)
					}) ; 
					else 
						$cookies.putObject('SUB_NOTIFY1' , response.data.Response.length - $scope.oldest.length ) ; 
					$scope.sub = $cookies.getObject('SUB_NOTIFY1');
					
					$scope.playAudio() ; 	

					//le.log(2) ; 
					//le.log($scope.sub) ; 
				}
			
					//($scope.List) ; 
				$scope.List = response.data.Response ; 
				if($scope.List != undefined && $scope.List != null)
				$scope.List = $scope.List.reverse() ;
			})
		} ; 
		$scope.GetNotification() ; 
		setInterval(function(){
  $scope.GetNotification();
}, 120000) ; 
		
//		setInterval(function(){
//			console.clear() ; 
//		} , 5000) ; 
//		
		if($rootScope.login===false){
					      function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }

      $scope.$on('IdleStart', function() {
        closeModals();

        $scope.warning = $uibModal.open({
          templateUrl: 'warning-dialog.html',
          windowClass: 'modal-danger'
        });
      });

      $scope.$on('IdleEnd', function() {
        closeModals();
      });

			$scope.$on('IdleTimeout', function() {
        closeModals();
		  $rootScope.logout() ; 
        
      });

      $scope.start = function() {
        closeModals();
        Idle.watch();
        $scope.started = true;
      };

      $scope.stop = function() {
        closeModals();
        Idle.unwatch();
        $scope.started = false;

      };
		$scope.start() ; 
		
				}


		
        $rootScope.logout = function () {
			AuthService.logout();
            $state.go('Login');
        };
    }
})();
