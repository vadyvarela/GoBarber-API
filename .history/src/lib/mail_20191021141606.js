import nodemailer from 'nodemailer';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({});
  }
}

export default new Mail();
