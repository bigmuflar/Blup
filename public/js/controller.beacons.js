angular.module('module.dashboard', [])
    .controller('BeaconController', beaconCtrl);

beaconCtrl.$inject = ['clientFactory','$http'];

function beaconCtrl(clientFactory, $http){
    var beaconCtrl = this;
    this.query = {};
    this.queryBy = '$';
    console.log('hitting beacon dashboard');

      clientFactory.getExhibit().then(function(success){
        beaconCtrl.exhibits = success.data.data;
        // console.log("dashboard data", getExhibit.data);
        // console.log('API is working', success);
      },  function(error){
        console.log('error on get API', error);
      });

      clientFactory.getObject().then(function(success){
        beaconCtrl.artifacts = success.data.data;
      }, function(error){
        console.log('error on get Object API', error);
      });

      clientFactory.getDevices().then(function(success){
        beaconCtrl.device = success.data
        // beaconCtrl.eddystone_url = success.data.eddystone_url
        // beaconCtrl.status = success.data.status_report
        // beaconCtrl.metadata = success.data.shadow
        console.log('devices api is working', success.data.status_report);
      }, function(error){
        console.log('error on API', error);
      });

};
