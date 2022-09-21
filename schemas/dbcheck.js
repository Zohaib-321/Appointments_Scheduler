const {db }= require("../check/pgAdaptor")


db.one('SELECT * FROM job').then(res => {
    console.log(res);
});
