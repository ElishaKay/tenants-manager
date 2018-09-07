'use strict';
(function () {
	angular.module('myApp', ['ngRoute'])

	.config(['$routeProvider', config]);

	function config ($routeProvider) {
		$routeProvider
		.when('/users/new', {
			templateUrl: '../partials/user-create.html',
			controller: 'userCreationCtrl'
		})
		.when('/users', {
			templateUrl: '../partials/user-list.html',
			controller: 'userListCtrl'
		})
		.when('/users/profile/:userId', {
			templateUrl: '../partials/user-profile.html',
			controller: 'userProfileCtrl'
		})
		.when('/users/edit/:userId', {
			templateUrl: '../partials/user-update.html',
			controller: 'userUpdateCtrl'
		})
		.otherwise('/users/new')
	}

})();