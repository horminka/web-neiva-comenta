app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   .state('showTopic', {
     url: '/topics/:topicId',
     views: {
       'navegacion': {
         templateUrl: 'views/navegacion.html',
         controller: ['$scope', 'Board',
           function($scope, Board){

             // Inicia Objetos
             $scope.esperando = true;
             $scope.boards = [];

             // Carga Boards
             Board.$search().$asPromise().then(function(_boards) {
               $scope.boards = _boards;
               $scope.esperando = false;
             })

           }]
        },
        'contenido': {
           templateUrl: 'views/topics/ver.html',
           controller: [ '$scope', '$stateParams', '$window', 'Topic',
             function($scope, $stateParams, $window, Topic) {
              // Inicia Objetos
              $scope.esperando = true;
              $scope.topic = {};

              $scope.width = $window.innerWidth;
              $scope.height = $window.innerHeight;

              $window.onresize = function () {
                $scope.updateWidth();
                $scope.updateHeight();
                $scope.$apply();
              };

              $scope.updateWidth = function() {
                $scope.width = $window.innerWidth;
              };
              $scope.updateHeight = function() {
                $scope.height = $window.innerHeight;
              };

              // Carga Topic
              Topic.$find($stateParams.topicId).$asPromise().then(function(_topic) {
                $scope.topic = _topic;
                $scope.esperando = false;
              })
             }
           ]
        }
     }
   })

   .state('newTopic', {
     url: '/nuevoTopic/:boardId',
     views: {
       'navegacion': {
         templateUrl: 'views/navegacion.html',
         controller: ['$scope', 'Board',
           function($scope, Board){
             // Inicia Objetos
             $scope.esperando = true;
             $scope.boards = [];

             // Carga Boards
             Board.$search().$asPromise().then(function(_boards) {
               $scope.boards = _boards;
               $scope.esperando = false;
             })

           }]
        },
       'contenido': {
          templateUrl: 'views/topics/nuevo.html',
          controller: [ '$scope', '$stateParams', '$http', '$window', '$q', '$state', 'Topic', 'imgur',
            function($scope, $stateParams, $http, $window, $q, $state, Topic, imgur) {
              $scope.boardId = $stateParams.boardId;
              $scope.nuevoTopic = Topic.$build();
              $scope.nuevoTopic.boardId = $scope.boardId;

              $scope.submit = function() {
                var deferred = $q.defer()
                imgur.setAPIKey('Client-ID 54b31582e98cdfa');

                imgur.upload($scope.nuevoTopic.image).then(function then(model) {
                  $scope.nuevoTopic.image = model.link;
                  guardar();
                });

                function guardar() {
                  $scope.nuevoTopic.$save().$asPromise().then(
                    function(_e) {
                      deferred.resolve(_e)
                      console.log("topic creado");
                      //swal("¡Topic creado con éxito!", "Se creó el topic " + $scope.nuevoTopic.title, "success")
                      swal({
                        title: "¡Topic creado con éxito!",
                        text: "Se creó el topic " + $scope.nuevoTopic.title,
                        type: "success",
                        showCancelButton: false,
                        //confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: true,
                        html: false
                      }, function(){
                        $state.go('showBoard', { boardId: $scope.nuevoTopic.boardId });
                      });
                    },
                    function(_e) {
                      deferred.reject(_e)
                      console.log("topic NO creado");
                      swal("No se pudo crear el topic " + $scope.nuevoTopic.title, JSON.stringify(_e.$response.data), "error")
                    })
                }

                return deferred.promise
               }
             }
           ]
        }
     }
   })

})
