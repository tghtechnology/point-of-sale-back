import nodemailer from 'nodemailer';
export const envioCorreo=async(email,asunto,cuerpo)=>{
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: asunto,
    html: cuerpo,
  });
}