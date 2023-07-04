const express=require('express')
const router=express.Router()
const {getAllTasks, createTask,getTaskById,updateTaskById,deleteTaskById, savePdf}=require('../controllers/taskController')

router.get('/task-list',async(req,res)=>{
    await getAllTasks(req,res)
})

router.post('/create-task',async(req,res)=>{
    await createTask(req.body,res)
})

router.get('/task-list/:id',async(req,res)=>{
    await getTaskById(req,res)
})

router.put('/task-list/:id',async(req,res)=>{
    await updateTaskById(req,res)
})

router.delete('/task-list/:id',async(req,res)=>{
    await deleteTaskById(req,res)
})

router.put('/task-list-attach/:id',async(req,res)=>{
    await savePdf(req,res)
})


module.exports=router