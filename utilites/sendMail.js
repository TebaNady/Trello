// // import { createTransport } from "nodemailer";
// import nodemailer from 'nodemailer'
// export async function sendEmail(email, subject, html) {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         secure: true,
//         auth: {
//             user:"mousasalib@gmail.com",
//             pass: "yamcloerrfcwztto"
//         }
//     });

//     let info = await transporter.sendMail({
//         // from: '"Fred Foo 👻" <mousasalib601@gmail.com>', // sender address
//         from: process.env.EMAIL_SENDER,
//         to: email, // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<h1>Hello world?</h1>", // html body
//     });



// }

  
// export default sendEmail;
import { createTransport } from "nodemailer";
export const sendToEmail = async (email) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: "mousasalib601@gmail.com",
            pass: "yamcloerrfcwztto"
        },
    });
    const info = await transporter.sendMail({
        from: "mousasalib601@gmail.com",
        to: email,
        subject: "Hello",
        text: "You are welcome in ITI, regards, Mousa Salib",
        html: "<h1>You are welcome in ITI, regards, Mousa Salib <a href='http://localhost:5500/user/verify/:token'>Please Verify</a></h1>"
    })
}