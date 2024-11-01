var express = require('express');
var router = express.Router();

var modelUser = require('../models/userModel');
var modelParish = require('../models/parishModel');
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
    const {students} = req.body;
  
    // Kiểm tra nếu students là một mảng
    if (!Array.isArray(students) || students.length === 0) {
      return res.json({ status: 0, message: "Danh sách học sinh không hợp lệ" });
    }
  
    // Khởi tạo mảng để chứa kết quả
    const results = [];
  
    // Duyệt qua từng học sinh trong danh sách
    for (const student of students) {
      const { id_user, check, description } = student;
  
      try {
        // Tạo bản ghi điểm danh mới
        const newAttendance = new modelDifferences({
          id_user,     
          check,       
          description, 
          date: new Date().toLocaleString('vi-VN', {
                  timeZone: 'Asia/Ho_Chi_Minh', // Đảm bảo sử dụng múi giờ Việt Nam
                }) // Ngày điểm danh được định dạng
        });

        // Lưu bản ghi vào cơ sở dữ liệu
        const result = await newAttendance.save();
        results.push(result); // Thêm kết quả vào mảng
      } catch (innerError) {
        console.error("Error saving attendance:", innerError);
        // Nếu có lỗi khi lưu, có thể bạn muốn xử lý nó ở đây
        return res.json({ status: 0, message: "Lỗi khi lưu điểm danh cho học sinh", error: innerError.message });
      }
    }
    
    // Trả về kết quả cuối cùng
    res.json({ status: 1, message: "Thêm mới điểm danh thành công", results });

    
  }catch(e){
    res.json({status: 0, message:"không tìm thấy gì hết  "})
  }
});



router.post('/feedBack/:id_user', async function(req, res, next) {
  try{
    const {id_user} = req.params
    const { description} = req.body
    const newFeedback = {
      id_user,
      description,
      date: new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh', 
      }) 
    }
    // const feedBack = {id_user, description, date}
    var data = await modelFeedback.create(newFeedback)

    res.json(data)
    
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});

router.get('/feedBack/:id_user', async function(req, res, next) {
  try{
    const {id_user} = req.params
    var data = await modelFeedback.find({id_user : id_user})

    if(data){
      res.json({data,message:"thành công", status:1})
    }else{
      res.json({data,message:"thất bại", status:0})
    }

    // res.json(data)
    
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});


router.get('/parish', async function(req, res, next) {
  try{
    var data = await modelParish.find()

    res.json(data)
    
  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});



module.exports = router;
