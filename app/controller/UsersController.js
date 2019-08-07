import UserModel from '../models/User'
import AdminModel from '../models/Admin'
import EncryptData from '../../lib/helpers/EncryptPassword'
import createToken from '../../lib/helpers/jwtToken'
import config from '../../config/config'

class UserController {
  static async createUser(req, res) {
    const userExist = await UserModel.getUserByEmail(req.body.email)
    if (userExist)
      return res
        .status(400)
        .send({ status: 'error', error: 'User already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const userId = await UserModel.createUser(req.body)
    return res
      .status(201)
      .send({ status: 'success', message: 'User created successfully', userId })
  }

  static async createAdmin(req, res) {
    const adminExist = await AdminModel.getAdminEmail(req.body.email)
    if (adminExist)
      return res
        .status(400)
        .send({ status: 'error', error: 'Admin already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const message = await AdminModel.createAdmin(req.body)
    return res.status(201).send({ status: 'success', message })
  }

  static async loginUser(req, res) {
    const token = createToken(
      { id: req.user.id, role: req.user.role },
      config.secretKey,
      { expiresIn: config.jwtExpiration },
    )
    return res
      .status(200)
      .send({ status: 'success', message: 'LoggedIn successfully', token })
  }
}

export default UserController
