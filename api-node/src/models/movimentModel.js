const mysql = require("./mysqlConnect");

/*get= async (query)=>{
    query = JSON.parse(query);
    sql= "SELECT ";
    if(query.select.date){
        sql+="date, ";
    }
    if(query.select.description){
        sql+="description, ";
    }
    if(query.select.value){
        sql+="value, ";
    }
    if(query.select.type){
        sql+="type, ";
    }
    sql=sql.substring(0, sql.length - 2);//remover dois ultimos caracter da sctring
    sql+=" FROM moviment"
    if(query.where){
        sql+=" WHERE"
        query.where.forEach(item =>{
            sql+=" "+item.campo+" "+item.operador.replace('/', '')+" '"+item.value+"' AND";
        })
        sql=sql.substring(0, sql.length - 3);//remover utilmo segmento 'END' da string
    }
    return await mysql.query(sql);
}*/

get = async () => {
    sql= `SELECT * FROM moviment`;
    return await mysql.query(sql);
}

cashBalanceModel = async () => {
    sql = `SELECT sum(value) AS input FROM moviment WHERE type='input'`;
    input = await mysql.query(sql);
    sql = `SELECT sum(value) AS output FROM moviment WHERE type='output'`;
    output = await mysql.query(sql);
    saldo = input[0].input-output[0].output;
    var data = {
        saldo:saldo,
        entrada:input[0].input,
        saida:output[0].output
    } 
    return data;
}

ioModel = async () => {
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output') AS output FROM moviment m ORDER BY DATE`;
    return await mysql.query(sql);
}

listaAnoMes= async (year, month) => {
    sql = `SELECT * FROM moviment WHERE YEAR(date) = ${year} AND MONTH(date) = ${month}`;
    return await mysql.query(sql);
}

post= async (date, idUser)=>{
    //console.log(date);
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    console.log(result);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviments SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

filtro = async (yearI, monthI, yearF, monthF) =>{
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output' ) AS output FROM moviment m WHERE date BETWEEN '${yearI}-${monthI}-00' AND '${yearF}-${monthF}-00' ORDER BY date;`;
    return await mysql.query(sql);
};

anoMes = async(year, month)=>{
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output' ) AS output FROM moviment m WHERE YEAR(date) = ${year} AND MONTH(date) = ${month} ORDER BY DATE`;
    return await mysql.query(sql);
};

module.exports= {get,post, put, remove, cashBalanceModel, ioModel, listaAnoMes, filtro, anoMes}