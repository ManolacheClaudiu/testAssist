const express = require('express');
const router = express.Router();


function validateclub(club){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(club, schema);
}

const clubs = [
    { id: 1, name: 'club1', email:"club1@email.com", passwordHash:"1234"},
    { id: 2, name: 'club2', email:"club2@email.com", passwordHash:"1234"},
    { id: 3, name: 'club3', email:"club3@email.com", passwordHash:"1234"},

];



router.get('/',(req, res)=>{
    res.send(clubs);
});

router.post('/', (req,res)=>{
    const { error } = validateclub(req.body);


    if (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }


    const club = {
        id: clubs.length +1,
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash
    };
    clubs.push(club);
    res.send(club);
});


router.put('/:id', (req, res) => {

    const club = clubs.find( c=> c.id ===parseInt(req.params.id));   
     if(!club)//404 
        return res.status(404).send('The club with the given Id was not found');

    //validate 
    //if invalid, return 400 -- bad request
    const { error } = validateclub(req.body);


    if (error){
        //400 bad request
        return res.status(400).send(error.details[0].message);
        return;
    }

    club.name = req.body.name;
    res.send(club);
});

router.delete('/:id', (req, res) =>{
    //look up the club
    //not existing, return 404
    const club = clubs.find( c=> c.id ===parseInt(req.params.id));   
    if(!club)//404 
       return res.status(404).send('The club with the given Id was not found');

    //delete 
    const index = clubs.indexOf(club);
    clubs.splice(index, 1);


    //return the same club
    res.send(club);
});




router.get('/:id',(req,res)=>{
     const club = clubs.find( c=> c.id ===parseInt(req.params.id));   
     if(!club)//404 
        return res.status(404).send('The club with the given Id was not found');
    res.send(club)
});

module.exports = router;