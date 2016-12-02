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
      translate = document.getElementById('translate-text').innerHTML,
      src = '/api/speak?text='+translate,
      spriteLength = 1,
      n = 1,
      audioLead = 0.25,
      click = document.ontouchstart === undefined ? 'click' : 'touchstart';
      // audio = document.createElement('audio'),
      // audiosource = document.getElementById('wavsource'),
      // button = document.getElementById('button'),
      // translate = beaconCtrl.artifacts.description;
      // audio.autobuffer = true;
      // audio.load();
      // audio.muted = true; // makes no difference on iOS :(
      function Track(src, spriteLength, audioLead) {
        var track = this,
            audio = document.createElement('audio');
        audio.src = src;
        audio.autobuffer = true;
        audio.load();
        audio.muted = true; // makes no difference on iOS :(

        /* This is the magic. Since we can't preload, and loading requires a user's
           input. So we bind a touch event to the body, and fingers crossed, the
           user taps. This means we can call play() and immediate pause - which will
           start the download process - so it's effectively preloaded.

           This logic is pretty insane, but forces iOS devices to successfully
           skip an unload audio to a specific point in time.
           first we play, when the play event fires we pause, allowing the asset
           to be downloaded, once the progress event fires, we should have enough
           to skip the currentTime head to a specific point. */

        var force = function () {
          audio.pause();
          audio.removeEventListener('play', force, false);
        };

        var progress = function () {
          audio.removeEventListener('progress', progress, false);
          if (track.updateCallback !== null) track.updateCallback();
        };

        audio.addEventListener('play', force, false);
        audio.addEventListener('progress', progress, false);

        var kickoff = function () {
          audio.play();
          document.documentElement.removeEventListener(click, kickoff, true);
        };

        document.documentElement.addEventListener(click, kickoff, true);

        this.updateCallback = null;
        this.audio = audio;
        this.playing = false;
        this.lastUsed = 0;
        this.spriteLength = spriteLength;
        this.audioLead = audioLead;
      }

      Track.prototype.play = function (position) {
        var track = this,
            audio = this.audio,
            lead = this.audioLead,
            length = this.spriteLength,
            time = lead + position * length,
            nextTime = time + length;

        clearInterval(track.timer);
        track.playing = true;
        track.lastUsed = +new Date;

        audio.muted = false;
        audio.pause();
        try {
          if (time == 0) time = 0.01; // yay hacks. Sometimes setting time to 0 doesn't play back
          audio.currentTime = time;
          audio.play();
        } catch (e) {
          this.updateCallback = function () {
            track.updateCallback = null;
            audio.currentTime = time;
            audio.play();
          };
          audio.play();
        }

        track.timer = setInterval(function () {
          if (audio.currentTime >= nextTime) {
            audio.pause();
            audio.muted = true;
            clearInterval(track.timer);
            player.playing = false;
          }
        }, 10);
      };

      var player = (function (src, n, spriteLength, audioLead) {
        var tracks = [],
            total = n,
            i;

        while (n--) {
          tracks.push(new Track(src, spriteLength, audioLead));
        }

        return {
          tracks: tracks,
          play: function (position) {
            var i = total,
                track = null;

            while (i--) {
              if (tracks[i].playing === false) {
                track = tracks[i];
                break;
              } else if (track === null || tracks[i].lastUsed < track.lastUsed) {
                track = tracks[i];
              }
            }

            if (track) {
              track.play(position);
            } else {
              // console.log('could not find a track to play :(');
            }
          }
        };
      })('myaudiosprite.mp3', 1, 1, 0.25);


      console.log('executed audio');
}
