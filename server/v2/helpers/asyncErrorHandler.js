export default (fn) => {
    return async(req, res) => {
        try {
            await fn(req, res);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    };
};
