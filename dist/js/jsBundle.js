(function () {
    'use strict';
    angular.module('app', ['ui.router']).config(Config);
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('Welcome', {
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
        });
        $urlRouterProvider.otherwise('/');
    }
})();


(function () {
    'use strict';
    angular.module('app').controller('BusinessController', BusinessController);

    BusinessController.$inject = ['HomeFactory'];

    function BusinessController(HomeFactory) {
        var vm = this;

    }
})();
(function () {
    'use strict';
    angular.module('app').controller('HomeController', HomeController);

    HomeController.$inject = ['HomeFactory', 'UserFactory'];

    function HomeController(HomeFactory, UserFactory) {
        var vm = this;

        vm.upload = function () {
            HomeFactory.upload();
        };
    }
})();

(function () {
    'use strict';
    angular.module('app').controller('ModalController', ModalController);

    ModalController.$inject = ['UserFactory'];

    function ModalController(UserFactory) {
        var vm = this;
    }
})();
(function () {
    'use strict';
    angular.module('app').controller('MyPostController', MyPostController);

    MyPostController.$inject = ['HomeFactory'];

    function MyPostController(HomeFactory) {
        var vm = this;
    }
})();
(function () {
    'use strict';
    angular.module('app').controller('NavbarController', NavbarController);

    NavbarController.$inject = ['UserFactory', '$state', '$scope', '$anchorScroll', '$location'];

    function NavbarController(UserFactory, $state, $scope, $anchorScroll, $location) {
        var vm = this;
        vm.user = {};
        vm.status = UserFactory.status;
        vm.register = register;
        vm.login = login;
        vm.facebook = facebook;
        vm.logout = UserFactory.logout;


        function register() {
            var u = vm.user;
            if (!u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
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

        function facebook() {
            UserFactory.facebook().then(function () {
                $state.go('Home');
            });
        }

        vm.scrollTo = function (id) {
            $location.hash(id);
            console.log($location.hash());
            $anchorScroll();
        };

    }
})();

(function () {
    'use strict';
    angular.module('app').controller('SearchController', SearchController);

    SearchController.$inject = ['HomeFactory'];

    function SearchController(HomeFactory) {
        var vm = this;
    }
})();
(function () {
    'use strict';
    angular.module('app').factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = ['$http', '$q'];

    function HomeFactory($http, $q) {
        var o = {};
        o.upload = upload;
        return o;

        function upload() {
            $http.post('/api/Photos/upload');
        }
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
            o.status.first_name = getFirstname();
            o.status.last_name = getLastname();
            o.status.image = getImage();
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
            $http.post('/api/Users/Register', user).success(function (res) {
                setToken(res.token);
                o.status.isLoggedIn = true;
                q.resolve();
            });
            return q.promise;
        }

        function login(user) {
            var u = {
                email: user.email.toLowerCase(),
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

        function facebook() {
            var q = $q.defer();
            $http.get('/api/Facebook/auth/facebook').success(function (res) {
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
            o.status.first_name = getFirstname();
            o.status.last_name = getLastname();
            o.status.image = getImage();
        }

        function getToken() {
            return localStorage.token;
        }

        function removeToken() {
            localStorage.removeItem('token');
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
    }
})();