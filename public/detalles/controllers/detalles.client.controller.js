// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'articles' --> Que llama a los servicios Articles
angular.module('detalles').controller('DetallesController', 
    ['$scope', '$rootScope', '$routeParams', '$location', 'Authentication', 'Detalles',
    function($scope, $rootScope, $routeParams, $location, Authentication, Detalles) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        $scope.detalles=[];

 // Crear un nuevo método controller para crear nuevos articles
        $scope.createDetalle = function() {
            // Usar los campos form para crear un nuevo objeto $resource detalle
            var detalle = new Detalles.ID({
                idboleta: $rootScope.idboleta,
                idproducto: this.idproducto,
                descripcionproducto: this.descripcionproducto,
                precioproducto: this.precioproducto,
                cantidadproducto: this.cantidadproducto,
                descuentoproducto: this.descuentoproducto,
                preciofinal: (this.precioproducto * this.cantidadproducto) - this.descuentoproducto
            });

            // Usar el método '$save' de detalle para enviar una petición POST apropiada
            detalle.$save(function(response) {

               $scope.detalles = Detalles.ForNum.get({idboleta: $rootScope.idboleta });

                // Si un artículo fue creado de modo correcto, redireccionar al usuario a la página del artículo 
                console.log(response.idboleta);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de artículos

        $scope.findDetalles = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.detalles = Detalles.query();
            console.log($scope.detalles);
  
        };



        $scope.getParcial=function(){
            $rootScope.parcial = 0;
            for(var i = 0; i < $scope.detalles.length; i++){
            var detalle = $scope.detalles[i];
            $rootScope.parcial += (detalle.precioproducto * detalle.cantidadproducto);
            }
            return $rootScope.parcial;

        };


        $scope.getDescuentos=function(){
            $rootScope.desc = 0;
            for(var i = 0; i < $scope.detalles.length; i++){
            var detalle = $scope.detalles[i];
            $rootScope.desc += (detalle.descuentoproducto);
            }
            return $rootScope.desc;

        };


        $scope.getTotal=function(){
            $rootScope.total=0;
            for(var i = 0; i < $scope.detalles.length; i++){
            var detalle = $scope.detalles[i];
            $rootScope.total += (detalle.preciofinal);
            }
            return $rootScope.total;
                    
        }

        // Crear un nuevo método controller para recuperar un unico artículo


       /* $scope.findOneArticle = function() {
            // Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.article = Articles.get({
                articleId: $routeParams.articleId
            });
        };
*/


 // Crear un nuevo método controller para actualizar un único article


      /*  $scope.updateArticle = function() {
            // Usar el método '$update' de article para enviar una petición PUT apropiada
            $scope.article.$update(function() {
                // Si un article fue actualizado de modo correcto, redirigir el user a la página del article 
                $location.path('articles/' + $scope.article._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };
*/


// Crear un nuevo método controller para borrar un único artículo
   /*     $scope.deleteArticle = function(article) {
            // Si un artículo fue enviado al método, borrarlo
            if (article) {
                // Usar el método '$remove' del artículo para borrar el artículo
                article.$remove(function() {
                    // Eliminar el artículo de la lista de artículos
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de article para borrar el article
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };*/

    }
]);