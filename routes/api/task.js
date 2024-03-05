const express= require('express');
const router= express.Router();
const task= require('../model/Task');
const { default: mongoose } = require('mongoose');
const checkauthen = require('../middleware/checkauthen');

router.get("/", checkauthen, (req, res, next)=>{

        task.find()
        .select('isDeleted _id title description due_date status')
        .exec()
        .then(result=>{
            const subtasks={
                task: result.map(result=>{
                    return{
                        _id: result._id,
                        title: result.title,
                        description: result.description,
                        due_date: result.due_date,
                        status: result.status,
                        subtasks :{
                            type: "GET",
                            url: "localhost:5000/subtask/"+result._id
                        }
                    }
                })
            }
            res.status(200).json(subtasks);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json({
                error: err
            })
        })

    
});

router.post("/", checkauthen, (req, res, next)=>{
    const work= new task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        status: req.body.status
    });
    work
    .save()
    .then(result=>{
        res.status(201).json({
            Message: "Data added Sucessfully",
            task: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    
});

router.patch("/:taskId",  checkauthen, (req, res, next)=>{
    const id= req.params.taskId;
    const date= new Date()
    task.findByIdAndUpdate({_id: id}, {$set: {due_date: req.body.due_date, status: req.body.status, updated_at: date}})
    .exec()
    .then(result=>{
        res.status(200).json({
         Message:"It's been updated",
         request:{
            type: "GET",
            url: "localhost:5000/task/"
         }
         
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(505).json({
            error: err
        });
    })
});

router.delete("/:taskId", checkauthen,(req, res, next)=>{
    const id= req.params.taskId;
    console.log(id)
    task.findByIdAndUpdate({_id: id}, {$set: {isDeleted: true}}, {new: true})
    .exec()
    .then(result=>{
        res.status(201).json({
            message: "Its's deleted.",
            request:{
                type: "GET",
                url: "localhost:5000/task/"
             }
        })
    })
    .catch()

});

module.exports= router