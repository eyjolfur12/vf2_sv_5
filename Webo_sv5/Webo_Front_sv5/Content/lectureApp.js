var lectureApp = {};
var app = angular.module('lectureApp', ['ngResource']);

/*** Services ***/

app.factory('CourseModel', ['$resource', '$routeParams', function ($resource, $routeParams) {
    console.log("kallar");
    var resource = $resource('/api/course/:id', { id: '@id' }, {
        query: { method: 'GET', isArray: true },
        get: { method: 'GET' },
        save: { method: 'PUT', params: { id: $routeParams.rid } },
        create: { method: 'POST' },
        delete: { method: 'DELETE' }
    }
	);
    return resource;

}]);

app.factory('VideoModel', ['$resource', '$routeParams', function ($resource, $routeParams) {
    console.log("kallar");
    var resource = $resource('/api/video/:id', { id: '@id' }, {
        query: { method: 'GET', isArray: true },
        get: { method: 'GET' },
        save: { method: 'PUT', params: { id: $routeParams.rid } },
        create: { method: 'POST' },
        delete: { method: 'DELETE' }
    }
	);
    return resource;

}]);






/*** Controllers ***/

app.controller("coursesCtrl", ['$scope', '$http', '$route', 'CourseModel', function ($scope, $http, $route, CourseModel) {

    $scope.message = 'Available courses';
    $scope.courses = CourseModel.query();
    $scope.newCourse = '';
    $scope.addCourse = function () {
        CourseModel.create({Name : $scope.newCourse, Teacher: 2});
    };
}]);

app.controller("courseCtrl", ['$scope', '$http', '$routeParams', 'VideoModel', function ($scope, $http, $routeParams, VideoModel) {

    $scope.message = 'Enter or create a chat room';
    $scope.courses = VideoModel.get({ id: $routeParams.id });
    $scope.newVideo = '';
    $scope.addVideo = function () {
        VideoModel.create({ Name: $scope.newCourse, Teacher: 2 });
    };
}]);




/*** Routing ***/

app.config(['$routeProvider', function ($route) {

    $route.when('/', {
        templateUrl: '/content/templates/courses.html',
        controller: app.coursesCtrl
    });

    $route.when('/course/:id', {
        templateUrl: 'templates/course.html',
        controller: app.courseCtrl
    });


}]);


