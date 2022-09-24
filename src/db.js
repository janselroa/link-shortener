const {connect} = require("mongoose")
connect(process.env.DBHOST).then(data=>console.log("Contectado a la base de datos")).catch(err=>console.log(err))
