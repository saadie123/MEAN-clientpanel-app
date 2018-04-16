module.exports = (req, res, next) => {
    if(!req.user){
        res.status(401).send({message: 'You are not logged in!', success: false});
    } else {
        next();
    }
}