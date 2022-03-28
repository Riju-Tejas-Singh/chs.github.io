const express  = require("express");
const https =   require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


 app.get("/" , function(req , res) {

  var arr = [0,0,0,0];


  const url = "https://api.thingspeak.com/channels/1684938/feeds.json?api_key=ABYPCE3IS7JQXWT6&results=20";
  // const url  = "https://api.thingspeak.com/channels/1676405/feeds.json?api_key=8FCPNACQ2TRW8U35&results=2";

  https.get(url , function(response){

    response.on("data" , function(data){

      const i = JSON.parse(data);
      //console.log(i);
      d  = i.feeds;

      for(var j=d.length -1 ; j >= 0 ; j--){
          if(d[j].field1 == 1){
            arr[0] = 1;
            break;
          }
          if(d[j] == 0){
            break;
          }
      }

      for(var j=d.length -1 ; j >= 0 ; j--){
        if(d[j].field2 == 1){
          arr[1] = 1;
          break;
        }
        if(d[j] == 0){
          break;
        }
    }

      for(var j=d.length -1 ; j >= 0 ; j--){
        if(d[j].field3 == 1){
          arr[2] = 1;
          break;
        }
        if(d[j] == 0){
          break;
        }
    }

    for(var j=d.length -1 ; j >= 0 ; j--){
      if(d[j].field3 == 1){
        arr[3] = 1;
        break;
      }
      if(d[j] == 0){
        break;
      }
  }
      var fill = ["", ""];
      fill[0] = "THIS SLOT IS ALREADY OCCUPIED CURRENTLY!!";
      fill[1] = "THIS SLOT IS CURRENTLY FREE. HURRY GET IT NOW!!"
      //console.log(d.length);
      //console.log(d);
       res.render("index" , {data : d, arr : arr, fill: fill });
      // res.render("each" , {data : d});

  })
})





 });

 app.get("/contact", function(req,res){
  res.render("contact");
 });

 app.get("/profile" , function(req,res){
  res.render("about");
 });

 let port = process.env.PORT;
 if (port == null || port == "") {
   port = 3000;
 }

 app.listen(port, function() {
   console.log("Server started succesfully");
 });
