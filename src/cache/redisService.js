const redis = require('redis');
const {
  TTL_REDIS,
} = require('../utils/common');

const redisService = {
  getCachedValue(key) {
    return new Promise((resolve, reject) => {
      const client = this.getClient();
      if (!client) reject(new Error('No redis instance found'));
      client.get(key, (err, data) => {
        if (err) return reject(err);
        if (!data) return reject(new Error('No data available'));
        return resolve(JSON.parse(data));
      });
    });
  },
  setCachedValue(key, value, ttl) {
    const client = this.getClient();
    if (!client) {
      throw new Error('No redis instance found');
    }
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
