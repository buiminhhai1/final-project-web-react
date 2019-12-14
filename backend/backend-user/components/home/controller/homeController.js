
const ProfileModel = require('../../users/model/profileModel');

exports.getTutorList = async(req,res,next) =>{
    var filter = {title,location} = {...req.query,minPrice:undefined,maxPrice:undefined};
    const {minPrice,maxPrice} = req.query;

    const query = ProfileModel.find({...filter});
    if(!!minPrice) query.where('price').gte(minPrice);
    if( !!maxPrice) query.where('price').lte(maxPrice);
    const results = await query.exec();
    res.json(results);
}

exports.getTutorDetail = async(req,res,next)=>{
    const {id} = req.params;
    const results = await ProfileModel.findOne({_id:id});
    res.json(results);
}