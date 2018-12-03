import connection from './../general-server-classes/Database'
import Library from './Library'

export default class PublisherLibrary extends Library{
    private subsidiaries: String[]

    constructor(name: String){
        super(name)
        this.subsidiaries.fill(connection.query("SELECT subsidiaries FROM publisher_table WHERE name = " + name, (err) =>{
            if(err){
                throw err
            }
            console.log("Got the subsidiaries.")
        }))
    }

    public getSubsidiaries(): String[]{
        return this.subsidiaries
    }
}