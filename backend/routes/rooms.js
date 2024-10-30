var express = require('express');
var router = express.Router();

var modelRoom = require('../models/roomModel');
var modelUser = require('../models/userModel');


// show room and detaiil room 
router.get('/:id_parish', async function(req, res, next) {
  try{
    const { id_parish } = req.params;
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
    const result = await modelUser.find({id_room:id_room,id_parish:id_parish}).populate('id_room');


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
    const { name, id_parish, userId } = req.body;

    const user = await modelUser.findOne({ _id: userId });

    if (user) {
      // Bước 2: Tạo Room mới
      const RoomAdd = { name, id_parish };
      const newRoom = await modelRoom.create(RoomAdd);

      if (newRoom) {
        user.id_room = newRoom._id;
        await user.save();

        res.json({
          status: 1,
          message: "Thêm phòng và cập nhật id_room cho user thành công",
          room: newRoom,
          user: user,
        });
      } else {
        res.json({ status: 0, message: "Thất bại khi tạo phòng" });
      }
    } else {
      res.json({ status: 0, message: "Thất bại khi tạo phòng" });
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
    const { id } = req.params;
    // res.json(id)
    const del = await modelRoom.findByIdAndDelete(id);

    if (del) {
      res.json({ status: 1, message: "Xóa thành công", room: del });
    } else {
      res.status(404).json({ status: 0, message: "Không tìm thấy phòng với ID cung cấp" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 0, message: "Đã xảy ra lỗi", error: error.message });
  }
});
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


router.post('/addChildByName', async function(req, res, next) {
  try {
    const { newRoomId, name, id_parish } = req.body;  

    // Tìm và cập nhật `id_room` của tài liệu dựa trên `name`
    const updatedUser = await modelUser.findOneAndUpdate(
      { name: name, id_parish: id_parish },  
      { id_room: newRoomId },  
      { new: true }  
    );

    if (updatedUser) {
      res.json({ message: "Cập nhật thành công", updatedUser });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng với tên này" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});


router.post('/deleteChild/:id', async function(req, res, next) {
  try {
    const { id } = req.params;  
    
    const updatedUser = await modelUser.findByIdAndUpdate(
        id, 
        { id_room: null},  
        { new: true } 
      );
    // console.log(updatedUser);
      
    if (updatedUser) {
      res.json({ message: "Cập nhật id_room thành rỗng thành công", updatedUser });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});




module.exports = router;
