var lectureApp = {};
var app = angular.module('lectureApp', ['ngResource']);

/*** Services ***/

app.factory('CourseModel', ['$resource', '$routeParams', function ($resource, $routeParams) {
    console.log("kallar");
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






/*** Controllers ***/

app.controller("coursesCtrl", ['$scope', '$route', 'CourseModel', function ($scope, $route, CourseModel) {

    $scope.message = 'Available courses';
    $scope.courses = CourseModel.query();
console.log($scope.courses);
    $scope.newCourse = '';
    $scope.addCourse = function () {
        CourseModel.create({Name : $scope.newCourse, Teacher: 2});
    };
}]);

app.controller("courseCtrl", ['$scope', '$routeParams', 'CourseModel', function ($scope, $routeParams, CourseModel) {

    $scope.message = 'Course: ';
    //$scope.course = CourseModel.get({ id: $routeParams.id });
    CourseModel.get({ id: $routeParams.id },
    function (data) {
        $scope.name = data.Name;
        $scope.videos = data.Videos;
    });

    $scope.newVideo = '';
    $scope.addVideo = function () {
        VideoModel.create({ Name: $scope.newVideo, Teacher: 2 });
    };
}]);

app.controller("videoCtrl", ['$scope', '$routeParams', 'VideoModel', function ($scope, $routeParams, VideoModel) {

    $scope.message = 'Lecture: ';
    //$scope.course = CourseModel.get({ id: $routeParams.id });
    VideoModel.get({ id: $routeParams.id },
    function (data) {
        $scope.name = data.Name;
        $scope.description = data.Description;
        $scope.link = data.Link;
        $scope.comments = data.Comments;
    });

    $scope.newComment = '';
    $scope.addComment = function () {
        VideoComment.create({ Name: $scope.newComment, Teacher: 2 });
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


}]);


