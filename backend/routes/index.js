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



router.post('/attendanceByDate/:dates', async function(req, res, next) {
  try {
    const { dates } = req.params; // "2024-11-01"
    const { user_ids } = req.body; // user_ids được truyền từ body

    if (!dates) {
      return res.json({ status: 0, message: "Ngày không hợp lệ" });
    }

    // Chuyển date thành định dạng ngày trong chuỗi ("1/11/2024" cho tìm kiếm)
    const dateParts = dates.split('-');
    const formattedDate = `${parseInt(dateParts[2], 10)}/${parseInt(dateParts[1], 10)}/${dateParts[0]}`;

    // Kiểm tra nếu không có user_ids
    if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
      return res.json({ status: 0, message: "Danh sách user_id không hợp lệ" });
    }

    // Tìm kiếm các điểm danh với các điều kiện user_ids và ngày
    const attendances = await modelDifferences.find({
      date: { $regex: formattedDate }, // Tìm kiếm theo ngày
      id_user: { $in: user_ids } // So khớp user_id
    }).populate('id_user');;

    if (attendances.length === 0) {
      return res.json({ status: 0, message: "Không tìm thấy điểm danh cho ngày này và user_id đã chọn" });
    }

    const userIds = attendances.map(attendance => attendance.id_user);

    res.json({ status: 1, message: "Danh sách điểm danh theo user_id và ngày", attendances });
  } catch (error) {
    console.error("Error fetching attendance by date:", error);
    res.json({ status: 0, message: "Có lỗi xảy ra khi lấy danh sách điểm danh", error: error.message });
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
