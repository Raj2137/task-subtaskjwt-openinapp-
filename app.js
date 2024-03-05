const express= require('express');
const morgan= require('morgan');
const app= express();
const bodyparser= require('body-parser');

const mongoose= require('mongoose');
const taskRouter= require('./routes/api/task')
const subTaskRouter= require('./routes/api/subtask')
const userRouter= require('./routes/api/user')


//conneting with monodb
main().catch(err => console.log(err));
async function main() {

    
      await mongoose.connect("mongodb+srv://20951a1269:"+ process.env.MONGO_ATLAS_PW+ "@cluster0.adptosq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }


app.use(morgan('dev'))
//body parsering for extracting json and urlencoded data from body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//calling apis 
app.use("/task", taskRouter);
app.use("/subtask", subTaskRouter);
app.use("/user", userRouter);

//Handling Errors
app.use((req, res, next)=>{
  const error= new Error("Not Found");
  error.status= 404;
  next(error);
})

app.use((error, req, res, next)=>{
  res.status(error.status|| 500);
  res.json({
      error: {
          message: error.message,
      }
  })
})


module.exports= app;