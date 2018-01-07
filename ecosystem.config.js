module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'Api-Starter',
      script: 'src/index.js',
      exec_mode: 'cluster',
      instances: process.env.NB_NODES || 2,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
