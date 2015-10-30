/**
 * Created by PraveenGangasani on 10/30/15.
 */

var pollingApp = angular.module('pollingApp', ['ngRoute']);

pollingApp.controller('IndexController', function() {
        var vm = this;
        vm.appName = 'Polling App';
        vm.description= 'Lets you create your own polls.';

    });
pollingApp.controller('SignUpController', function($http, $location) {

    var signUp = this;
    console.log('Request is in SignupController');

    signUp.user = {};
    signUp.message = 'Request is in SignupController';

    signUp.submit = function() {
        console.log(signUp.user);

        $http.post('api/users', signUp.user)
            .success(function(data) {
                console.log("POST Response: " + data.message);
                signUp.message = data.message;
                $location.path('/polls');
        });

        signUp.user = {};
    };

    });

pollingApp.controller('PollsController', function($http, $location) {

    var vm = this;
    console.log('Request is in PollsController');

    vm.polls = {};
    vm.message = vm.user._id;

    $http.get('api/users/' + vm.user._id + '/polls')
        .then(function(data) {
           vm.polls = data;
        });

})

pollingApp.config(function($routeProvider) {

            $routeProvider
                .when('/polls', {
                    templateUrl : '/list_poll.html',
                    controller : 'PollsController',
                    controllerAs : 'pollsCtrl'
                })
                .when('/signUp', {
                    templateUrl : '/signUp.html',
                    controller : 'SignUpController',
                    controllerAs : 'signUpCtrl'
                })
                .when('/home', {
                    templateUrl : '/home.html',
                    controller : 'IndexController',
                    controllerAs : 'indexCtrl'
                });
        });

pollingApp.directive('footer', function() {
       return {
           restrict : 'A',
           replace : true,
           templateUrl : '/footer.html'
       }
    });

pollingApp.directive('header', function() {
        return {
            restrict : 'A',
            replace : true,
            templateUrl : '/header.html'
        }
    });