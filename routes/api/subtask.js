const express= require('express');
const router= express.Router();
const checkauthen = require('../middleware/checkauthen');
const subTask= require('../model/Subtask');
const { default: mongoose } = require('mongoose');



router.get("/:taskId", checkauthen, (req, res, next)=>{
       
        const task_id= req.params.taskId
        subTask.find({task_id: task_id})
          .select('_id task_id Status desc created_at updated_at deleted_at isDeleted')
          .exec()
          .then(result=>{
            res.status(200).json({
                result
            })
          })
          .catch(err=> {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    
        })




router.post("/", checkauthen, (req, res, next)=>{
    const currentDate= new Date();
    
    const formattedDate = currentDate.toLocaleDateString('en-IN');
    const formattedTime = currentDate.toLocaleTimeString('en-IN', { hour12: false });
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const subtask= new subTask({
        _id: new mongoose.Types.ObjectId(),
        task_id: req.body.task_id,
        Status: req.body.status,
        desc: req.body.desc,
        created_at:  formattedDateTime,
        updated_at: null,
        deleted_at: null,
    })
    subtask
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Subtask created successfully',
        Subtask: result,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
})


router.patch("/:subtaskId", checkauthen, (req, res, next)=>{
    const id= req.params.subtaskId;
    const date= new Date()
    subTask.findByIdAndUpdate({_id: id}, {$set: {Status: req.body.status, updated_at: date}})
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


router.delete("/:subtaskId", checkauthen, (req, res, next)=>{
    const id= req.params.subtaskId;
    const date= new Date()
    subTask.findByIdAndUpdate({_id: id}, {$set: {isDeleted: true, deleted_at: date}})
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
})


module.exports= router;