const { verifyAccessToken } = require('../utils/token.util');

module.exports = (roles = []) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.sendStatus(401);

            const token = authHeader.split(' ')[1];
            const user = verifyAccessToken(token);
            req.user = user;

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}
