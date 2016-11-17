angular.module('module.dashboard')
    .factory('clientFactory', clientFactory);

clientFactory.$inject = ['$http'];

function clientFactory($http) {
    return {
        //CREATE NEW USERS
        createUser: function(newUser) {
            console.log(newUser);
            return $http.post('/register', newUser);
        }
        getAPIData: function(){
          return $http.get('/api/client/exhibit).then(function(success){
            console.log('API is working', success);
          },  function(error){
            console.log('error on API', error);
          }))
        }
}
