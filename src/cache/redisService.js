const redis = require('redis');
const {
  TTL_REDIS,
} = require('../common/constants');

const redisService = {
  async getCachedValue(key) {
    return new Promise((resolve, reject) => {
      const client = this.getClient();
      if (!client) return reject(new Error('No redis instance found'));
      client.get(key, (err, data) => {
        if (data) return resolve(JSON.parse(data));
        return resolve();
      });
    });
  },
  async setCachedValue(key, value) {
    return new Promise((resolve) => {
      const client = this.getClient();
      const ttl = this.getTTL();
      if (!client) return resolve();
      const valueStr = JSON.stringify(value);
      return client.set(key, valueStr, 'EX', ttl || TTL_REDIS, (err) => {
        if (err) return resolve();
        return resolve();
      });
    });
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
