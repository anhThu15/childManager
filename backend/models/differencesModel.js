const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const nhanxet = new Schema({
    id: { type: ObjectId }, // khóa chính
    check: {
        type: Boolean, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    date: {
        type: String,
        required: true
    },
    id_user: {
        type: ObjectId,
        ref:'user',
        required: true
    }



});
module.exports = mongoose.models.feedback || mongoose.model('feedback', nhanxet);