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

    signUp.facebook = function() {
        console.log(signUp.user);

        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    console.log(response);
                    signUp.user.fullname = response.name;
                    $location.path('/polls');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
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