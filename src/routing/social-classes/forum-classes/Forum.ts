import connection from './../../general-server-classes/Database';

export default class Forum {
    private threads: String[];

    constructor() {
        async function queryDatabase() {
            this.threads.fill(await connection.query('SELECT Topics FROM DebateBoard', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Got topics.');
        }), 0, -1);
        }
        queryDatabase();
    }

    public getTopics(): String[] {
        return this.threads;
    }
}
