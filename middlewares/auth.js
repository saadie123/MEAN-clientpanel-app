module.exports = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.status(401).send({message: 'You are not logged in!', success: false});
    }
}