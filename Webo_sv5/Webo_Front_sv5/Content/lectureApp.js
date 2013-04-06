
﻿var lectureApp = {};
var app = angular.module('lectureApp', ['ngResource']);

/*** Services ***/


app.factory('isTeacher', ['$http', function ($http) {
    
    
    var req = $http.get('/account/rolecheck').success(function (data) {
            var isit = "";
 console.log(data);
 isit = data;
 return isit;
 
        });

    return req;

    

    //return function(a, b) { return a + b;};
}]);


app.factory('CourseModel', ['$resource', '$routeParams', function ($resource, $routeParams) {

    var resource = $resource('/api/course/:id', { id: '@id' }, {
        query: { method: 'GET', isArray: true },
        get: { method: 'GET',  isArray: false },
        save: { method: 'PUT', params: { id: $routeParams.rid } },
        create: { method: 'POST' },
        delete: { method: 'DELETE' }
    }
	);
    return resource;

}]);

app.factory('VideoModel', ['$resource', '$routeParams', function ($resource, $routeParams) {

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

app.factory('CommentModel', ['$resource', '$routeParams', function ($resource, $routeParams) {

    var resource = $resource('/api/comment/:id', { id: '@id' }, {
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

app.controller("coursesCtrl", ['$scope', '$route', 'CourseModel','isTeacher', function ($scope, $route, CourseModel, isTeacher) {

    $scope.message = 'Available courses';
    $scope.courses = CourseModel.query();
    $scope.role = isTeacher;
    $scope.newCourse = '';
    $scope.addCourse = function () {
        CourseModel.create({ Name: $scope.newCourse},
                function (data) {
                    $scope.newCourse = '';
                    $scope.courses.push(data);
                });
        
    };
}]);

app.controller("courseCtrl", ['$scope', '$routeParams', 'CourseModel', 'VideoModel','isTeacher', function ($scope, $routeParams, CourseModel, VideoModel,isTeacher) {

    $scope.message = 'Course: ';
//$scope.course = CourseModel.get({ id: $routeParams.id });
    CourseModel.get({ id: $routeParams.id },
    function (data) {
        $scope.name = data.Name;
        $scope.videos = data.Videos;
    });
    $scope.role = isTeacher;
    $scope.newVideo = {};
    $scope.addVideo = function () {
//console.log({ CourseId: $routeParams.id, Name: $scope.newVideo.name, Link: $scope.newVideo.link, Description: $scope.newVideo.description });
        VideoModel.create({ CourseId: $routeParams.id, Name: $scope.newVideo.name, Link: $scope.newVideo.link, Description: $scope.newVideo.description },
        function (data) {
            $scope.newVideo = {};
            $scope.videos.push(data);        
        });
    };
}]);

app.controller("videoCtrl", ['$scope', '$routeParams', 'VideoModel', 'CommentModel',function ($scope, $routeParams, VideoModel, CommentModel) {

    $scope.message = 'Lecture: ';
    VideoModel.get({ id: $routeParams.id },
    function (data) {
        $scope.name = data.Name;
        $scope.description = data.Description;
        $scope.link = data.Link;
        $scope.comments = data.Comments;
    });

    $scope.newComment = "";
    $scope.addComment = function () {
        CommentModel.create({ VideoId: $routeParams.id, CommentText: $scope.newComment },
        function (data) {
            $scope.newComment = "";
            $scope.comments.push(data);
        });
    };
}]);




/*** Routing ***/

app.config(['$routeProvider', function ($route) {

    $route.when('/', {
        templateUrl: '/content/templates/courses.html',
        controller: app.coursesCtrl
    });

    $route.when('/course/:id', {
        templateUrl: '/content/templates/course.html',
        controller: app.courseCtrl
    });

    $route.when('/video/:id', {
        templateUrl: '/content/templates/video.html',
        controller: app.videoCtrl
    });

    $route.otherwise({
        redirectTo: '/'
    });


}]);
