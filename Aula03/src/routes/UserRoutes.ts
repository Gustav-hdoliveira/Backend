import { Router } from "express"
import { UserControleer } from "../controllers/UserController"

const router = Router()

const controller = new UserControleer()

router.get('/Users', controller.listAllUsers)
router.post('/Users', controller.createUser)
router.post('/Users', controller.updateUser)
router.post('/Users', controller.deleteUser)

export default router;