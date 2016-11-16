angular.module('module.dashboard')
    .factory('clientFactory', clientFactory);

clientFactory.$inject = ['$http'];

function clientFactory($http) {
    return {
        //CREATE NEW USERS
        createUser: function(newUser) {
            console.log(newUser);
            return $http.post('/register', newUser);
        },
        //GET EXHIBIT INFO
        getExhibit: function($http) {
            return
            $http.get(url: 'https://www.brooklynmuseum.org/api/v2/exhibition/',
                      type: 'GET',
                      beforeSend: function (xhr) {
                        xhr.setRequestHeader('api_key', 'mAeMA3I1J6n3XZTyA1BYL8FWtqmCy86T');
                      },
                      data: {},
                      success: function () {
                        console.log('getInfo Success';
                        kanye.arr = response.data.body;
                      },
                      error: function () { console.log('getInfo ERROR') })
        },
        //GET DECADE INFO
        getDecade: function($http) {
            return
            $http.get(url: 'https://www.brooklynmuseum.org/api/v2/exhibition?limit=10&decade=2000',
                      type: 'GET',
                      beforeSend: function (xhr) {
                        xhr.setRequestHeader('api_key', 'mAeMA3I1J6n3XZTyA1BYL8FWtqmCy86T');
                      },
                      data: {},
                      success: function () {
                        console.log('getInfo Success';
                        kanye.arr = response.data.body;
                      },
                      error: function () { console.log('getInfo ERROR') })
        };
}
