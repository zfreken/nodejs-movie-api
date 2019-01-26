const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');


    chai.use(chaiHttp);
    let token,movieId;

    describe('/api/movies tests',() => {
        before((done) => {
           chai.request(server)
               .post('/authenticate')
               .send({ username : 'zafer',password:'123456' })
               .end((err,res) => {
                   token = res.body.token;
                   console.log('token: ',token);
                   done();
               });

        });

        describe('/GET movies',() => {
            it('it should GET all the movies',(done) => {
                chai.request(server)
                    .get('/api/movies')
                    .set('x-access-token',token)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });

        describe('/POST movie', () => {
            it('should post a movie', (done) => {
                const movie = {
                    title:'Test title film',
                    director_id:'5c4394310e925f0d3d0c7eed',
                    country:'turkey',
                    category:'science',
                    year:1985,
                    imdb_point:7.9
                };
                chai.request(server)
                    .post('/api/movies')
                    .send(movie)
                    .set('x-access-token',token)
                    .end((req,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('director_id');
                        res.body.should.have.property('category');
                        res.body.should.have.property('country');
                        res.body.should.have.property('year');
                        res.body.should.have.property('imdb_point');
                        movieId = res.body._id;
                        done();
                    });

            });
        });

        describe('/GET/:movie_id movie',()=> {
            it('should GET a movie by the give id', (done) => {
                chai.request(server)
                    .get('/api/movies/'+movieId)
                    .set('x-access-token',token)
                    .end((err,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('director_id');
                        res.body.should.have.property('category');
                        res.body.should.have.property('country');
                        res.body.should.have.property('year');
                        res.body.should.have.property('imdb_point');
                        res.body.should.have.property('_id').eql(movieId);
                        done();
                    });
            });
        });

        describe('/PUT movie', () => {
            it('should update a movie given by id', (done) => {
                const movie = {
                    title:'no title',
                    director_id:'5c4394310e925f0d3d0c7eed',
                    country:'gana',
                    category:'crime',
                    year:1981,
                    imdb_point:7.3
                };
                chai.request(server)
                    .put('/api/movies/'+movieId)
                    .send(movie)
                    .set('x-access-token',token)
                    .end((req,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql(movie.title);
                        res.body.should.have.property('director_id').eql(movie.director_id);
                        res.body.should.have.property('category').eql(movie.category);
                        res.body.should.have.property('country').eql(movie.country);
                        res.body.should.have.property('year').eql(movie.year);
                        res.body.should.have.property('imdb_point').eql(movie.imdb_point);
                        done();
                    });

            });
        });

        describe('/DELETE/:movie_id movie', () => {
            it('should DELETE a movie given by id', (done) => {
                chai.request(server)
                    .delete('/api/movies/'+movieId)
                    .set('x-access-token',token)
                    .end((req,res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(1);
                        done();
                    });

            });
        });
    });


