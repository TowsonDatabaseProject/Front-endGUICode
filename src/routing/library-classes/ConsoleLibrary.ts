import Library from './Library'
import connection from './../general-server-classes/Database'

export default class ConsoleLibrary extends Library {
    private maker: String

    constructor(name: String){
        super(name)
        this.maker = connection.query("SELECT maker FROM console_table WHERE name = " + name, (err) =>{
            if(err){
                throw err
            }
            console.log("We got the maker")
        })
    }

    public getMaker(): String{
        return this.maker
    }
}