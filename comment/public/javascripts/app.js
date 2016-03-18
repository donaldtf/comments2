angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope, $http){
    $scope.test = 'Hello world!';

    $scope.comments = [];
    $scope.addComment = function() {
	if($scope.formContent === '') { return; }
          console.log("In addComment with "+$scope.formContent);
         $scope.create({
          title: $scope.formContent,
          upvotes: 0,
         });
      $scope.formContent = '';
    };

    $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

    $scope.decrementUpvotes = function(comment) {
      $scope.downvote(comment);
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };

    $scope.downvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/downvote')
        .success(function(data){
          console.log("downvote worked");
          comment.upvotes -= 1;
	  if (comment.upvotes < 0) {

            comment.upvotes = 0;
          }
        });
    };

 $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
  };

  $scope.removeComment = function(comment) {
    return $http.delete('/comments/' + comment._id + '/delete').success(function(data){
      var index = $scope.comments.indexOf(comment);
      if (index > -1) {
         $scope.comments.splice(index, 1);
      }
    });
  };

    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
	console.log(data);
      angular.copy(data, $scope.comments);
    });
    };
    $scope.getAll();
  }
]);
