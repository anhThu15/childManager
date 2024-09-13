var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

var modelUser = require('../models/userModel');

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  try{
    var {name, password } = req.body
    var data = await modelUser.findOne({name});
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

module.exports = router;
