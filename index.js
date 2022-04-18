const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
      },
      {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
      },
      {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
      },
      {
        id: 5,
        name: "Muskeli Maisa",
        number: "0456789"
      },
      {
        id: 6,
        name: "Kanapati Kumar",
        number: "04456789"
      }
]

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello this is the Phonebook!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.number || !body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    let found = false;
    persons.map(p => {
        if(p.name === body.name) {
            found = true;
        }
    })

    if(found) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const maxId = Math.floor(Math.random() * Date.now())

    const person = body
    person.id = maxId + 1

    persons = persons.concat(person)

    response.json(person)
})

app.get('/info', (request, response) => {
    const numPeople = persons.length
    const date = new Date()

    response.send(`<p>Phonebook has info for ${numPeople} people</p>
                    <p>${date.toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})