import Library from './Library';
import connection from './../general-server-classes/Database';

export default class ConsoleLibrary extends Library {
    private maker: String;

    constructor(library: Library) {
        super(library.getName(), library.getOwner());
        async function pullMaker() {
            this.maker = await connection.query('SELECT maker FROM console_table WHERE name = ' + name, (err) => {
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
