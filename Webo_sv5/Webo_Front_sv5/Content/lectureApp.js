var lectureApp = {};
var app = angular.module('lectureApp', ['ngResource']);

/*** Services ***/

app.factory('utThumb', ['$http', function ($http) {  
    var req = function (utid) {
        var ret = $http.jsonp('https://gdata.youtube.com/feeds/api/videos/' + utid + '?v=2&alt=json-in-script&callback=JSON_CALLBACK')
                        .success(function (data) { })
                        .error(function (data, status, headers, config) { return "Error retrieving data from YouTupe Data API" })
                        .then(function (response) {
                        return response.data.entry.media$group.media$thumbnail[0].url;
                    });
        return ret;
    }

    return req;
}]);


app.factory('isTeacher', ['$http', function ($http) {
    var req = $http.get('/account/rolecheck').success(function (data) {
        return data;
    });
    return req;
}]);


/*** Models ***/

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
        if ($scope.newCourse) {
            CourseModel.create({ Name: $scope.newCourse },
            function (data) {
                $scope.newCourse = '';
                $scope.courses.push(data);
                $scope.error = "";
            });
        }
        else {
            $scope.error = "Please enter a name for the course";

        }
    };
}]);

app.controller("courseCtrl", ['$scope', '$routeParams', 'CourseModel', 'VideoModel','isTeacher','utThumb', function ($scope, $routeParams, CourseModel, VideoModel,isTeacher,utThumb) {

    $scope.message = 'Course: ';
    CourseModel.get({ id: $routeParams.id },
    function (data) {
        $scope.name = data.Name;
        $scope.videos = data.Videos;

        for (var v in $scope.videos) {
            $scope.videos[v].thumb = utThumb($scope.videos[v].Link);
            console.log(v)
        }
    });
    $scope.role = isTeacher;




    $scope.newVideo = {};
    $scope.addVideo = function () {
        if (!($scope.newVideo.name)) {
            $scope.nameError = "Please enter a name";
        }
        else { $scope.nameError = ""; }

        if (!($scope.newVideo.link)) {
            $scope.linkError = "Please enter a link";
        }
        else{ $scope.linkError = "";}

        
        if( $scope.newVideo.name && $scope.newVideo.link){
            VideoModel.create({ CourseId: $routeParams.id, Name: $scope.newVideo.name, Link: $scope.newVideo.link, Desciption: $scope.newVideo.description },
            function (data) {
                $scope.newVideo = {};
                $scope.videos.push(data);

            });
        }
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
        onYouTubeIframeAPIReady(data.Link); // kalla i player og setja videoid til að spila
    });

    $scope.newComment = "";
    $scope.addComment = function () {
        if ($scope.newComment) {
            CommentModel.create({ VideoId: $routeParams.id, CommentText: $scope.newComment },
            function (data) {
                $scope.newComment = ""; 
                $scope.comments.push(data);
                $scope.commentError = "";
                
            });
        }
        else {
            $scope.commentError = "Empty comments are not allowed";
        }
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
