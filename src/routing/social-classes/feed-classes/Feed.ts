import User from './../../user-classes/User';
import connection from './../../general-server-classes/Database';
import Post from './Post';

export default class Feed {
    private companiesSubscribedTo: String[];
    private id: String;
    private posts: Post[];

    constructor() {
         this.companiesSubscribedTo = null;
         this.id = null;
    }

    private async getId(userId: number) {
        this.id = await connection.query('SELECT FeedID FROM Feed WHERE FeedID = \'' + userId + '\';', (err) => {
            if (err) {
                return err;
            }
            console.log('Got the FeedID');
        });
    }

    public async getCompaniesSubscribedTo(userId: number) {
        if (this.id === null) {
            this.getId(userId);
        }
        return this.companiesSubscribedTo = await connection.query('SELECT CompaniesWatched FROM Feed '
        + 'WHERE Group_id IN \(SELECT Username FROM User WHERE UserID = \'' + this.id + '\'\);', (err) => {
            if (err) {
                return err;
            }
            console.log('We got the companies followed');
        });
    }

    public setPosts() {
        this.companiesSubscribedTo.map(async (item: String, index: number, feedArray: String[]) => {
            feedArray[index] = await connection.query('SELECT Group_id FROM Feed WHERE UserID = \'' + this.id + '\';');
            this.posts[index] = new Post(feedArray[index]);
        });
    }

    public getPosts() {
        return this.posts;
    }
}
