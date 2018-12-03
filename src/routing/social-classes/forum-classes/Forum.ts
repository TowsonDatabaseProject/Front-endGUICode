import connection from './../../general-server-classes/Database';

export default class Forum {
    private threads: String[];

    constructor() {
        this.threads.fill(connection.query('SELECT TopicTitle FROM Topics', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got topics.');
        }), 0, -1);
    }

    public getTopics(): String[] {
        return this.threads;
    }
}
