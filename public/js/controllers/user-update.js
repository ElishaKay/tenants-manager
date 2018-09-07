'use strict';
(function () {
	angular.module('myApp')

	.controller('userUpdateCtrl', ['$scope', '$location', '$timeout', '$routeParams', 'User', userCtrl]);

	function userCtrl ($scope, $location, $timeout, $routeParams, User) {
		var userId = $routeParams.userId;
		var user = {};

		User.get(userId)
		.then(function (data) {
			if (data.isSuccess) {
			    $scope.user = data.user;
				user.name = data.user.name;
				user.email = data.user.email;
			} else {
				$scope.isUserExist = false;
				$scope.message = data.message;
			}
		})

		$scope.updateUser = function () {
			var oldName = user.name;
			var oldEmail = user.email;
			var newName = $scope.user.name;
			var newEmail = $scope.user.email;
			var isUserChanged = (oldName !== newName) || (oldEmail !== newEmail);

			if (isUserChanged) {
				User.update(newName, newEmail, userId)
				.then(function (data) {
					$scope.isSuccess = data.isSuccess;
					$scope.message = data.message
					$scope.isSubmitted = true;
					var next = '/users/profile/' + userId;
					function goToUserViewPage() {
						$location.url(next);
					}

					if (data.isSuccess) {
						$timeout(goToUserViewPage, 1000);
					}
				})
			} else {
				$scope.user.name = oldName;
				$scope.user.email = oldEmail;
			}

		}

	}

})();