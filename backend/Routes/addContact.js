const express = require("express");
const router = express.Router();
const roomModel = require("../models/roomSchema");
const userModel = require("../models/userSchema");
const auth = require("../middlewares/auth")

router.post("/",auth, async (req, res) => {
  try {
    const { email } = req.body; //email of person to be added as contact
    const client = await userModel.findOne({ email: req.user.email});//email of person who is logged in
    // console.log(client)

    const client2 = await userModel.findOne({ email });
    let contacts = client.contacts;
    const contactPerson = contacts.find((e) => e === email);
    if (contactPerson || client2.email === client.email)
      return res
        .status(403)
        .json({
          message: "User already in your contact.",
        }); //ek condition aur lagana h ki agr wo apna hi id daal de to kya kre
        else {
          let newContacts = contacts.concat(email);
          // console.log(newContacts)
          const room = await roomModel.create({
        participants: [client.email, client2.email],
      });
      await userModel.findByIdAndUpdate(
        client._id,
        { contacts: newContacts, $push: { roomIds: room._id } },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        client._id,
        {$push: {personAndRoom: {roomId:room._id, email:email,name:client2.name}} },
        { new: true }
      );

      contacts = client2.contacts;
      newContacts = contacts.concat(client.email);

      await userModel.findByIdAndUpdate(
        client2._id,
        { contacts: newContacts, $push: { roomIds: room._id}},
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        client2._id,
        {$push:{personAndRoom: {roomId:room._id, email:req.user.email,name:req.user.name}}},
        { new: true }
      );
      res.json({message: "Contact request sent successfully."});
    }
  } catch (error) {
    res.status(400).json({message: "User does not exist." });
  }
});

module.exports = router;
