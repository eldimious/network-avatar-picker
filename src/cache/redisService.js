const redis = require('redis');
const {
  TTL_REDIS,
} = require('../common/constants');

const redisService = {
  getCachedValue(key) {
    return new Promise((resolve, reject) => {
      const client = this.getClient();
      if (!client) return reject(new Error('No redis instance found'));
      client.get(key, (err, data) => {
        if (data) return resolve(JSON.parse(data));
        return resolve();
      });
    });
  },
  setCachedValue(key, value) {
    const client = this.getClient();
    const ttl = this.getTTL();
    if (!client) return;
    const valueStr = JSON.stringify(value);
    client.set(key, valueStr);
    client.expire(key, ttl || TTL_REDIS);
  },
};


module.exports.init = redisConfig => Object.assign(Object.create(redisService), {
  getClient() {
    const client = redis.createClient(redisConfig);
    return client;
  },
  getTTL() {
    return redisConfig && redisConfig.ttl
      ? redisConfig.ttl
      : undefined;
  },
});
