import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //creating a hashed token to verify the user
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    // Email subject and link
    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";
    const actionUrl = `${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}`;

    //Email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height:1.5;">
        <h2>${subject}</h2>
        <p>Click the link below to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }:</p>
        <a href="${actionUrl}" 
           style="display:inline-block; margin:10px 0; padding:10px 15px; 
                  background:#2563eb; color:#fff; text-decoration:none; border-radius:5px;">
          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
        </a>
        <p>If the button doesn't work, copy and paste this link in your browser:</p>
        <p><a href="${actionUrl}">${actionUrl}</a></p>
        <br/>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    // create a transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });
    const mailOptions = {
      from: "kushal123@gmail.com",
      to: email,
      subject: subject,
      html: htmlContent,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error("Email not sent, please try again");
  }
};
