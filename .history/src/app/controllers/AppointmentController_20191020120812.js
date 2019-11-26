import * as Yup from 'yup';
import Appointment from '../models/Appointments';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({});
    return res.json();
  }
}

export default new AppointmentController();
