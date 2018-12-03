

class Database{
    private mysql = require('mysql')
    
    connection = this.mysql.createConnection({
        host: "to be entered",
        username: "alynch14",
        password: ""
    })

    constructor(){
        this.connection.connect((err) =>{
            if(err){
                throw err;
            }
            console.log("Connected!")
        })
    }
}

export default new Database().connection