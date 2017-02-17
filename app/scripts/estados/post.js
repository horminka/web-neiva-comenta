app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   .state('newPost', {
     url: '/nuevoPost/:topicId',
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
          templateUrl: 'views/posts/nuevo.html',
          controller: [ '$scope', '$stateParams', '$http', '$window', '$q', '$state', 'Post', 'imgur',
            function($scope, $stateParams, $http, $window, $q, $state, Post, imgur) {
              $scope.topicId = $stateParams.topicId;
              $scope.nuevoPost = Post.$build();
              $scope.nuevoPost.topicId = $scope.topicId;

              $scope.submit = function() {
                var deferred = $q.defer()

                if ($scope.nuevoPost.image && $scope.nuevoPost.image.size) {
                  imgur.setAPIKey('Client-ID 54b31582e98cdfa');

                  imgur.upload($scope.nuevoPost.image).then(function then(model) {
                    $scope.nuevoPost.image = model.link;
                    guardar();
                  });
                } else {
                  $scope.nuevoPost.image = "no-imagen";
                  guardar();
                }


                function guardar() {
                  $scope.nuevoPost.$save().$asPromise().then(
                    function(_e) {
                      deferred.resolve(_e)
                      swal({
                        title: "¡Post creado con éxito!",
                        //text: "Se creó el post",
                        type: "success",
                        showCancelButton: false,
                        //confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: true,
                        html: false
                      }, function(){
                        $state.go('showTopic', { topicId: $scope.nuevoPost.topicId });
                      });
                    },
                    function(_e) {
                      deferred.reject(_e)
                      console.log("post NO creado");
                      swal("No se pudo crear el post ", JSON.stringify(_e.$response.data), "error")
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
