import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointments from '../models/Appointments';
import User from '../models/User';

class AppointmentController {
  async index(req, res) {
    const appointments = await Appointments.findAll({
      where: { user_id: req.userId, canceled_at: null },
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    /*
      Check if provider id is a provider
    */
    const checkisProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkisProvider) {
      return res
        .status(401)
        .json({ error: 'You con only create appointments with providers' });
    }

    /** Check for past date */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permited' });
    }

    /** Check date avaibality */
    const CheckAvaubilty = await Appointments.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (CheckAvaubilty) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not avaibality' });
    }

    const appointments = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointments);
  }
}

export default new AppointmentController();
