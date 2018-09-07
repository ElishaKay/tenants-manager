'use strict';
(function () {
	angular.module('myApp')

	.controller('tenantCreationCtrl', ['$scope', '$timeout', 'Tenant', tenantCreationCtrl]);

	function tenantCreationCtrl ($scope, $timeout, Tenant) {
		$scope.tenant = {};
		$scope.createTenant = function () {
			Tenant.create($scope.tenant.name, $scope.tenant.email)
			.then(function (data) {
				// console.log(data);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
				
				if (data.isSuccess) {
					$scope.tenant = {}
				}

				$timeout(hideSubmitMessage, 1000);
				function hideSubmitMessage () {
					$scope.isSubmitted = false;
				}

			})

		};

	}

})();