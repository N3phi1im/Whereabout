(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/views/home_page.html'
		}).state('Register', {
			url: '/Register',
			templateUrl: '/views/user_register.html'
		}).state('Login', {
			url: '/Login',
			templateUrl: '/views/user_login.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
