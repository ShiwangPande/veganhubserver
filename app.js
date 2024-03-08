import express from 'express';
import { config } from 'dotenv';
import paymentRoute from './routes/paymentRoutes.js';
import cors from 'cors';
import sendMail from './controllers/sendmail.js';
import bodyparser from 'body-parser';
import nodemailer from 'nodemailer';
config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
// app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    });
})

app.post("/api/sendmail", (req, res) => {

    const { email } = req.body;


    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: " Your Hot and Fresh Pizza is on the way!",
            html: '<h2>Dear Valued Customer,</h2> <br> <h3>Thank you for choosing our pizza delivery service!</h3> <p style="font-size:18px"> We are excited to let you know that your pizza order has been confirmed and is on its way to you. Our team is committed to providing the best delivery experience, and we are thrilled to have the opportunity to serve you. </p><br> <p style="font-size:18px"> We understand that you are eagerly waiting for your pizza, and we assure you that it will be delivered to your doorstep within 30 minutes. Our skilled delivery drivers are equipped with state-of-the-art GPS technology to ensure that your pizza arrives at the right time and in perfect condition.</p><br><p style="font-size:18px"> We use only the freshest ingredients to make our pizzas, and each one is carefully crafted to satisfy your cravings. Our pizzas are baked to perfection, with the right balance of crust, sauce, and toppings to create the perfect taste. We hope that you enjoy your pizza and the delivery experience that comes with it.</p> <br> <p style="font-size:18px"> Your satisfaction is our top priority, and we strive to provide exceptional service every time you order from us. Thank you for choosing us as Shiwang Pizza Service. We look forward to serving you again soon!</p> <br><h3> Best regards, <br> Shiwang Pizza Service </h3> '
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({ status: 201, info })
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({ status: 401, error })
    }
});