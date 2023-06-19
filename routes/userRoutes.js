const express=require('express')
const router=express.Router()
const {getAllUsers,createUser, getUserById, deleteById, update}=require('../controllers/userController')

router.get('/users',async(req,res)=>{
    await getAllUsers(req,res)
})//always req comes first

router.post('/create',async(req,res)=>{
    await createUser(req.body,res)
})

router.get('/getId/:id',async(req,res)=>{
    await getUserById(req,res)
})
router.delete('/delete/:id',async(req,res)=>{
    await deleteById(req,res)
})
router.put('/update/:id',async(req,res)=>{
    await updateById(req,res)
})

module.exports=router