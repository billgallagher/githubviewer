
var app = angular.module('GithubProfile', []);

var GithubController = function($scope, $http) {

  var onGetUserData = function(response) {
    $scope.user = response.data;
    $http.get($scope.user.repos_url)
      .then(onRepos, onError);
  };

  var onRepos = function(response) {
    $scope.repos = response.data;
  };

  var onError = function(reason) {
    $scope.error = 'Could not get user data';
  };

  $scope.search = function(username) {
    if (username) {
      $http.get('https://api.github.com/users/' + username)
        .then(onGetUserData, onError);
    }
  };


  $scope.apptitle = 'GitHub Viewer';
  $scope.username = 'angular';
  $scope.repoSortOrder = '-stargazers_count';

};

app.controller('GithubController', [$scope, $http, GithubController]);