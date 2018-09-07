'use strict';
(function () {
	angular.module('myApp')

	.controller('tenantListCtrl', ['$scope', '$location', '$filter', 'Tenant', tenantListCtrl]);

	function tenantListCtrl ($scope, $location, $filter, Tenant) {

		Tenant.getAll()
		.then(function (tenants) {
			console.log(tenants)
			$scope.tenants = tenants;
		})

		$scope.selectedSearch = 'allTenants';

		$scope.deleteTenant = function deleteTenant (e, tenant) {
			e.preventDefault();
			var tenantId = tenant.id;
			var index = $scope.tenants.indexOf(tenant);
			Tenant.remove(tenantId)
			.then(function (data) {
				// console.log(data);
				$scope.tenants.splice(index, 1);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
			})
		}

		$scope.goToUpdateTenantView = function goToUpdateTenantView (e, tenant) {
			e.preventDefault();
			var tenantId = tenant.id;
			$location.url('/tenants/edit/' + tenantId);
		}
	}

})();