import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodmailerhbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';
import { partials } from 'handlebars';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplate();
  }

  configureTemplate() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use('compile', nodemailerhns({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts');
        partialsDir: resolve(viewPath, 'partial'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewEngine,
      extName: '.bhs'
    }))
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
