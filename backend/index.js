const http = require('http')

const PORT = 3000

http.createServer( (request,response) => {
    response.writeHead(200, { 'Content-type' : 'text/html' })

    console.log(`method : ${request.method}`)
    console.log(`url    : ${request.url}`   )
    console.log()

    response.write('result')
    response.end()

}).listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})

