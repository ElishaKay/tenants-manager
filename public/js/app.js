'use strict';
(function () {
	angular.module('myApp', ['ngRoute'])

	.config(['$routeProvider', config]);

	function config ($routeProvider) {
		$routeProvider
		.when('/tenants/new', {
			templateUrl: '../partials/tenant-create.html',
			controller: 'tenantCreationCtrl'
		})
		.when('/tenants', {
			templateUrl: '../partials/tenant-list.html',
			controller: 'tenantListCtrl'
		})
		.when('/tenants/profile/:tenantId', {
			templateUrl: '../partials/tenant-profile.html',
			controller: 'tenantProfileCtrl'
		})
		.when('/tenants/edit/:tenantId', {
			templateUrl: '../partials/tenant-update.html',
			controller: 'tenantUpdateCtrl'
		})
		.otherwise('/tenants/new')
	}

})();