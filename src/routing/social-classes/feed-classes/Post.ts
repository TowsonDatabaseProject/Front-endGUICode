import connection from './../../general-server-classes/Database';

export default class Post {
    private ownerId: String;
    private ownerUsername: String;
    private message: String;
    private timePosted;
    private belongsTo: String;
    private feedId: String;

    constructor (feedId: String) {
        this.feedId = feedId;
        async function setUpClass() {
            this.ownerId = await connection.query('SELECT BelongsTo FROM Post WHERE FeedID = \'' + feedId + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We did it scoob');
            });
            this.ownerUsername = await connection.query('SELECT UserName FROM Post WHERE OwnerID = \'' + this.ownerId + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('We too good scoob');
            });
            this.message = await connection.query('SELECT Message FROM Post WHERE FeedID = \'' + feedId + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Here\'s the peanut butter scoob');
            });
            this.timePosted = await connection.query('SELECT Time FROM Post WHERE FeedID = \'' + feedId + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('MOAR PEANUT BUTTER SCOOBY DOO');
            });
            this.belongsTo = await connection.query('SELECT BelongsTo FROM Post WHERE FeedID = \'' + feedId + '\'', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Gorgonzola now scood');
            });
        }
        setUpClass();
    }

    public getPosts() {
        return this;
    }
}
