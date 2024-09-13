const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const phong = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    quantity: {
        type: Number,
        required: true
    },
    id_parish: {
        type: ObjectId,
        ref:'parish',
        required: true
    }



});
module.exports = mongoose.models.room || mongoose.model('room', phong);