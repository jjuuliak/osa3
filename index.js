const http = require('http')

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

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(persons))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)