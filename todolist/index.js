import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let newImg = [];
let newInfoTask =[];
let newInfoDate = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/",(req,res)=>{
  res.render("index.ejs");
})

app.post("/submit", (req, res) => {
  const selectImg = req.body["data-image"];
  const taskName = req.body["taskinput"];
  const dateSelect = req.body["date"];
  newInfoTask.push(taskName);
  newInfoDate.push(dateSelect);
  res.render("index.ejs", 
  {imgSelect:selectImg,
  nameOfTask:newInfoTask, timeOfComp:newInfoDate})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
