const express = require('express');
const router = express.Router();


//Model

const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
  //const {title, imdb_point,category,country,year} = req.body;

  const movie = new Movie(req.body);

/*  movie.save((err,data) => {
    if (err)
      res.json(err);

    res.json(data);
  });*/

  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
     res.json(err)
  });

});

router.get('/',(req,res,next) => {

  const promise = Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});

//top10 list
router.get('/top10',(req,res,next) => {

    const promise = Movie.find({ }).limit(10).sort({imdb_point:-1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/:movie_id',(req,res,next) => {

  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if (!movie)
      next({ message : 'Movie was not found', code:99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });

});

router.put('/:movie_id',(req,res,next) => {

    const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});

    promise.then((movie) => {
        if (!movie)
            next({ message : 'Movie was not found', code:99 });
        res.json(movie);
    }).catch((err) => {
        res.json(err);
    });

});

router.delete('/:movie_id',(req,res,next) => {

    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie) => {
        if (!movie)
            next({ message : 'Movie was not found', code:99 });
        res.json({status:1});
    }).catch((err) => {
        res.json(err);
    });

});


router.get('/between/:start_year/:end_year',(req,res) => {
  const { start_year , end_year } = req.params;
  const promise = Movie.find({ year: { "$gt" : parseInt(start_year),"$lte" : parseInt(end_year)  } });

   promise.then((data) => {
       res.json(data);
   }).catch( (err) => {
       res.json(err);
   })
});



module.exports = router;
