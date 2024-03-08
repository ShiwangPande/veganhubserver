import nodemailer from 'nodemailer';

const sendMail = async (subject, message, send_to, sent_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "587",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: sent_from,
        to: send_to,
        subject: subject,
        text: message,
        replyTo: reply_to,
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

export default sendMail;