require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

// Home page
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

// Persons in json format
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
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
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
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

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})