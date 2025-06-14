const userService = require('../services/user.service');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/token.util');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await userService.registerUser(name, email, password, role);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.loginUser(email, password);

        const payload = { id: user._id, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.json({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};
exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        const payload = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken({ id: payload.id, role: payload.role });

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        next(err);
    }
};