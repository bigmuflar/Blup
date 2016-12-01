angular.module('module.dashboard', ['ngTouch'])
    .controller('BeaconController', beaconCtrl)
    .controller('Speakit', speakit);


beaconCtrl.$inject = ['clientFactory','$http'];
speakit.$inject = ['clientFactory', '$http'];

function beaconCtrl(clientFactory, $http){
    var beaconCtrl = this;
    this.query = {};
    this.queryBy = '$';
    this.orderList = "title";
    this.name = 'Whirled';
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
        console.log('devices api is working', success.data);
      }, function(error){
        console.log('error on API', error);
      });
};

function speakit(beaconCtrl, $http){
  var speakit = this,
      audio = document.createElement('audio'),
      // audiosource = document.getElementById('wavsource'),
      // button = document.getElementById('button'),
      // translate = beaconCtrl.artifacts.description;
      translate = document.getElementById('translate-text').innerHTML;

      audio.src = '/api/speak?text='+translate;
      audio.autobuffer = true;
      audio.load();
      audio.muted = true; // makes no difference on iOS :(

      console.log('executed audio');
}
