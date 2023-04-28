import express from "express";
import { Login, Logout, getUsers } from "../controllers/User.js";
import multer from "multer";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { IndexMenu } from "../controllers/Menu.js";
import { IndexRegional } from "../controllers/Regional.js";
import { IndexCluster } from "../controllers/Cluster.js";
import { IndexTeam } from "../controllers/Team.js";
import { IndexSite } from "../controllers/Site.js";
import { IndexTicket } from "../controllers/Ticket.js";
import { Store } from "../controllers/CorrectiveSite.js";
const router = express.Router();

const date = new Date();

let year = date.getFullYear();
let month = ("0" + (date.getMonth() + 1)).slice(-2)

//route
router.get("/", (req, res) => {
        res.formatter.ok({
            status: 'online'
        })
    })
    //auth route
router.post('/login', multer().none(), Login);
router.post('/logout', multer().none(), Logout);
router.get('/token', multer().none(), refreshToken);

//get current logged in user
router.get('/users', verifyToken, getUsers);

//get list data
router.get('/menu', verifyToken, IndexMenu)
router.get('/regional', verifyToken, IndexRegional)
router.get('/cluster', verifyToken, IndexCluster)
router.get('/team', verifyToken, IndexTeam)
router.get('/site', verifyToken, IndexSite)
router.get('/menu/:id/ticket-list', verifyToken, IndexTicket)

//store corrective site
const multerCorrective = multer({ dest: `public/images/corrective/${year}/${month}/` }).array('image[]', 10)
router.post('/corrective-site', multerCorrective, verifyToken, Store)

export default router;