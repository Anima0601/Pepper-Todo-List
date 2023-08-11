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
  console.log(req.body);
  const selectImg = req.body["button"];
  const taskName = req.body["taskinput"];
  const dateSelect = req.body["date"];
  newImg.push(selectImg);
  newInfoTask.push(taskName);
  newInfoDate.push(dateSelect);
  res.render("index.ejs", 
  {imgSelect:newImg,
  nameOfTask:newInfoTask, timeOfComp:newInfoDate.map(formatDate)})
});

app.delete("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);
  console.log("ID to delete:", idToDelete);
  const index = newImg.findIndex((img, index) => index === idToDelete);
  if (index !== -1) {
    newImg.splice(index, 1);
    newInfoTask.splice(index, 1);
    newInfoDate.splice(index, 1);
    res.json({ message: "Item deleted successfully" }); 
  } else {
    res.status(404).json({ message: "Item not found" }); 
  }
});

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
