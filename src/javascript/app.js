(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Welcome',{
			url: '/',
			templateUrl: '/views/welcome_page.html'
		}).state('Register', {
			url: '/Register',
			templateUrl: '/views/user_register.html'
		}).state('Login', {
			url: '/Login',
			templateUrl: '/views/user_login.html'
		}).state('Home', {
			url: '/Home',
			templateUrl: '/views/home_page.html'
		}).
		state('Business', {
			url: '/Business',
			templateUrl: '/views/business_page.html'
		}).
		state('Discovery', {
			url: '/Discovery',
			templateUrl: '/views/discovery_page.html'
		}).
		state('MyPost', {
			url: '/MyPost',
			templateUrl: '/views/mypost_page.html'
		}).
		state('Profile', {
			url: '/Profile',
			templateUrl: '/views/profile_page.html'
		}).
		state('TakePhoto', {
			url: '/TakePhoto',
			templateUrl: '/views/takephoto_page.html'
		}).
		state('PasswordReset', {
			url: '/PasswordReset',
			templateUrl: '/views/passwordreset_page.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
