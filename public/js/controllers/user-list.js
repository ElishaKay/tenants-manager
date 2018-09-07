'use strict';
(function () {
	angular.module('myApp')

	.controller('userListCtrl', ['$scope', '$location', 'User', userListCtrl]);

	function userListCtrl ($scope, $location, User) {

		User.getAll()
		.then(function (users) {
			// console.log(users)
			$scope.users = users;
		})

		$scope.deleteUser = function deleteUser (e, user) {
			e.preventDefault();
			var userId = user.id;
			var index = $scope.users.indexOf(user);
			User.remove(userId)
			.then(function (data) {
				// console.log(data);
				$scope.users.splice(index, 1);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
			})
		}

		$scope.goToUpdateUserView = function goToUpdateUserView (e, user) {
			e.preventDefault();
			var userId = user.id;
			$location.url('/users/edit/' + userId);
		}

	}

})();