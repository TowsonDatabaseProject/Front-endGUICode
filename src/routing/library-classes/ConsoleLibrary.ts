import Library from './Library';
import connection from './../general-server-classes/Database';
import Game from './Game';

export default class ConsoleLibrary extends Library {
    private maker: String;
    private games: Game[];

    constructor(library: Library) {
        super(library.getName(), library.getOwner());
        async function pullMaker() {
            this.maker = await connection.query('SELECT OwnedBy FROM Systems WHERE name = \'' + name + '\';', (err) => {
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
