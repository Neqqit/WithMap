const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();app.use(cors());
const http = require('http');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const { exec } = require('child_process');
const PORT = 8881;


const mysql = require("mysql2");
const { Console } = require('console');
const { raw } = require('express');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "umbra",
    password: "Pentagonpass33"
});

con.query("SET SESSION wait_timeout = 604800");

con.connect(function(err) {
    console.log(err);
    //if (err) throw err;
});


app.use(function(req, res, next){
    var data = "";
    req.on('data', function(chunk){ data += chunk})
    req.on('end', function(){
        req.rawBody = data;
        next();
    })
})



app.get("/log", function(request, response){
    const sql = "SELECT * FROM users left join seo ON users.Id = seo.id_users";
    con.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        if (result[0]) {
            response.json(result);
        }
    });
});


app.post("/data", function(request, response) {
    const rawBody = JSON.parse(request.rawBody);
    rawBody.name
    rawBody.Phone
    rawBody.Adress
    rawBody.Region

    const tsql = "INSERT INTO users (Name,Adress,Phone) VALUES ('"+rawBody.name+"','"+rawBody.Adress+"','"+rawBody.Phone+"')";
    con.query(tsql, function(err, result, fields) {
        console.log(result);
        if (err) {
            console.log(err);
        }
        if (result.insertId) {
            const InsertId = result.insertId;
            console.log(rawBody.Region);
            response.send('Записались данные о пользователе');
            let realUrl = encodeURI("https://geocode-maps.yandex.ru/1.x/?apikey=79922c6e-921f-489a-bf32-880d81740470&format=json&geocode="+rawBody.Region+"'"+rawBody.Adress+"'")
        httpGetAsync(realUrl, (data)=>{
            let DataAnswer = JSON.parse(data);
            if(DataAnswer.response.GeoObjectCollection){
                const sql = "INSERT INTO seo (id_users,point) VALUES ('"+InsertId+"','"+DataAnswer.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos+"')";
                con.query(sql, function(err, result, fields) {
                    if (err) {
                        console.log(err);
                    }
                    if (result[0]) {
                        response.send('успех');
                    }
                })
            }
        })
        }
    })
    
     });


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
            
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(null);

}


app.listen(PORT);
