'use strict';
(function () {
	angular.module('myApp')

	.controller('tenantProfileCtrl', ['$scope', '$timeout', '$location', '$routeParams', 'Tenant', tenantProfileCtrl]);

	function tenantProfileCtrl ($scope, $timeout, $location, $routeParams, Tenant) {
		var tenantId = $routeParams.tenantId;
		var tenant = {};

		Tenant.get(tenantId)
		.then(function (data) {
			if (data.isSuccess) {
			    $scope.tenant = data.tenant;
				tenant.name = data.tenant.name;
				tenant.email = data.tenant.email;
			    $scope.tenantProperties = Object.keys(data.tenant)
			} else {
				$scope.isTenantExist = false;
				$scope.message = data.message;
			}
		})

		$scope.deleteTenant = function deleteTenant (tenant) {
			var tenantId = tenant.id;
			Tenant.remove(tenantId)
			.then(function (data) {
				// console.log(data);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
				
				function goToTenantList () {
				   $location.url('/tenants')
				}

				$timeout(goToTenantList, 900);
			})
		}

		$scope.goToUpdateTenantView = function goToUpdateTenantView (e, tenant) {
			e.preventDefault();
			var tenantId = tenant.id;
			$location.url('/tenants/edit/' + tenantId);
		}

	}

})();