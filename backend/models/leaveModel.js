const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const nghiphep = new Schema({
    id: { type: ObjectId }, // khóa chính
    description: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    date: {
        type: String,
        required: true
    },
    check: {
        type: Boolean, // kiểu dữ liệu
        // required: true, 
        default: null// bắt buộc phải có
    },
    id_user: {
        type: ObjectId,
        ref:'user',
        required: true
    }



});
module.exports = mongoose.models.leave || mongoose.model('leave', nghiphep);