// Email Template
function createEmailContentHTML(petProfiles) {

    // Create HTML content for pet profile
    const emailContentHtml = petProfiles.map(pet => `

      <div style="margin-bottom: 20px;">
        <h3 style="margin-bottom: 5px;">${pet.name}</h3>
        <p style="margin: 0;"><strong>Breed:</strong> ${pet.breed}</p>
        <p style="margin: 0;"><strong>Age:</strong> ${pet.age}</p>
        ${pet.picture ? `
          <div style="margin-top: 5px;">
          <img src="${pet.picture}" alt="${pet.name}" style="border-radius: 8px;" width="250" height="auto" />

          </div>
        ` : ''}
      </div>
    `).join('<hr style="margin: 40px 0;">');
  
    return `
      <div style="font-family: Helvetica, sans-serif; line-height: 1.6; color: #000;">
        <h2 style="color: midnightblue;">New Profile Just Added Today!</h2>
        ${emailContentHtml}
        <hr>
        <p style="font-size: 0.9em; color: #888;">
          You’re receiving this email because you subscribed to new pet alerts on Tindfur.
        </p>
      </div>
    `;
  }
  
  module.exports = { createEmailContentHTML };
  
