'use strict';

/* Directives */

// Item Directive
angular.module('jsHomeworkApp.directives', []).
  directive('cartButton', function () {
  return {
      restrict: 'E',
      transclude: true,
      scope: {title: '@', price: '@', listid: '@', imgurl: '@'},
      controller: function($scope, $rootScope, $element) {
 
        //Init Show Flag
        $scope.showAddToCart = false;

        //Button Hover Toggle
        $scope.mouseEnter = function() {
          $scope.showAddToCart = true;
        };
        $scope.mouseLeave = function() {
          $scope.showAddToCart = false;
        };

        //Local Add to Cart Function
        $scope.addToCart = function() {
          $rootScope.addToCart({title: $scope.title,
                                price: parseFloat($scope.price),
                                id: $scope.listid,
                                image: $scope.imgurl});
        };
      },
      template:
        '<div class="add-to-cart" ng-mouseenter="mouseEnter()" ng-mouseleave="mouseLeave()">' +
          '<div ng-transclude></div>' +
          '<div class="cart-button" ng-show="showAddToCart">' +
            '<div class="cart-overlay"></div>'+
            '<a href class="overlay-content" ng-click="addToCart()">' +
              '<img src="images/shopping-cart-icon-white.png" />' +
              '<span>Add To Cart</span>' +
            '</a>' +
          '</div>' +
        '</div>',
      replace: true
    };
});




