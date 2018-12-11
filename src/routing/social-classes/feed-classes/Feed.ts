import User from './../../user-classes/User';
import connection from './../../general-server-classes/Database';
import Post from './Post';

export default class Feed {
    // private usersSubscribedTo: User[];
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
        return this.companiesSubscribedTo.fill(await connection.query('SELECT CompaniesWatched FROM Feed '
        + 'WHERE FeedID = \'' + this.id + '\';', (err) => {
            if (err) {
                return err;
            }
            console.log('We got the companies followed');
        }));
    }

    public setPosts() {
        this.companiesSubscribedTo.map(async (item: String, index: number, feedArray: String[]) => {
            feedArray[index] = await connection.query('SELECT FeedID FROM Feed WHERE UserID IN \(SELECT UserID FROM User WHERE UserID = \''
            + item + '\'\);');
            this.posts[index] = new Post(feedArray[index]);
        });
    }

    public getPosts() {
        return this.posts;
    }
}
