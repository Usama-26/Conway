import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.postmarkapp.com',
  port: (process.env.MAIL_PORT as unknown as number) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME || 'ca3b6115-ce29-4a1e-a26d-5905a0acdb3b', // generated ethereal user
    pass: process.env.MAIL_PASSWORD || 'ca3b6115-ce29-4a1e-a26d-5905a0acdb3b', // generated ethereal password
  },
});

export const sendMail = async ({
  from,
  to,
  subject,
  text,
  html,
}: {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const info = await transporter.sendMail({
    from: from || 'zipcpq@zipcpq.com',
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
  return info;
};
