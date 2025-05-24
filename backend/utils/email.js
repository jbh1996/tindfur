const nodemailer = require('nodemailer');
const { createEmailContentHTML } = require('./emailTemplates');


// Create transporter object, send email using Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

async function sendEmail(userToEmail, petProfiles) {
  const htmlContent = createEmailContentHTML(petProfiles);

  // Format email body
  const textBody = `Hey!\n\nHere are the new pet profiles added today:\n\n` +
  petProfiles.map(p => `- ${p.name}, ${p.animalType}, Age: ${p.age}, Breed: ${p.breed})`).join('\n') +
  `\n\nCheck out the website for more!`;

  // Define email details
  const mailOptions = {
    from: 'tindfur@gmail.com',
    to: userToEmail,
    subject: 'New Pet Profiles Just Added!',
    text: textBody,
    html: htmlContent
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail, transporter };
