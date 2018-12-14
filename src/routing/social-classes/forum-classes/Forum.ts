import connection from './../../general-server-classes/Database';

export default class Forum {
    private threads: String[];

    constructor() {
        async function queryDatabase() {
            this.threads = await connection.query('SELECT TopicTitle FROM Topics;', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Got topics.');
        });
        }
        queryDatabase();
    }

    public getTopics(): String[] {
        return this.threads;
    }
}
