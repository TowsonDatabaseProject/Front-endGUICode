import * as express from 'express'
import User from './../user-classes/User'
import userProfile from './../user-classes/Profile'
import library from '../library-classes/Library'
import Profile from './../user-classes/Profile';
import PublisherLibrary from '../library-classes/PublisherLibrary';
import AdminUser from '../user-classes/AdminUser';

class App{
    public express
    private user: User

    constructor() {
        this.express = express()
        this.user = new User()
        this.mountRoutes()
    }

    //Mounts all routes for our application
    private mountRoutes (): void {
        const router = express.Router()
        router.get('/', (req, res) => {
            res.json({
                message: 'Home Page'
            })
        })

        router.param('userID', (req, res, next, userID) => {
            if(this.user.validateUser(req.param.userName, req.param.password)){
                userID = this.user.getID()
            }
            next()
        })

        router.get('/:userID', (req, res) => {
            res.send(req.param.userID)
        })

        if(this.user.isAdmin()){
            // this.user = new AdminUser(this.user)
        }

        router.get('/:userID/main_page', (req, res) =>{

        })
        
        router.get('/:userID/profile', (req, res) => {
            Profile.setID(this.user.getID())
            res.send(Profile)
        })
        router.get('/:userID/library', (req, res) => {
            
        })
        router.get('/:console', (req, res) =>{

        })
        router.get('/:publisher', (req, res) =>{
            // res.send(new PublisherLibrary())
        })
        router.get('/:developer', (req, res) =>{

        })
        router.get('/forum', (req, res) => {

        })
        
        router.param('thread', (req, res, next, thread) => {
            
        })

        router.get('/forum/:thread', (req, res) => {
            
        })
        this.express.use('/', router)
    }
}

export default new App().express