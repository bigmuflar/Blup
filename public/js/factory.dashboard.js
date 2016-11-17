angular.module('module.dashboard')
    .factory('clientFactory', clientFactory);

clientFactory.$inject = ['$http'];

function clientFactory($http) {
    return {
        //CREATE NEW USERS
        getUser: function() {
            console.log("getting me");
            return $http.get('/api/me');
        },
        getExhibit: function(){
            return $http.get('/api/client/exhibit');
        },
        getObject: function(){
            return $http.get('/api/client/object');
        },


    }
}
