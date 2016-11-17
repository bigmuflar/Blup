angular.module('module.dashboard', [])
    .controller('DashboardController', dashboard);

dashboard.$inject = ['clientFactory','$http'];

function dashboard(clientFactory, $http){
    var dashboard = this;
    console.log('hitting dashboard');

    this.exhibit = function(clientFactory, $http){
      var exhibit = this;
      console.info('exhibit initialized');

      clientFactory.getExhibit().then(function(success){
        exhibit.data = success.data.data;
        // console.log("dashboard data", getExhibit.data);
        // console.log('API is working', success);
      },  function(error){
        console.log('error on get API', error);
      });
    };

    this.artifact = function(clientFactory, $http){
      var artifact = this;
      console.info('artifact initialized');

      clientFactory.getObject().then(function(success){
        artifact.data = success.data.data;
        console.log("Object Data", artifact.data);
      }, function(error){
        console.log('error on get Object API', error);
      });
    };

    this.user = function(clientFactory, $http){
      var user = this;
      console.info('getUser initialized');

      clientFactory.getUser().then(function(success){
        user.data = success.data.data;
        console.log("getUser Data", user.data);
      }, function(error){
        console.log('error on API', error);
      });
    };
};
