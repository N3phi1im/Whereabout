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
			o.status.username = getUsername();
		}
		o.setToken = setToken;
		o.getToken = getToken;
		o.removeToken = removeToken;
		o.register = register;
		o.login = login;
		o.facebook = facebook;
		o.logout = logout;
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
		function facebook() {
			var q = $q.defer();
			$http.get('/api/Facebook/auth/facebook').success(function(res) {
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
			o.status.username = getUsername();
		}
		function getToken() {
			return localStorage.token;
		}
		function removeToken() {
			localStorage.removeItem('token');
			o.status.username = null;
		}

		function getUsername() {
			return JSON.parse(atob(getToken().split('.')[1])).username;
		}
	}
})();
