(function () {
    'use strict';
    angular.module('app', ['ui.router']).config(Config);
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('Home', {
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

(function () {
    'use strict';
    angular.module('app').controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;
        vm.title = 'Welcome to our App!';
    }
})();
(function () {
    'use strict';
    angular.module('app').factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = ['$http', '$q'];

    function HomeFactory($http, $q) {
        var o = {};

        return o;
    }
})();
(function () {
    'use strict';
    angular.module('app').factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q'];

    function UserFactory($http, $q) {
        var o = {};
        o.status = {};
        if (getToken()) {
            o.status.isLoggedIn = true;
            o.status.username = getUsername();
        }
        o.setToken = setToken;
        o.getToken = getToken;
        o.removeToken = removeToken;
        o.register = register;
        o.login = login;
        o.logout = logout;
        return o;

        function register(user) {
            var q = $q.defer();
            $http.post('/api/Users/Register', user).success(function (res) {
                setToken(res.token);
                o.status.isLoggedIn = true;
                q.resolve();
            });
            return q.promise;
        }

        function login(user) {
            var u = {
                username: user.username.toLowerCase(),
                password: user.password
            };
            var q = $q.defer();
            $http.post('/api/Users/Login', u).success(function (res) {
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

(function () {
    'use strict';
    angular.module('app').controller('NavbarController', NavbarController);

    NavbarController.$inject = ['UserFactory', '$state'];

    function NavbarController(UserFactory, $state) {
        var vm = this;
        vm.user = {};
        vm.status = UserFactory.status;
        vm.register = register;
        vm.login = login;
        vm.logout = UserFactory.logout;


        function register() {
            var u = vm.user;
            if (!u.username || !u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
                return false;
            }
            UserFactory.register(u).then(function () {
                $state.go('Home');
            });
        }

        function login() {
            UserFactory.login(vm.user).then(function () {
                $state.go('Home');
            });
        }
    }
})();