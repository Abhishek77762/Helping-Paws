import cron from "node-cron";
import Animal from "../models/animal.js";
import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import axios from "axios";

export const animalNewsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Animal Newsletter Cron Automation");

    try {
      const animals = await Animal.find({});

      for (const animal of animals) {
        try {
          const ngoUsers = await User.find({ role: "ngo" });
          const imageUrl = animal.image;

          // Fetch image as a buffer
          const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });

          for (const ngoUser of ngoUsers) {
            const subject = `New ${animal.species} Spotted: ${animal.name} Available for Viewing`;
            const locationLink = `${animal.location}`;
            const message = `Hi ${ngoUser.name},\n\n 
              Sad news! A new ${animal.species} injured animal has been spotted at ${animal.location}.\n\n
              Animal Details:\n
              - **Name:** ${animal.name}\n
              - **Species:** ${animal.species}\n
              - **Location:** ${animal.location}\n
              - **View Location:** [Click Here](${locationLink})\n\n
              Visit the location soon to help this wonderful creature!\n\n
              Best Regards,\nWildlife Tracker Team`;

            // Define email attachments
            const attachments = [
              {
                filename: `${animal.name || "animal"}.jpg`,
                content: Buffer.from(response.data), // Convert buffer data
                contentType: "image/jpeg",
              },
            ];

            // Send email with image attachment
            await sendEmail({
              email: ngoUser.email,
              subject,
              message,
              attachments,
            });

            console.log(`Email sent successfully to ${ngoUser.email} with image`);
          }
        } catch (error) {
          console.log("ERROR IN NODE CRON CATCH BLOCK");
          console.error(error || "Some error in Cron.");
        }
      }
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  });
};
