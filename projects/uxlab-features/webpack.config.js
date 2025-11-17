const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  
  name: 'uxlab-features',

  exposes: {
    './uxlab-FeaturesModule': './projects/uxlab-features/src/app/features/features.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' })
  },

});
