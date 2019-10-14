module.exports = {
  'moduleFileExtensions': [
    'js'
  ],
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  'coverageDirectory': './coverage/',
  'collectCoverage': true,
  'collectCoverageFrom': [
    'packages/**/src/**/*.{js,vue}',
    '!**/node_modules/**'
  ]
}
