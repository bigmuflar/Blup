angular.module('module.auth', []) // declaring an angular module
    .controller('module.regverify.controller', Reg); // chaining a controller

Auth.$inject = ['$http']; // injecting the $http service

function Reg($http) { // auth controller constructor function
    
}
