var express = require('express');
var router = express.Router();

var modelUser = require('../models/userModel');
var modelDifferences = require('../models/differencesModel');
var modelFeedback = require('../models/feedbackModel');



/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    // var data = await modelUser.find();
    var data = await modelDifferences.find();
    // res.render('admin_product', { title: 'Trang Quản Lý Sản Phẩm', products:data });
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
  res.json(data)
});

// api điểm danh 
router.post('/checkChild', async function(req, res, next) {
  try{
    const {id_user, check, description, date} = req.body
    const checkChild = {id_user, check, description, date}
    var data = await modelDifferences.create(checkChild)


    res.json(data)
    
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});

router.post('/feedBack', async function(req, res, next) {
  try{
    const {id_user, description, date} = req.body
    const feedBack = {id_user, description, date}
    var data = await modelFeedback.create(feedBack)

    res.json(data)
    
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});



module.exports = router;
