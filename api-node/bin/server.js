const app = require("../src/api");

app.use(function (req, res, next) {
    next();
});

//Define a porta
const port = process.env.port || 3000; //define a porta do servidor local

//Iniciando a aplicação (servidor)
app.listen(port);
console.log("Start app in port " + port);
