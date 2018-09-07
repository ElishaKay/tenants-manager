'use strict';
(function () {
	angular.module('myApp')

	.factory('User', ['$http', '$window', User]);

	function User ($http, $window) {

		function generateObjectForNotifyJs (message, isSuccess) {
			var NofyJsObj = {
				message: message,
				isSuccess: isSuccess
			};

			if (isSuccess) {
				NofyJsObj.colorClass = 'success';
				return NofyJsObj;
			} else {
				NofyJsObj.colorClass = 'error';
				return NofyJsObj;
			}
		}

		function create (name, email) {
			if (name && email) {
				var user = {
					name: name,
					email: email
				};

				return $http.post('/api/users', user)
				.then(function (res) {
					var data = res.data;
					if (data) {
						var message = data.message;
						var isSuccess = data.success;
						return generateObjectForNotifyJs(message, isSuccess);
					}
				})
			}
		}

		function get (userId) {
			if (userId) {
				var apiUrl = '/api/users/' + userId;
				return $http.get(apiUrl)
				.then(function (res) {
					var data = res.data;
					if (data) {
						var message   = data.message;
						var isSuccess = data.success;
						var resData   = generateObjectForNotifyJs(message, isSuccess);
						resData.user  = data.user;
						return resData;
					}
				})
			}
		}

		function getAll () {
			return $http.get('/api/users/')
			.then(function (res) {
				var data = res.data;
				if (data) {
					return data.users;
				} else {
					return [];
				}
			})
		}

		function update (name, email, userId) {
			if (userId) {
				var apiUrl = '/api/users/' + userId;
				var user = {
					name: name,
					email: email
				};
				return $http.put(apiUrl, user)
				.then(function (res) {
					var data = res.data;
					if (data) {
						var message   = data.message;
						var isSuccess = data.success;
						return generateObjectForNotifyJs(message, isSuccess);
					}
				})
			}
		}

		function remove (userId) {
			if (userId) {
				var apiUrl = '/api/users/' + userId;
				return $http.delete(apiUrl)
				.then(function (res) {
					var data = res.data;
					if (data) {
						var message   = data.message;
						var isSuccess = data.success;
						return generateObjectForNotifyJs(message, isSuccess);
					}
				})
			}
		}

		return {
			create: create,
			getAll: getAll,
			get: get,
			update: update,
			remove: remove
		}

	}

})();