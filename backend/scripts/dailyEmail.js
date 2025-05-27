const mongoose = require('../models/index');
const TempPetProfile = require('../models/petprofiles');
const User = require('../models/users');
const cron = require('node-cron');
const { sendEmail } = require('../utils/email'); 


async function sendDailyEmail() {

  //Get current date/time, set to midnight to filter for profiles created today
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); 

  // Get pet profiles created today
  const tempPetProfiles = await TempPetProfile.find({ createdAt: { $gte: currentDate } }).populate('profileId');


  if (tempPetProfiles.length === 0) {
    console.log('No New Profiles');
    return;
  }

  // Get pet profile from temp profiles for daily email
  const newPetProfiles = tempPetProfiles.map(tp => tp.profileId);

  // Get users who subscribed for email notification
  const subscribers = await User.find({ 'emailPrefs.newPetProfiles': true });

  for (const user of subscribers) {

    try {
      await sendEmail(user.email, newPetProfiles);
      console.log(`Sent email to ${user.email}`);
    } catch (error) {
      console.error(`Unable to send email to ${user.email}:`, error.message);
    }
  }

  // Delete temp profiles to avoid duplication
  await TempPetProfile.deleteMany({ createdAt: { $gte: currentDate } });
}

// Set job to run daily at 8 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Daily email job running');
  await sendDailyEmail();
});
