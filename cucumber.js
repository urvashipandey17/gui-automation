module.exports = {
  requireModule: ['ts-node/register'], // MUST be first
  require: [
    'src/steps/hooks.ts', // hooks first
    'src/steps/**/*.ts'   // then step definitions
  ],
  paths: ['features/**/*.feature'],
  publishQuiet: true,
  format: [
    'progress',
    'html:reports/cucumber-report.html'
  ],
  timeout: 30000
};
