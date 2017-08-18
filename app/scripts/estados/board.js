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
                         'Authorization': 'Client-ID 54b31582e98cdfa',
                       },
                       data: { image: $scope.nuevoTopic.image }
                      }

                      $http(req).then(function(response){
                          console.log('ok')
                          console.log(response)
                      }, function(response){
                          console.log('falló')
                          console.log(response)
                      });
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
