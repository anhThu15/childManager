var express = require('express');
var router = express.Router();

var modelRoom = require('../models/roomModel');
var modelUser = require('../models/userModel');


// show room and detaiil room 
router.get('/:id_parish', async function(req, res, next) {
  try{
    const {id_parish} = req.params
    const result = await modelRoom.find({id_parish:id_parish})


    if(result != null){
      res.json({status: 1, message:"Thành công", result});
    }else{
      res.json({status: 0, message:"thất bại"});
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
})

router.get('/detailRoom/:id_parish/:id_room', async function(req, res, next) {
  try{
    const {id_room,id_parish} = req.params
    const result = await modelUser.find({id_room:id_room,id_parish:id_parish,role:"Thiếu Nhi"}).populate('id_room');


    if(result != null){
      res.json({status: 1, message:"Thành công", result});
    }else{
      res.json({status: 0, message:"thất bại"});
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
})


// show room and detaiil room 


router.post('/addRoom', async function(req, res, next) {
  try{
    const {name, quantity, id_parish} = req.body
    const RoomAdd = {name, quantity, id_parish}
    const result = await modelRoom.create(RoomAdd)

    if(result != null){
      res.json({status: 1, message:"Thành công"});
      // res.redirect('/admins/product');
    }else{
      res.json({status: 0, message:"thất bại"});
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});


// router.post('/editRoom/:id', async function(req, res, next) {
//   try{
//     var {id} = req.params
//     const {name, quantity} = req.body
//     const roomEdit = await modelRoom.findById(id)
//     // res.json(roomEdit)

//     if(roomEdit != null){
//       roomEdit.name  = name ? name: roomEdit.name;
//       roomEdit.quantity  = quantity ? quantity: roomEdit.quantity;

//       var result = await roomEdit.save();
      
//       if(result != null){
//         res.json({status: 1, message:"Thành công", data:result});
//         // res.redirect('/admins/product');
//       }else{
//         res.json({status: 0, message:"thất bại"});
//       }
//     }
//   }catch(e){
//         res.json({status: 0, message:"không tìm thấy sản phẩm "})
//   }

// });

router.post('/editRoom/:id', async function(req, res, next) {
  try {
    var { id } = req.params;
    const { name, quantity } = req.body;

    // Sử dụng findByIdAndUpdate để cập nhật trực tiếp
    const roomEdit = await modelRoom.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name, // Nếu giá trị mới là undefined, Mongoose sẽ bỏ qua.
          quantity: quantity
        }
      },
      { new: true, omitUndefined: true } // `new: true` trả về tài liệu sau khi update, `omitUndefined` để bỏ qua các field undefined.
    );

    if (roomEdit) {
      res.json({ status: 1, message: "Thành công", data: roomEdit });
    } else {
      res.json({ status: 0, message: "Không tìm thấy phòng" });
    }
  } catch (e) {
    res.json({ status: 0, message: "Đã xảy ra lỗi" });
  }
});

router.delete('/deleteRoom/:id', async function(req, res, next) {
    try {
      const {id} = req.params
      const del = await modelRoom.findByIdAndDelete(id)

      res.json("xóa thành công")
      
    } catch (error) {
      console.log(error);
    }
})
//  xử lý thêm học sinh, sửa học sinh và xóa học sinh

router.get('/ChildInRoom', async function(req, res, next) {
  try {
    const data = await modelUser.find()
    
    if(data != null){
      res.json(data)
    }else{
      res.json('thất bại')
    }
    
  } catch (error) {
    console.log(error);
  }
  
})

router.post('/addChildInRoom', async function(req, res, next) {
  try{
    const {name, id_room} = req.body
    const ChildAdd = await modelUser.findOneAndUpdate(
      {name},
      {
        $set: {
          id_room: id_room
        }
      },
      { new: true, omitUndefined: true } // `new: true` trả về tài liệu sau khi update, `omitUndefined` để bỏ qua các field undefined.
    );

    if (ChildAdd) {
      res.json({ status: 1, message: "Thành công", data: ChildAdd });
    } else {
      res.json({ status: 0, message: "Không tìm thấy phòng" });
    }

  }catch(e){
        res.json({status: 0, message:"không tìm thấy sản phẩm "})
  }
});

router.delete('/deleteChild/:id', async function(req, res, next) {
  try {
    const {id} = req.params
    const del = await modelUser.findByIdAndDelete(id)

    res.json("xóa thành công")
    
  } catch (error) {
    console.log(error);
  }
})




module.exports = router;
