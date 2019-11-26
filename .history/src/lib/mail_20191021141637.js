import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({});
  }
}

export default new Mail();
