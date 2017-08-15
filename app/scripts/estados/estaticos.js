app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('faq', {
    url: '/faq',
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
        templateUrl: 'views/estaticos/faq.html',
      }

    }
   })

   .state('reglas', {
     url: '/reglas',
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
         templateUrl: 'views/estaticos/reglas.html',
       }
     }
     });

      $urlRouterProvider.otherwise('/')
    });
