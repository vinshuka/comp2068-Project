const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/CharactersController');

function auth (req, res, next) {
    if(!req.isAuthenticated()) {
        return res.status(401).json({message: "You must authenticate first"});
    }
    next();
}

module.exports = router => {
    router.get('/characters', index); // public
    router.get('/characters/new', auth, _new); // authenticated
    router.post('/characters', auth, create);
    router.post('/characters/update', auth, update); // authenticated
    router.post('/characters/delete', auth, _delete); // authenticated
    router.get('/characters/:id/edit', auth, edit); // authenticated
    router.get('/characters/:id', show); // public
};