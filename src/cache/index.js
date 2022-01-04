const cacheService = require('./redisService');

module.exports.init = redisConfig => ({
  cacheService: cacheService.init(redisConfig),
});
