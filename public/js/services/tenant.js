'use strict';
(function () {
	angular.module('myApp')

	.factory('Tenant', ['$http', '$window', Tenant]);

	function Tenant ($http, $window) {

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

		function create (name, email, phone, address) {
			if (name && email && phone && address) {
				var tenant = {
					name: name,
					email: email,
					phone: phone,
					address: address
				};

				return $http.post('/api/tenants', tenant)
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

		function get (tenantId) {
			if (tenantId) {
				var apiUrl = '/api/tenants/' + tenantId;
				return $http.get(apiUrl)
				.then(function (res) {
					var data = res.data;
					if (data) {
						var message   = data.message;
						var isSuccess = data.success;
						var resData   = generateObjectForNotifyJs(message, isSuccess);
						resData.tenant  = data.tenant;
						return resData;
					}
				})
			}
		}

		function getAll () {
			return $http.get('/api/tenants/')
			.then(function (res) {
				var data = res.data;
				if (data) {
					return data.tenants;
				} else {
					return [];
				}
			})
		}

		function update (name, email, tenantId) {
			if (tenantId) {
				var apiUrl = '/api/tenants/' + tenantId;
				var tenant = {
					name: name,
					email: email
				};
				return $http.put(apiUrl, tenant)
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

		function remove (tenantId) {
			if (tenantId) {
				var apiUrl = '/api/tenants/' + tenantId;
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