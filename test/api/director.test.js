const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');


chai.use(chaiHttp);
let token,directorId;

describe('/api/directors tests',() => {
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

    describe('/GET directors', () => {
        it('it should GET all the directors',(done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST director',() => {
        it('should POST a director', (done) => {
            const director = {
                name:'Alper',
                surname:'Caniguz',
                bio:'just normal director'
            };
            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token',token)
                .end( (err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    directorId = res.body._id;
                    console.log(res.body);
                    done();
                });
        });

    });

    describe('/GET/:director_id movie',()=> {
        it('should GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('surname');
                    res.body[0].should.have.property('movie');
                    res.body[0].should.have.property('_id').eql(directorId);
                    console.log(res.body[0]);
                    done();
                });
        });
    });

    describe('/PUT director', () => {
        it('should update a director given by id', (done) => {
            const director = {
                name:'Alperrr',
                surname:'polat',
                bio:'i dont know'
            };
            chai.request(server)
                .put('/api/directors/'+directorId)
                .send(director)
                .set('x-access-token',token)
                .end((req,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    done();
                });

        });
    });

    describe('/DELETE/:director_id director', () => {
        it('should DELETE a director given by id', (done) => {
            chai.request(server)
                .delete('/api/directors/'+directorId)
                .set('x-access-token',token)
                .end((req,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Deleted');
                    done();
                });

        });
    });

});


