const redis = require('redis');
const {
  TTL_REDIS,
} = require('../common/constants');

const redisService = {
  async getCachedValue(key) {
    return new Promise((resolve, reject) => {
      console.log(`Try fetch cached value with key: ${key}`);
      const client = this.getClient();
      if (!client) return reject(new Error('No redis instance found'));
      client.get(key, (err, data) => {
        try {
          if (!data) return resolve();
          const res = JSON.parse(data);
          const buffer = Buffer.from(res);
          return resolve(buffer);
        } catch (error) {
          return reject(error);
        }
      });
    });
  },
  async setCachedValue(key, value) {
    return new Promise((resolve) => {
      console.log(`Try set new cached value with key: ${key}`);
      const client = this.getClient();
      const ttl = this.getTTL();
      if (!client) return resolve();
      const valueStr = JSON.stringify(value);
      return client.set(key, valueStr, 'EX', ttl || TTL_REDIS, (err) => {
        if (err) return resolve();
        console.log(`Set with success new cached value with key: ${key}`);
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
