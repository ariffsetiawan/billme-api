var app = angular.module('billMe', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
}]);

app.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.title = 'Hello BillMe API.';
}]);


