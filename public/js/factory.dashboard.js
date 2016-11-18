angular.module('module.dashboard')
    .factory('clientFactory', clientFactory);

clientFactory.$inject = ['$http'];

function clientFactory($http) {
    return {
        //CREATE NEW USERS
        getUser: function() {
            var user;
            return  $http.get('/whoami');
        },
        getExhibit: function(){
            return $http.get('/api/client/exhibit');
        },
        getObject: function(){
            return $http.get('/api/client/object');
        },
    }
}
