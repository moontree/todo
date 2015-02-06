
var module = angular.module("todoMod",[]);
AV.initialize("nuawbie41n6fui9uldtcx5qutz867y172835iba97pou53cm", "eaok8k2b8toihv8lvszfue0yftn39zhu1os94o0i31owlhzt");
module.controller('TodoController', ['$scope', function($scope) {	
	$scope.todos = [];
	$scope.newTodo = {text:"default", done: false};
	$scope.addTodo = function () {
		var Todo = AV.Object.extend("Todo");
		var todo = new Todo();
		todo.set("text",$scope.newTodo.text);
		todo.set("done",$scope.newTodo.done);
		todo.save(null, {
			success: function(result){
				$scope.$apply(function(){
					$scope.todos.push(todo.toJSON());
					$scope.newTodo = {text:"default", done: false};
				});
			}
		});
	};
	$scope.getTodos = function() {
	  	var Todo = AV.Object.extend("Todo");
	  	var query = new AV.Query(Todo);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.todos = JSON.parse(JSON.stringify(results));;
	  			})
	  		}
	  	})
	};
	$scope.updateTodoState = function(todoParam) {
	  	var Todo = AV.Object.extend("Todo");
	  	var todo = new Todo();
	  	todo.set("objectId",todoParam.objectId);
	  	todo.set("done",todoParam.done);
	  	todo.save(null, {
	  		success: function(result){
	  		}
	  	});
	};

    $scope.getTodos();
}]);
