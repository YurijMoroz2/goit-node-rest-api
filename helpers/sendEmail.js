import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  try {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: process.env.META_EMAIL,
        pass: process.env.META_PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    const email = { ...data, from: process.env.META_EMAIL };
    await transporter.sendMail(email);

    return true;
    
  } catch (error) {
    throw error;
  }
};
