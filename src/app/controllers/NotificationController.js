import Notification from '../shema/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkProvider) {
      res.status(401).json('Only provider can load notification');
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdateId(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
