const redis = require('redis');
const {
  TTL_REDIS,
} = require('../utils/common');

const redisService = {
  async getCachedValue(key) {
    return new Promise((resolve, reject) => {
      const client = this.getClient();
      if (!client) reject(new Error('No redis instance found'));
      client.get(key, (err, data) => {
        if (data) return resolve(JSON.parse(data));
        return resolve();
      });
    });
  },
  setCachedValue(key, value, ttl) {
    const client = this.getClient();
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
});
