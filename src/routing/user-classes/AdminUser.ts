import connection from './../general-server-classes/Database'
import User from './User'

export default class AdminUser extends User{
    private levelOfAccess: number

    constructor(){
        super()
        this.levelOfAccess = 0;
    }

    public getLevelOfAccess(){
        this.levelOfAccess = connection.query('SELECT access_level FROM admin_table WHERE')
    }
}