'use strict';
(function () {
	angular.module('myApp')

	.controller('tenantUpdateCtrl', ['$scope', '$location', '$timeout', '$routeParams', 'Tenant', tenantCtrl]);

	function tenantCtrl ($scope, $location, $timeout, $routeParams, Tenant) {
		var tenantId = $routeParams.tenantId;
		var tenant = {};

		Tenant.get(tenantId)
		.then(function (data) {
			if (data.isSuccess) {
			    $scope.tenant = data.tenant;
				tenant.name = data.tenant.name;
				tenant.email = data.tenant.email;
			} else {
				$scope.isTenantExist = false;
				$scope.message = data.message;
			}
		})

		$scope.updateTenant = function () {
			var oldName = tenant.name;
			var oldEmail = tenant.email;
			var oldPhone = tenant.phone;
			var oldAddress = tenant.address;

			var newName = $scope.tenant.name;
			var newEmail = $scope.tenant.email;
			var newPhone = $scope.tenant.phone;
			var newAddress = $scope.tenant.address;

			var isTenantChanged = (oldName !== newName) || (oldEmail !== newEmail) || (oldAddress !== newAddress) || (oldPhone !== newPhone) ;

			if (isTenantChanged) {
				Tenant.update(newName, newEmail, newPhone, newAddress, tenantId)
				.then(function (data) {
					$scope.isSuccess = data.isSuccess;
					$scope.message = data.message
					$scope.isSubmitted = true;
					var next = '/tenants/profile/' + tenantId;
					function goToTenantViewPage() {
						$location.url(next);
					}

					if (data.isSuccess) {
						$timeout(goToTenantViewPage, 1000);
					}
				})
			} else {
				$scope.tenant.name = oldName;
				$scope.tenant.email = oldEmail;
			}

		}

	}

})();