angular.module('module.dashboard', [])
    .controller('DashboardController', Dashboard);

Dashboard.$inject = ['clientFactory'];

function Dashboard(clientFactory) {
    console.info('Dashboard.initialized');
    clientFactory.getAPIData().then(function(success){
      console.log('API is working', success);
    },  function(error){
      console.log('error on API', error);
    });
}
