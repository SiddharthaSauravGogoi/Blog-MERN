import { register, login } from '../controllers/auth.controller';

const authRoutes = (app) => {
    app.route('/register')
        .post(register)
    app.route('/signin')
        .post(login)
}

export default authRoutes