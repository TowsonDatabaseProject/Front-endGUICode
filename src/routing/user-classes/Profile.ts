import connection from './../general-server-classes/Database'

class Profile {
    private firstName: String
    private lastName: String
    private libraryName: String[]
    private id: String

    public constructor(){
        this.firstName = ''
        this.lastName = ''
        this.libraryName = new Array()
        this.id = null
    }

    public getProfileInfo(): String {
        this.firstName = connection.query("SELECT first_name FROM users WHERE id_number = " + this.id, (err) =>{
            if(err){
                throw err;
            }
            console.log('got firstName')
        })
        this.lastName = connection.query("SELECT last_name FROM users WHERE id_number = " + this.id, (err) =>{
            if(err){
                throw err;
            }
            console.log('got lastName')
        })

        let name = this.firstName + " " +  this.lastName

        return name
    }

    public getLibraryName(): String[] {
        this.libraryName.fill(connection.query("SELECT name FROM library WHERE id_number = " + this.id, (err) =>{
            if(err){
                throw err;
            }
            console.log("got libraryName")
        }), 0, -1)
        return this.libraryName
    }

    public setID(id: String){
        this.id = id
    }
}

export default new Profile()