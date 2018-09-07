'use strict';
(function () {
	angular.module('myApp')

	.controller('userCreationCtrl', ['$scope', '$timeout', 'User', userCreationCtrl]);

	function userCreationCtrl ($scope, $timeout, User) {
		$scope.user = {};
		$scope.createUser = function () {
			User.create($scope.user.name, $scope.user.email)
			.then(function (data) {
				// console.log(data);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
				
				if (data.isSuccess) {
					$scope.user = {}
				}

				$timeout(hideSubmitMessage, 1000);
				function hideSubmitMessage () {
					$scope.isSubmitted = false;
				}

			})

		};

	}

})();