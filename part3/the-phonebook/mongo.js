const mongoose = require("mongoose");

let [command, path, password, user, phoneNumber] = process.argv;

if (process.argv.length < 3) {
  console.log("arguments missing");
  return;
}

const url = `mongodb+srv://admin:${password}@testcluster-fullstackop.evdosu7.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
});

const Contact = mongoose.model("Contact", contactSchema);

//case listing all contacts
//used array destructuring to get cleaner result and
// to get rid of the ObjectID that MongoDB offers,

if (user === undefined || phoneNumber === undefined) {
  mongoose.connect(url).then(() => {
    Contact.find({}).then((result) => {
      const list = result.map((contact) => {
        let { name: name, phoneNumber: phoneNumber } = contact;
        return { name, phoneNumber };
      });
      console.log("phonebook:");
      list.forEach((contact) => console.log(contact.name, contact.phoneNumber));
      return mongoose.connection.close();
    });
  });
}

//case adding new contact
else {
  mongoose
    .connect(url)
    .then(() => {
      const contact = new Contact({
        name: user,
        phoneNumber: phoneNumber,
      });
      console.log(`Added contact ${user} number ${phoneNumber} to phonebook`);
      return contact.save();
    })
    .then(() => {
      console.log("closing connection");
      return mongoose.connection.close();
    });
}
