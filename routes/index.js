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
const router = express.Router();

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

export default router;