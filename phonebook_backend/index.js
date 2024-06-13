const express = require('express')
const app = express()
// https://github.com/expressjs/morgan
const morgan = require('morgan')
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const cors = require('cors')

// activates the json-parser and implement an initial handler for dealing with the HTTP POST requests
app.use(express.json())
//app.use(morgan('tiny'))
// https://github.com/expressjs/morgan#creating-new-tokens
// morgan.token('type', function (req, res) { return req.headers['content-type'] })
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Home page
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

// Persons in json format
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

// Info page 
app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date
    response.send(`\
      <p>Phonebook has info for ${people} people
      <br/> ${date}</p>
    `)
  })

// Single phonebook entry by ID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Delete
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Adding new entry to the phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Checks if name is missing
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  // Checks if number is missing
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  // Checks if name already exists
  if (persons.filter(person => person.name == body.name).length){
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }

  const person = {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    id: Math.floor(Math.random() * 5000),
    name: body.name,
    number: body.number //|| undefined, Nope. exercise 3.6
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})