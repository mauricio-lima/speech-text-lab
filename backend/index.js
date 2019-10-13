const http = require('http')
const fs   = require('fs')

const PORT = 3000

const contents = (path) => {
    return new Promise( (resolve,reject) => {
        console.log('path : ', path)

        fs.readFile('../frontend' + path, (err, contents) => {
            if (err) {
                reject(err)
                return
            }
            resolve(contents)
        })
    })
}

http.createServer( async (request,response) => {
    response.writeHead(200, { 'Content-type' : 'text/html' })

    console.log(`method : ${request.method}`)
    console.log(`url    : ${request.url}`   )
    console.log()

    try
    {
        let path

        path = request.url
        if (request.url == '/')
        {
            path = '/index.html'
        }
        const content = await contents(path)
        response.write(content)
    }
    catch (error)
    {
        response.write('error : ' + error)
    }
    response.end()

}).listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})

