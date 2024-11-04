var express = require('express');
var router = express.Router();

var modelUser = require('../models/userModel');
var modelParish = require('../models/parishModel');
var modelDifferences = require('../models/differencesModel');
var modelFeedback = require('../models/feedbackModel');
var modelLeave = require('../models/leaveModel');



/* GET home page. */



router.post('/update/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { check } = req.body; 

    const leaveRequest = await modelLeave.findById(id);

    if (!leaveRequest) {
      return res.status(404).json({ status: 0, message: "Không tìm thấy đơn xin nghỉ" });
    }

    // Cập nhật giá trị check
    leaveRequest.check = check;

    // Lưu lại thay đổi
    await leaveRequest.save();

    res.json({ status: 1, data: leaveRequest });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 0, message: "Có lỗi xảy ra" });
  }
});

router.post('/add/:id_user', async function(req, res, next) {
  try{
    const {id_user} = req.params
    const { description} = req.body
    const newLeave = {
      id_user,
      description,
      check: null,
      date: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh', 
      }) 
    }
    var data = await modelLeave.create(newLeave)

    if(data){
      res.json('thành công')
    }else{
      res.json('thất bại ')
    }
    
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm 2"})
  }
});

router.get('/:id_user', async function(req, res, next) {
  try {
    const { id_user } = req.params;
    const data = await modelLeave.find({ id_user: id_user, check: null }).sort({ date: -1 }).populate('id_user',"name");

    if (!data) {
      return res.status(404).json({ status: 0, message: "Không tìm thấy đơn xin nghỉ" });
    }

    res.json(data);
  } catch (e) {
    console.error(e); // In lỗi ra console để dễ debug
    res.status(500).json({ status: 0, message: "Có lỗi xảy ra" });
  }
});




module.exports = router;
