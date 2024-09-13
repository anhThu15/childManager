const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const giaoxu = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
    },
    christendom:[
        {
            name: {type: String}
        }
    ]



});
module.exports = mongoose.models.parish || mongoose.model('parish', giaoxu);