'use strict';

// Nav Bar Controller
// -Encapsulates functionality for both Search and Cart
angular.module('jsHomeworkApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, AwsAPI, snapRemote) {
    
    //Init Cart
    $rootScope.cart = {qty: 0, total: 0, items: []};

    //Snap Cart Directive
    $rootScope.snapopts = {minPosition: -400};
    $scope.drawer = false;

    snapRemote.getSnapper().then(function(snapper) {
      snapper.on('open', function() {
        $scope.drawer = true;
      });
      
      snapper.on('close', function() {
        $scope.drawer = false;
      });
    });

    //Init Cart Add Function (global for cheap access)
    $rootScope.addToCart = function(item) {
      $rootScope.cart.qty++;
      $rootScope.cart.total += item.price;
      $rootScope.cart.items.push(item);
    };

    $rootScope.removeItem = function(itemId) {

      var newList = [];

      angular.forEach($rootScope.cart.items, function(item, index) {
        if(itemId === item.id) {
          $rootScope.cart.qty--;
          $rootScope.cart.total -= item.price;
        }
        else {
          newList.push(item);
        }
      });

      $rootScope.cart.items = newList;
    }

    $scope.checkSubmit = function(ev) {
      //Trap Enter Key
      if(ev.keyCode === 13) {
        //Clear Results
        $rootScope.results = {};
        //Send Search
        AwsAPI.search({term: $scope.searchTerm}, function(data) {
          $rootScope.results = data;
        });
      }
    };
  });
