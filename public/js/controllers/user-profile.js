'use strict';
(function () {
	angular.module('myApp')

	.controller('userProfileCtrl', ['$scope', '$timeout', '$location', '$routeParams', 'User', userProfileCtrl]);

	function userProfileCtrl ($scope, $timeout, $location, $routeParams, User) {
		var userId = $routeParams.userId;
		var user = {};

		User.get(userId)
		.then(function (data) {
			if (data.isSuccess) {
			    $scope.user = data.user;
				user.name = data.user.name;
				user.email = data.user.email;
			    $scope.userProperties = Object.keys(data.user)
			} else {
				$scope.isUserExist = false;
				$scope.message = data.message;
			}
		})

		$scope.deleteUser = function deleteUser (user) {
			var userId = user.id;
			User.remove(userId)
			.then(function (data) {
				// console.log(data);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
				
				function goToUserList () {
				   $location.url('/users')
				}

				$timeout(goToUserList, 900);
			})
		}

		$scope.goToUpdateUserView = function goToUpdateUserView (e, user) {
			e.preventDefault();
			var userId = user.id;
			$location.url('/users/edit/' + userId);
		}

	}

})();