const getAnonymousToken = async (req, res) => {
    res.json({
        Message: "token here",
        Status: 200
    })
};

const ping = async (req, res) => {
    if(!req.headers || !req.headers.authorization) {
        res.status(401).json({
            Message: "authentication token is missing from header",
            status: 401
        })
    } else {
        res.json({
            Message: "Server  is up",
            status: 200
        })
    }
}

module.exports = {
    getAnonymousToken: getAnonymousToken,
    ping: ping
}