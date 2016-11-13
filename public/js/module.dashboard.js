angular.module('module.dashboard', [])
    .controller('DashboardController', Dashboard);

function Dashboard() {
    console.info('Dashboard.initialized');
}
