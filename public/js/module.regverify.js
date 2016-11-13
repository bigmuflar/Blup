angular.module('module.auth', []) // declaring an angular module
    .controller('module.formcheck.controller', Form); // chaining a controller

Auth.$inject = ['$http']; // injecting the $http service

function Form($http) { // auth controller constructor function
    var check = this;
    this.age = function(){
      for(var i = 0;i<=120;)
    }
}
