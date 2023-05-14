
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

require('dotenv').config();
const bcrypt = require('bcryptjs')
const User = require('./model/User')
const Place = require('./model/Place')
const Booking = require('./model/Booking')
const cookieParser = require('cookie-parser')
// 下载图片包
const imageDownloader = require('image-downloader')

const multer = require('multer')
const fs = require('fs')
const path = require('path')



const app = express()
// 盐值加密
const secret = bcrypt.genSaltSync(10);

const jwtSecret = 'ashdkashdkjshdfkjsdf'
app.use(express.json())
// 中间件，使用可以获取前端cookie
app.use(cookieParser())

app.use(cors({
  credentials:true,
  origin:'http://127.0.0.1:5173'
}))
app.use('/upload',express.static(__dirname + '/upload'))
mongoose.connect(process.env.Mongo_URL)


// 注册 创建账号密码进入数据库
app.post('/register', async (req,res) => {

  // mongoose.connect(process.env.MONGO_URL);
  const {name,email,password} = req.body;

  try {
    // 通过model User 创建用户表
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, secret),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }

});

// 登录 验证账号密码
app.post('/login',async (req,res)=>{

  const {email,password} = req.body

  // model User 查询email是否存在
 const userDoc = await User.findOne({email})
 if (userDoc) {
   // 比较密码是否正确
    const passOk = bcrypt.compareSync(password,userDoc.password)
    if(passOk) {
      // 发送token给前端
      jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token) => {
        if (err) throw err
        res.cookie('token',token).json(userDoc)


      })





   
    }else {
      res.status(422).json('pass not ok')
    }
 }else {
   res.json('not found')
 }

})

// profile

app.get('/profile',(req,res) => {
  // 获取前端传回来的token
  const {token}  = req.cookies;
  if (token) {
    // token存在，验证token是否正确
    jwt.verify(token,jwtSecret,{},async(err,userData) => {
       if (err) throw err;
       if (userData) {
        const {name,email,_id} = await User.findById(userData.id)
         res.json({name,email,_id})

       }


    })

  } else {
    res.json(null)
  }



})

// 退出登录 API

app.post('/logout',(req,res) => {
  res.cookie('token','').json(true)
  


})


app.post('/upload-by-link', async(req,res)=>{
    const {link} = req.body;
      
    const newName = 'photo' + Date.now() + '.jpg';
     await imageDownloader.image({
      url:link,
      dest:__dirname + '/upload/' + newName
    })
   


    res.json(newName)


})

// 设备图片
// 处理formData 中间件
const photoMiddleWare = multer({dest:'upload'})
app.post('/upload',photoMiddleWare.array('photos',100) ,(req,res) => {
  const uploadFiles= []

    for (let i = 0;i<req.files.length;i++) {
      const {path,originalname} = req.files[i]
      
      const   parts = originalname.trim().split('.')
      
      const exct = parts[parts.length -1]
       
      const newPath = path +  '.' + exct
      

    
      fs.renameSync(path,newPath)
     
       
        uploadFiles.push(newPath.replace('upload\\',''))

    }
 

    res.json(uploadFiles)

  

})

// 提交所有 place信息数据

app.post ('/places',(req,res) => {
  // 从token 取出id
  const {token} = req.cookies
  const {title,address,addPhotos,desc,perks,extraInfo,checkIn,checkOut, maxGuests,price} = req.body

  jwt.verify(token,jwtSecret,{},async (err,userData)=>{
    if (err) throw err

 const placeDoc =  await Place.create({
      owner:userData.id,
      title,
      price,
      address,
      photos:addPhotos,
      description:desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
 })
    
  res.json(placeDoc)

  })







})

// 获取上传place信息

app.get('/place-info',(req,res)=>{
  const {token} = req.cookies

  jwt.verify(token,jwtSecret,{}, async(err,userData)=>{
      if(err) throw err
      const {id} = userData;
      res.json(await Place.find({owner:id}))


  })


})

// 根据id获取当前信息

app.get('/place/:id',async(req,res)=>{

  const {id} = req.params
  res.json(await Place.findById(id))
  
})
  // 修改房源信息
  app.put('/places',async (req,res) => {

  const {token} = req.cookies
  const {id,title,address,addPhotos,desc,perks,extraInfo,checkIn,checkOut, maxGuests,price} = req.body

 
  jwt.verify(token,jwtSecret,{}, async(err,userData)=>{
    if (err) throw err;
    const placeDoc = await Place.findById(id)
   
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        price,
        photos:addPhotos,
        description:desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests
      })
    await  placeDoc.save()
      res.json('update success')
    }


  })




  })
  // 首页房源信息
   app.get ('/user-place',async(req,res)=>{

    res.json(await Place.find())


  })

  // 预定endpoint
  app.post('/booking', (req,res)=>{
    const {checkIn,checkOut,mobile,name,place,Guests,price} = req.body

  Booking.create({
    checkIn,checkOut,mobile,name,place,Guests,price
  }).then((doc)=>{
  
    res.json(doc)
  }).catch((err)=>{
    throw err
  })
 
    


  })

    // 获取预定房源详情页面
  app.get('/bookings/:id',async (req,res) => {
    const {id} = req.params;

     res.json(await Booking.findById(id))


  })





app.listen(4000,()=>{
  console.log('ok');
})