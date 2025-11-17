const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'uxlab-dashboard',
  exposes: {
    './uxlab-DashboardModule': './projects/uxlab-dashboard/src/app/dashboard/dashboard.module.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
