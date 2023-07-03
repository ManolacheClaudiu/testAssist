const express = require('express');
const router = express.Router();


function validateUser(user){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema);
}

const users = [
    { id: 1, name: 'user1', email:"user1@email.com", passwordHash:"1234"},
    { id: 2, name: 'user2', email:"user2@email.com", passwordHash:"1234"},
    { id: 3, name: 'user3', email:"user3@email.com", passwordHash:"1234"},

];



router.get('/',(req, res)=>{
    res.send(users);
});

router.post('/', (req,res)=>{
    const { error } = validateUser(req.body);


    if (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }


    const user = {
        id: users.length +1,
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash
    };
    users.push(user);
    res.send(user);
});


router.put('/:id', (req, res) => {

    const user = users.find( c=> c.id ===parseInt(req.params.id));   
     if(!user)//404 
        return res.status(404).send('The user with the given Id was not found');

    //validate 
    //if invalid, return 400 -- bad request
    const { error } = validateUser(req.body);


    if (error){
        //400 bad request
        return res.status(400).send(error.details[0].message);
        return;
    }

    user.name = req.body.name;
    res.send(user);
});

router.delete('/:id', (req, res) =>{
    //look up the user
    //not existing, return 404
    const user = users.find( c=> c.id ===parseInt(req.params.id));   
    if(!user)//404 
       return res.status(404).send('The user with the given Id was not found');

    //delete 
    const index = users.indexOf(user);
    users.splice(index, 1);


    //return the same user
    res.send(user);
});




router.get('/:id',(req,res)=>{
     const user = users.find( c=> c.id ===parseInt(req.params.id));   
     if(!user)//404 
        return res.status(404).send('The user with the given Id was not found');
    res.send(user)
});

module.exports = router;