const express=require('express')
const router=express.Router()
const {getAllProjects, createProject, getProjectById, updateProjectById}=require('../controllers/projectController')
const { deleteById } = require('../controllers/userController')

router.get('/projectsLists',async(req,res)=>{
    await getAllProjects(req,res)
})

router.post('/createProject',async(req,res)=>{
    await createProject(req.body,res)
})

router.get('/getProjectId/:id',async(req,res)=>{
    await getProjectById(req,res)
})

router.delete('/deleteProject/:id',async(req,res)=>{
    await deleteById(req,res)
})

router.put('/updateProject/:id',async(req,res)=>{
    await updateProjectById(req,res)
})

module.exports=router