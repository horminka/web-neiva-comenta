app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('indexBoards', {
    url: '/',
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
        templateUrl: 'views/boards/index.html',
        controller: ['$scope', '$window', 'Board',
          function($scope, $window, Board) {

            // Inicia Objetos
            $scope.esperando = true;
            $scope.boards = [];
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

            // Carga Boards
            Board.$search().$asPromise().then(function(_boards) {
              $scope.boards = _boards;
              $scope.esperando = false;
            });

          }
         ]
      }

    }
   })

   .state('showBoard', {
     url: '/boards/:boardId',
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
         templateUrl: 'views/boards/ver.html',
         controller: [ '$scope', '$stateParams', '$window', '$uibModal', 'Board',
           function($scope, $stateParams, $window, $uibModal, Board) {
            // Inicia Objetos
            $scope.esperando = true;
            $scope.board = {};
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

            // Carga Board
            Board.$find($stateParams.boardId).$asPromise().then(function(_board) {
              $scope.board = _board;
              $scope.esperando = false;
            })

            // Crear Topic
            $scope.crearTopic = function() {

              var modalCrearTopic = $uibModal.open({
                animation: true,
                templateUrl: 'views/topics/nuevo.html',
                controller: ['$scope', '$uibModalInstance', '$q', '$http', '$base64', 'Topic',
                  function($scope, $uibModalInstance, $q, $http, $base64, Topic) {
                    $scope.nuevoTopic = Topic.$build()

                    $scope.submit = function() {
                      console.log($scope.nuevoTopic.image);

                      var req = {
                       method: 'POST',
                       url: 'https://api.imgur.com/3/image',
                       headers: {
                         //'Accept': 'application/json',
                         'Authorization': 'Client-ID 54b31582e98cdfa',
                       },
                       //data: { image: 'http://www.horminka.org/img/logo.jpg' }
                       data: { image: $scope.nuevoTopic.image }
                      }

                      $http(req).then(function(response){
                          console.log('ok')
                          console.log(response)
                      }, function(response){
                          console.log('falló')
                          console.log(response)
                      });
                        //var deferred = $q.defer()
                        //if ($scope.nuevaEmpresa.imagen && $scope.nuevaEmpresa.imagen.size) {
                          //utils.subirArchivoCloudinary($scope.nuevaEmpresa.imagen, 'empresas').then(
                            //function(response) {
                              //$scope.nuevaEmpresa.imagen = response.public_id
                              //$uibModalInstance.close($scope.nuevaEmpresa)
                              //guardar()
                            //},
                            //function(response) {
                              //$scope.nuevaEmpresa.imagen = "empresas/empresa"
                              //guardar()
                              //$uibModalInstance.close($scope.nuevaEmpresa)
                            //}
                          //)
                        //}

                        //function guardar() {
                          //$scope.nuevaEmpresa.$save().$asPromise().then(
                            //function(_e) {
                              //deferred.resolve(_e)
                              //swal("¡Empresa creada!", "Se creó la empresa " + $scope.nuevaEmpresa.nombre, "success")
                            //},
                            //function(_e) {
                              //deferred.reject(_e)
                              //swal("No se pudo crear la empresa " + $scope.nuevaEmpresa.nombre, JSON.stringify(_e.$response.data), "error")
                            //})
                        //}

                        //return deferred.promise
                      }

                      $scope.cancelar = function() {
                        $uibModalInstance.dismiss('cancel')
                      }
                    }]
                })
              }
             }
           ]
           }
         }
       });

      $urlRouterProvider.otherwise('/')
    });
