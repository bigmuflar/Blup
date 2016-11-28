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
      audio = document.getElementById('audio'),
      wavsource = document.getElementById('wavsource'),
      button = document.getElementById('button'),
      // translate = beaconCtrl.artifacts.description;
      translate = document.getElementById('translate-text').innerHTML;

      wavsource.src = '/api/speak?text='+translate;

      audio.load();

      var soundSprite = [
        {start: 0, end: 3000},
        {start: 3500, end: 6789}
      ];

      element.addEventListener('touchstart', function(ev) {
        audio.play();
        playSoundFile(0);
      })

      function playSoundFile(idx) {
        audio.currentPosition = soundSprite[idx].start;
        var x = setInterval(function() {
          if(audio.currentPosition >= soundSprite[idx].end) {
            audio.pause(); // There is no stop() in HTML5
            clearInterval(x);
          }
        }, 50);
      }

      console.log('executed audio');
}
