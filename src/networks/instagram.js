module.exports = class InstagramService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  async getAvatar(username) {
    try {
      const imageUrl = await this._avatarService.findImage(`https://www.instagram.com/${username}/`, 'instagram');
      return this._avatarService.getImage(imageUrl, 'instagram');
    } catch (error) {
      throw error;
    }
  }
};
