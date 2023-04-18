require("dotenv").config();
const express = require("express");
const sdGmail = require("@sendgrid/mail")
sdGmail.setApiKey(process.env.SG_API_KEY);
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static("./public"));
app.post("/details", async (req, res) => {
  const { name, email, message } = req.body;
  if (!email || !email.includes("@")) {
    res.status(422).json({ msg: "invalid email address" });
    return;
  }
  const msgi = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: "SGN-EMPIRE",
    html: `
        <p><strong>name:${name}</strong></p>
        <p><strong>email:${email}</strong></p>
        <p><strong>message:${message}</strong></p>
        `,
  };
  await sdGmail.send(msgi);
  res
    .status(200)
    .json({ msg: "message sent successfully we will be in touch soon" });
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
