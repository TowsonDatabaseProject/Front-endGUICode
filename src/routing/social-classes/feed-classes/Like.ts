import connection from './../../general-server-classes/Database';
import Post from './Post';

export default class Like {
    private id: String;
    private postedBy: String;
    private postId: String;
    private numberOfLikes: number;

    constructor() {
        this.id = null;
        this.postedBy = null;
        this.postId = null;
        this.numberOfLikes = 0;
    }

    public async getLikesForPost(post: Post) {
        this.id = post.getUser();
        this.postedBy = post.getUsername();
        this.postId = post.getPostId();
        const likeArray: String[] = await connection.query('SELECT LikeID FROM Likes WHERE PostID = \'' + this.postId + '\';', (err) => {
            if (err) {
                throw err;
            }
            console.log('Got number of likes for post');
        });
        likeArray.forEach( (item, index, array) => {
            this.numberOfLikes++;
        });
    }

    public async addLike(userId: String, postId: String, postedBy: String) {
        await connection.query('INSERT INTO Likes (LikeID, PostedBy, PostID) VALUES '
        + '( \'' + userId + '\', \'' + postedBy + '\', \'' + postId + '\');', (err) => {
            if (err) {
                throw err;
            }
            console.log('Added Like to table.');
        });
    }
}
