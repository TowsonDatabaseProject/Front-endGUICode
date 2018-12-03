import connection from '../general-server-classes/Database'

export default class Library{
    protected name: String
    protected gameList: String[]
    protected libID: String

    constructor(name: String){
        this.name = name
        this.gameList = Array()
    }

    public getGameList(): String[]{
        this.gameList.fill(connection.query("SELECT ", (err) =>{
            if(err){
                throw err;
            }
            console.log("we got the list")
        }), 0, -1)
        return this.gameList
    }

    public getLibID(): String{
        return this.libID
    }

    public getName(): String{
        return this.name
    }
}