import generateToken from '../middlewares/auth.js';

class ApiGatewayController {
    static userLogin = async (req, res) => {
        try {
            const token = await generateToken(req.user);
            return res.set('Authorization', token).status(204).send();
        } catch (err) {
            return res.status(400).send(err.message);
        }
    };
}

export default ApiGatewayController;