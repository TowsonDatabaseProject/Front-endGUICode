import Library from './Library';
import connection from '../general-server-classes/Database';

export default class LicensorLibrary extends Library {
    private maker: String;

    constructor(name: String, userID: String) {
        super(name, userID);
        async function pullMaker() {
            this.maker = await connection.query('SELECT maker FROM Licensor WHERE name = \'' + name + '\';', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We got the maker');
            });
        }
        pullMaker();
    }

    public getMaker(): String {
        return this.maker;
    }
}
