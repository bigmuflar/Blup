angular.module('module.dashboard', [])
    .controller('DashboardController', dashboard);

dashboard.$inject = ['clientFactory','$http'];

function dashboard(clientFactory, $http){
    var dashboard = this;
    console.info('Dashboard initialized');
    clientFactory.getAPIData().then(function(success){
      dashboard.data = success.data.data;
      // console.log("dashboard data", dashboard.data);
      // console.log('API is working', success);
    },  function(error){
      console.log('error on API', error);
    });
}
