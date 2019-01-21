const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Db
const Director = require('../models/Director');

router.post('/', (req,res) => {

    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json({ status:1,message:'Success' });
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/', (req,res) => {

    const promise = Director.aggregate([
        {
            $lookup: {
                from:'movies',
                localField: '_id',
                foreignField:'director_id',
                as:'movie'
            }
        },
        {
            $unwind: {
                path:'$movie',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                    _id: {
                        _id:'$_id',
                        name:'$name',
                        surname: '$surname',
                        bio: '$bio'
                    },
                    movies :{
                        $push:'$movie'
                    }
            }
        },
        {
            $project: {
                _id:'$_id._id',
                name:'$_id.name',
                surname: '$_id.surname',
                movie:'$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:director_id', (req,res) => {

    const promise = Director.aggregate([
        {
            //where gibi hangi id ye sahip yönetmenlerin gösterimesi
            $match: { _id:mongoose.Types.ObjectId(req.params.director_id) }
        } ,
        {
            //join kısmını burası yapıyor.
            $lookup: {
                from:'movies',
                localField: '_id',
                foreignField:'director_id',
                as:'movie'
            }
        },
        {
            $unwind: {
                path:'$movie',
                preserveNullAndEmptyArrays:true
                //filmi olmayan directorleri de almış oluyoruz.
            }
        },
        {
            $group: {
                _id: {
                    _id:'$_id',
                    name:'$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies :{
                    $push:'$movie'
                }
            }
        },
        {
            $project: {
                _id:'$_id._id',
                name:'$_id.name',
                surname: '$_id.surname',
                movie:'$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:director_id',(req,res,next) => {

    const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});

    promise.then((director) => {
        if (!director)
            next({ message : 'Director was not found', code:97 });
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });

});


router.delete('/:director_id',(req,res,next) => {

    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((director) => {
        if (!director)
            next({ message : 'Director was not found', code:96 });
        res.json({status:'Deleted',code:1});
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;