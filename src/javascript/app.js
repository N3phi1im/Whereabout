(function() {
	'use strict';

	angular.module('app', ['omr.directives','ui.router','uiGmapgoogle-maps','ui.bootstrap', 'ngAnimate', 'angular-carousel', 'duScroll'])
	.config(Config)
	.run(auth);

	Config.$inject = ['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];

	function Config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
		$stateProvider.state('Welcome',{
			url: '/',
			templateUrl: '/views/welcome_page.html'
		})
		.state('Register', {
			url: '/Register',
			templateUrl: '/views/user_register.html'
		})
		.state('Login', {
			url: '/Login',
			templateUrl: '/views/user_login.html'
		})
		.state('Home', {
			url: '/Home',
			templateUrl: '/views/home_page.html'
		})
		.state('Business', {
			url: '/Business/:res',
			templateUrl: '/views/business_page.html'
		})
		.state('Discovery', {
			url: '/Discovery',
			templateUrl: '/views/discovery_page.html'
		})
		.state('MyPost', {
			url: '/MyPost',
			templateUrl: '/views/mypost_page.html'
		})
		.state('Profile', {
			url: '/Profile',
			templateUrl: '/views/profile_page.html'
		})
		.state('TakePhoto', {
			url: '/TakePhoto/:search',
			templateUrl: '/views/takephoto_page.html'
		})
		.state('CategoryResults', {
			url: '/CategoryResults/:search',
			templateUrl: '/views/CategoryResults_page.html'
		})
		.state('PasswordReset', {
			url: '/PasswordReset?code&token',
			templateUrl: '/views/passwordreset_page.html'
		})
		.state('AddCommentModal', {
			url: '/AddCommentModal',
			templateUrl: '/views/AddCommentModal.html'
		})
		.state('ChangePhotoModal', {
			url: '/ChangePhotoModal',
			templateUrl: '/views/changephoto.html'
		})
		.state('DummyComment', {
			url: '/DummyComment',
			templateUrl: '/views/DummyCommentGet.html'
		})
		.state("Token", {
			url: "/Token/:token",
			templateUrl: "views/token.html",
			controller: "TokenController",
			resolve: {
				token: ["$stateParams", function ($stateParams) {
					return $stateParams.token;
				}]
			}});
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyBxyZmdIb_nrx9U2AbXXNbAIGXH_ev3X78',
			v: '3.17',
			libraries: 'places,weather,geometry,visualization'
		});

		$urlRouterProvider.otherwise('/');
	}

	auth.$inject = ['$rootScope', '$location', '$state', 'UserFactory'];
	function auth($rootScope, $location, $state, UserFactory) {
		var userInfo = UserFactory.status;
		$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
			if(!userInfo.isLoggedIn) {
				var welcome = toState.name === "Welcome";
				var token = toState.name === "Token";
				var passwordReset = toState.name === "PasswordReset";
				if(welcome || token || passwordReset) {
					return;
				}
				e.preventDefault();
				$state.go('Welcome');
			}
		});
	}
})();
