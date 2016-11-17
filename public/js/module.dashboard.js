angular.module('module.dashboard', [])
    .controller('DashboardController', dashboard);

dashboard.$inject = ["clientFactory", '$http'];

function dashboard(clientFactory, $http){
    console.info('Dashboard initialized');
    clientFactory.getAPIData().then(function(success){
      console.log('API is working', success);
    },  function(error){
      console.log('error on API', error);
    });
}
