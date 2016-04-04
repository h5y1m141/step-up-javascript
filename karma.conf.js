module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',      
      'src/**/*.js',
      'spec/**/*_spec.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['spec', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [],
    singleRun: false,
    concurrency: Infinity
  });
};
