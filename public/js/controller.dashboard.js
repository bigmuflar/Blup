angular.module('module.dashboard', [])
    .controller('DashboardController', dashboard);

dashboard.$inject = ['clientFactory','$http'];

function dashboard(clientFactory, $http){
    var dashboard = this;

    console.info('Dashboard initialized');

    clientFactory.getExhibits().then(function(success){
      getExhibit.data = success.data.data;
      // console.log("dashboard data", getExhibit.data);
      // console.log('API is working', success);
    },  function(error){
      console.log('error on get API', error);
    });

    clientFactory.getObject().then(function(success){
      getObject.data = success.data.data;
      console.log("Object Data", getObject.data);
    }, function(error){
      console.log('error on get Object API', error);
    });

    clientFactory.getUser().then(function(success){
      getUser.data = success.data.data;
      console.log("getUser Data", getUser.data);
    }, function(error){
      console.log('error on API', error);
    });


}
