import Notification from '../Schema/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkisProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkisProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    return res.json();
  }
}

export default new NotificationController();
