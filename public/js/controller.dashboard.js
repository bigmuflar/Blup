angular.module('module.dashboard', [])
    .controller('DashboardController', dashboard);

dashboard.$inject = ['clientFactory','$http'];

function dashboard(clientFactory, $http){
    var dashboard = this;
    console.log('hitting dashboard');

      clientFactory.getExhibit().then(function(success){
        dashboard.exhibits = success.data.data;
        // console.log("dashboard data", getExhibit.data);
        // console.log('API is working', success);
      },  function(error){
        console.log('error on get API', error);
      });

      clientFactory.getObject().then(function(success){
        dashboard.artifacts = success.data.data;
      }, function(error){
        console.log('error on get Object API', error);
      });

      clientFactory.getUser().then(function(success){
        dashboard.username = success.data;
        console.log('hitting Username', success.data)
      }, function(error){
        console.log('error on API', error);
      });
      //
      // var userFactory = {
      //   clientFactory.getUser: clientFacotry.getUser;
      // }
      //
      // return userFactory;
};
