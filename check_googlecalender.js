const { db } = require("./check/pgAdaptor");







db.one('SELECT * FROM googlecalendar').then(res => {


    console.log(res)
})