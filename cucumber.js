module.exports = {
  requireModule: ['ts-node/register'], 
  require: [
    'src/steps/hooks.ts', 
    'src/steps/**/*.ts'   
  ],
  paths: ['features/**/*.feature'],
  publishQuiet: true,
  format: [
    'progress',
    'html:reports/cucumber-report.html'
  ],
  timeout: 30000
};
