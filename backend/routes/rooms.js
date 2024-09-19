var express = require('express');
var router = express.Router();

var modelRoom = require('../models/roomModel');


router.get('/', async function(req, res, next) {
  const data = await modelRoom.find()
  res.json(data)
})


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


router.post('/editRoom/:id', async function(req, res, next) {
  try{
    var {id} = req.params
    const {name, quantity} = req.body
    const roomEdit = await modelRoom.findById(id)

    if(name != null){
      roomEdit.name  = name ? name: roomEdit.name;
      roomEdit.quantity  = quantity ? quantity: roomEdit.quantity;

      var result = await roomEdit.save();
      
      if(result != null){
        res.json({status: 1, message:"Thành công", data:result});
        // res.redirect('/admins/product');
      }else{
        res.json({status: 0, message:"thất bại"});
      }
    }

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




module.exports = router;
