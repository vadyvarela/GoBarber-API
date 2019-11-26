import User from '../models/User';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
    });
  }
}

export default new ProviderController();
