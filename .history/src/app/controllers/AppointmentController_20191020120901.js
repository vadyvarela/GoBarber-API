import * as Yup from 'yup';
import Appointment from '../models/Appointments';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    return res.json();
  }
}

export default new AppointmentController();
