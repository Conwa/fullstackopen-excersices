const { request, response } = require("express");
const express = require("express");
const { token } = require("morgan");
const app = express();
var morgan = require("morgan");

const cors = require("cors");

/*database for now */
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

/*Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page
 to be requested from another domain outside the domain from which the first resource was served */
app.use(cors());

/*default entry point*/
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/*get all contacts*/
app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

/*random ID generator*/
const generateId = () => {
  const newId = Math.floor(Math.random() * 100000 + 1);
  return newId;
};

/*post new person to phonebook*/
app.post("/api/phonebook", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  const aMatch = phonebook.some((person) => {
    return person.name.toLowerCase() === body.name.toLowerCase();
  });
  if (aMatch) {
    return response.status(400).json({ error: "name already added" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phonebook = phonebook.concat(person);

  response.json(phonebook);
});

/*delete person*/
app.delete("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  response.status(204).end();
});

/*method for unknowns endpoints*/
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

/*Binds and listens for connections on the specified host and port*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
