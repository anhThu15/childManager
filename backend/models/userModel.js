const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const khachHang = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    branh: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    id_room: {
        type: ObjectId,
        ref:'room'
        // required: true
    },
    id_parish: {
        type: ObjectId,
        ref:'parish',
        required: true
    }



});
module.exports = mongoose.models.user || mongoose.model('user', khachHang);