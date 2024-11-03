var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var upload = require('../ulity/upload');

var modelUser = require('../models/userModel');

/* GET users listing. */

router.get('/:id', async function(req, res, next) {
  try{
    const {id} = req.params
    const result = await modelUser.findById(id)


    if(result != null){
      res.json({status: 1, message:"Thành công", result});
    }else{
      res.json({status: 0, message:"thất bại"});
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
})

router.post('/:parish', async function(req, res, next) {
  try{
    const {parish} = req.params
    const result = await modelUser.find({role: "GLV", id_parish: parish})
    if(result != null){
      res.json({status: 1, message:"Thành công", result});
    }else{
      res.json({status: 0, message:"thất bại"});
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
})


router.post('/login', async function(req, res, next) {
  try{
    var {name, password } = req.body
    var data = await modelUser.findOne({name});

    if(!data){
      return res.status(404).json({ message: "Tên không tồn tại" });
    }

    const match = await bcrypt.compare(password, data.password);

    if (!match) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

  // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm 2"})
  }
  res.json(data)
});



router.post('/sigin', [upload.single('avatar')], async function(req, res, next) {
  // try{
    var {name, phone, password, date, branh, gender, id_parish} = req.body
    var avatar = req.file.originalname
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); 
    
    const user = await modelUser.findOne({ name });
    if (user) {
      return res.status(400).json({ message: "Tên đã tồn tại" });
    }else{

      const newUser = modelUser({ 
        name, phone, password:hash, date, branh, avatar, gender , role:'Thiếu Nhi', id_parish
      });

      await newUser.save()
  
      if(newUser != null){
          res.json({status: 1, message:"Thành công", user: newUser});
      }else{
          res.json({status: 0, message:"thất bại"});
      }
    }
  // }catch(e){
  //       res.json({status: 0, message:"không tìm thấy sản phẩm "})
  // }
});


// thay đổi thông tin user 

router.put('/updateChild/:id', [upload.single('avatar')], async function(req, res, next) {
  try{
    const {id} = req.params
    var {name, phone, password, date, branh, gender, id_parish} = req.body
    let avatar = req.file ? req.file.originalname : null;

    const updateData = {
      name,
      phone,
      date,
      branh,
      gender,
      id_parish,
    };

    if (avatar) updateData.avatar = avatar;
    if (password) { 
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(password, salt);
    }

    
    const updatedUser = await modelUser.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedUser) {
      res.json({ status: 1, message: "Cập nhật thành công", user: updatedUser });
    } else {
      res.status(404).json({ status: 0, message: "Không tìm thấy người dùng với ID này" });
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});

module.exports = router;
