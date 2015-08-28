(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', '$q'];

	function UserFactory($http, $q) {
		var o = {};
		o.status = {};
		if(getToken()) {
			o.status.isLoggedIn = true;
			o.status.id = getId();
			o.status.first_name = getFirstname();
			o.status.last_name = getLastname();
			o.status.image = getImage();
		}
		o.setToken = setToken;
		o.getToken = getToken;
		o.removeToken = removeToken;
		o.register = register;
		o.login = login;
		o.logout = logout;
		o.update = update;
		return o;

		function register(user) {
			var q = $q.defer();
			$http.post('/api/Users/Register', user).success(function(res) {
				setToken(res.token);
				o.status.isLoggedIn = true;
				q.resolve();
			});
			return q.promise;
		}

		function update(user) {
			var q = $q.defer();
			$http.post('/api/Users/Update', user).success(function(res) {
				
				setToken(res.token);
				o.status.isLoggedIn = true;
				q.resolve();
			});
			return q.promise;
		}

		function login(user) {
			var u = { email: user.email.toLowerCase(), password: user.password};
			var q = $q.defer();
			$http.post('/api/Users/Login', u).success(function(res) {
				setToken(res.token);
				o.status.isLoggedIn = true;
				q.resolve();
			});
			return q.promise;
		}
		function logout() {
			o.status.isLoggedIn = false;
			removeToken();
		}
		function setToken(token) {
			localStorage.setItem('token', token);
			o.status.id = getId();
			o.status.first_name = getFirstname();
			o.status.last_name = getLastname();
			o.status.image = getImage();
		}
		function getToken() {
			return localStorage.token;
		}
		function removeToken() {
			localStorage.removeItem('token');
			o.status.id = null;
			o.status.first_name = null;
			o.status.last_name = null;
			o.status.image = null;
		}

		function getFirstname() {
			return JSON.parse(atob(getToken().split('.')[1])).first_name;
		}
		function getLastname() {
			return JSON.parse(atob(getToken().split('.')[1])).last_name;
		}
		function getImage() {
			return JSON.parse(atob(getToken().split('.')[1])).image;
		}
		function getId() {
			return JSON.parse(atob(getToken().split('.')[1])).id;
		}
	}
})();
