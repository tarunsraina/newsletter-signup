

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "\\signup.html");
})

app.post("/",function(req,res){
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;
    //console.log(firstName+"- "+lastname+email)


    var data = {
        members  : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
    
        ]
    }
    
    var jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/5euhhb084";

    const options = {
        method : "POST",
        auth : "tarun:9cffbe0b3eaa352321dfsfb1a51a675a-us11"
    }

    const request = https.request(url,options, function(response){
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
    

})




app.listen(3000, function(){
    console.log("server is running");
});

