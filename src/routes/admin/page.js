const express=require('express')
const { upload, requireLogin, isAdmin } = require('../../common-middleware')
const { createPage, getPage } = require('../../controller/admin/page')
const router=express.Router()

router.post('/page/create',upload.fields([
    {name:'banners'},
    {name:'products'}
]),requireLogin,isAdmin, createPage)


router.get('/page/:category/:type',getPage)



module.exports=router