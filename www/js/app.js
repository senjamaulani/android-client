/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...
var app = angular.module('MyApp',['ngCordova']);

//var app = angular.module('MyApp',['ngCordova'])
 
app.controller('MyCtrl', function($scope, $cordovaBarcodeScanner, $filter, $window) {
$scope.ver = false;
    
$scope.scanner = function(){
$scope.ver = false;
  document.addEventListener("deviceready", function () {
    $cordovaBarcodeScanner.scan().then(function(barcodeData){
     var limite = $filter('limitTo')(barcodeData.text, 4);
        
        if(limite === "http" || limite === "HTTP"){
        $window.open(barcodeData.text,'_system');
        $scope.ver = false;  
        }else{
        $scope.tj = barcodeData;
        $scope.ver = true;
        }
      }, function(error) {
        $scope.ver = false; 
      });
 
 
  }, false);
  
  }  
  $scope.scanner();
 
});