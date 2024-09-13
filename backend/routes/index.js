var express = require('express');
var router = express.Router();

var modelUser = require('../models/userModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    var data = await modelUser.find();
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

module.exports = router;
