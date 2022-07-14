const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const server = http.createServer(app); //Especia One
server.listen(port, () =>{
    console.log("http://localhost:3000")
})
