const mysql = require("./mysqlConnect");
const jwt = require("jsonwebtoken");

get = async () => {
    const users = await mysql.query("SELECT * FROM user");
    return users;
};

login = async (data) => {
    console.log(data);

    sql = `SELECT * FROM user WHERE email='${data.email}' AND password='${data.password}'`;

    const usuarios = await mysql.query(sql);
    console.log(usuarios[0]);
    result = null;

    if (usuarios[0].id) {
        const id = usuarios[0].id;
        var token = jwt.sign({ id }, "CIMOL", { expiresIn: 1800 });

        console.log("fez login e gerou token");
        return result = { auth: true, token, user: usuarios[0] };
    }
};

logout = (token) => {
    console.log("Fez logout e cancelou o token!");
    return { auth: false, token: null };
};

//função que verifica se o JWT esta valido
verifyJWT = (token) => {
    if (!token) {
        resp = { auth: false, message: "Token não informado." };
    }
    jwt.verify(token, "CIMOL", function (err, decoded) {
        if (err) {
            resp = { auth: false, message: "Token inválido." };
        }
        if (decoded) {
            resp = { auth: true, idUser: decoded.id };
        }
    });
    return resp;
};

module.exports = { get, login, logout, verifyJWT };
