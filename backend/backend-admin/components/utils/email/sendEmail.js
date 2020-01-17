const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tutorreact@gmail.com',
        pass: 'tvzjdbqpbhaclhna'
    }
});


exports.sendEmail = async (message) => {
    let result;
    try {
        const a = await transporter.sendMail(message);
    } catch (err) {
        // console.log(err);
    }
};