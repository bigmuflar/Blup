angular.module('module.dashboard', [])
    .controller('DashboardController', dashboard);

dashboard.$inject = ['clientFactory','$http'];

function dashboard(clientFactory, $http){
    var dashboard = this;
    console.log('hitting dashboard');

    this.getExhibit = function(clientFactory, $http){
      var getExhibit = this;

      console.info('getExhibit initialized');

      clientFactory.getExhibit().then(function(success){
        getExhibit.data = success.data.data;
        // console.log("dashboard data", getExhibit.data);
        // console.log('API is working', success);
      },  function(error){
        console.log('error on get API', error);
      });
    };

    this.getObject = function(clientFactory, $http){
      var getObject = this;
      console.info('getObject initialized');

      clientFactory.getObject().then(function(success){
        getObject.data = success.data.data;
        console.log("Object Data", getObject.data);
      }, function(error){
        console.log('error on get Object API', error);
      });
    };

    this.getUser = function(clientFactory, $http){
      var getUser = this;
      console.info('getUser initialized');

      clientFactory.getUser().then(function(success){
        getUser.data = success.data.data;
        console.log("getUser Data", getUser.data);
      }, function(error){
        console.log('error on API', error);
      });
    };
};
