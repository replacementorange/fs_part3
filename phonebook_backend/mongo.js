const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fspart3.rd5qcfi.mongodb.net/personApp?retryWrites=true&w=majority&appName=fspart3`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// Person schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Adding
if (process.argv.length === 5) {

    // sets name & number
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: `${name}`,
        number: `${number}`
    })
    
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

// Display entries
if (process.argv.length === 3) {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
        console.log( person.name, person.number)
        })
        mongoose.connection.close()
    })
}