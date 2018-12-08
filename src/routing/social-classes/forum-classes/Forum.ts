import connection from './../../general-server-classes/Database';

export default class Forum {
    private threads: String[];

    constructor() {
<<<<<<< HEAD
        this.threads.fill(connection.query('SELECT TopicTitle FROM Topics', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got topics.');
=======
        async function queryDatabase() {
            this.threads.fill(await connection.query('SELECT Topics FROM DebateBoard', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Got topics.');
>>>>>>> bfd778cadf5afe27ec4b645a8c841f5a293d86c0
        }), 0, -1);
        }
        queryDatabase();
    }

    public getTopics(): String[] {
        return this.threads;
    }
}
