const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Contact = require("./models/contact");
const { request, response } = require("express");

/*database for previous exercises */
let phonebook = [
  {
    name: "hola paaa",
    number: "234324",
    id: 12,
  },
  {
    name: "lucia",
    number: "12345",
    id: 18,
  },
  {
    name: "Lucia F",
    number: "42612257",
    id: 19,
  },
  {
    name: "javier",
    number: "2342344534",
    id: 20,
  },
];

/*It parses incoming requests with JSON payloads*/
app.use(express.json());

/*to get the index.html to be shown on deploy*/
app.use(express.static("build"));

/*morgan logger*/
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//alternative method for logging requests to console

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };
// app.use(requestLogger);

/*Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page
 to be requested from another domain outside the domain from which the first resource was served */
app.use(cors());

/*default entry point, not showing don´t know why*/
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/*get all contacts - LOCAL VERSION*/
// app.get("/api/phonebook", (request, response) => {
//   response.json(phonebook);
// });

/*get all contacts - MongoDB VERSION*/
app.get("/api/phonebook", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts.map((contact) => contact.toJSON()));
  });
});

/*get individual contact by ID */
app.get("/api/phonebook/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

/*post new person to phonebook - LOCAL VERSION*/
// app.post("/api/phonebook", (request, response) => {
//   let generateId = () => {
//     const newId = Math.floor(Math.random() * 100000 + 1);
//     return newId;
//   };
//   const body = request.body;
//   if (!body.name) {
//     return response.status(400).json({ error: "name missing" });
//   }
//   if (!body.number) {
//     return response.status(400).json({ error: "number missing" });
//   }
//   const aMatch = phonebook.some((person) => {
//     return person.name.toLowerCase() === body.name.toLowerCase();
//   });
//   if (aMatch) {
//     return response.status(400).json({ error: "name already added" });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateId(),
//   };

//   phonebook = phonebook.concat(person);

//   response.json(phonebook);
// });

/*post new person to phonebook - MongoDB VERSION*/
app.post("/api/phonebook", (request, response, next) => {
  const body = request.body;
  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((newContact) => {
      response.json(newContact);
    })
    .catch((error) => next(error));
});

/*update existing contact*/
app.put("/api/phonebook/:id", (request, response, next) => {
  const body = request.body;
  const updatedContact = { name: body.name, number: body.number };
  // console.log(updatedContact);
  Contact.findByIdAndUpdate(request.params.id, updatedContact, {
    new: true,
    runValidators: true,
  })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => {
      next(error);
    });
});

/*delete person - LOCAL VERSION*/
// app.delete("/api/phonebook/:id", (request, response) => {
//   const id = Number(request.params.id);
//   phonebook = phonebook.filter((person) => person.id !== id);
//   response.status(204).end();
// });

/*delete person - MongoDB VERSION */
app.delete("/api/phonebook/:id", (request, response, next) => {
  console.log(request.params.id);
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

/*middleware for unknowns endpoints*/
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

/*middleware for errors*/
const errorHandler = (error, request, response, next) => {
  console.error(error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log(error.message);
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

/*Binds and listens for connections on the specified host and port*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//return response.status(400).send({ error: error });
