angular.module('module.dashboard', [])
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
      play = document.getElementById('play'),
      pause = document.getElementById('pause'),
      loading = document.getElementById('loading'),
      bar = document.getElementById('bar'),
      translate = document.getElementById('translate-text').innerHTML;

      wavsource.src = '/api/speak?text='+translate;

      function displayControls() {
           loading.style.display = "none";
           play.style.display = "block";
        }

        // check that the media is ready before displaying the controls
        if (audio.paused) {
           displayControls();
        } else {
           // not ready yet - wait for canplay event
           audio.addEventListener('canplay', function() {
              displayControls();
           });
        }

        play.addEventListener('click', function() {
           audio.play();
           play.style.display = "none";
           pause.style.display = "block";
        });

        pause.addEventListener('click', function() {
           audio.pause();
           pause.style.display = "none";
           play.style.display = "block";
        });

        // display progress

        audio.addEventListener('timeupdate', function() {
           //sets the percentage
           bar.style.width = parseInt(((audio.currentTime / audio.duration) * 100), 10) + "%";
        });


      audio.load();
      audio.play();
      console.log('executed audio');
}
