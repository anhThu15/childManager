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
    // Nhận danh sách học sinh từ body
    const { students, date } = req.body;
  
    // Kiểm tra nếu students là một mảng
    if (!Array.isArray(students) || students.length === 0) {
      return res.json({ status: 0, message: "Danh sách học sinh không hợp lệ" });
    }
  
    // Khởi tạo mảng để chứa kết quả
    const results = [];
  
    // Duyệt qua từng học sinh trong danh sách
    for (const student of students) {
      const { id_user, check, description } = student;
  
      // Tạo bản ghi điểm danh mới
      const newAttendance = new modelDifferences({
        id_user,     // ID học sinh
        check,       // Trạng thái đi học hay không
        description, // Mô tả lý do (nếu có)
        date         // Ngày điểm danh
      });
  
      // Lưu bản ghi vào cơ sở dữ liệu
      const result = await newAttendance.save();
      results.push(result); // Thêm kết quả vào mảng
    }
  
    // Trả về kết quả cuối cùng
    res.json({ status: 1, message: "Thêm mới điểm danh thành công", results });

    
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
