var Userdb = require('../model/model');
const countWordsInWebpage = require('./wordcounter'); //importing the word counting file


exports.create = async (req, res) => {
    const url = req.body.name; //the url

    // validate request
    if (!req.body) {
        alert("The URL Field is empty");
        res.redirect('/');
      }
  
    try {
      console.log("start");

      // counting the words of the webpage
      const totalWordCount = await countWordsInWebpage(url);
      console.log('The total word count is:', totalWordCount);
  
      
  
      // new user
      const user = new Userdb({
        name: req.body.name,
        email: totalWordCount,
        gender: req.body.email,
        status: req.body.status,
      });
  
      // saving new user in the database
      user
        .save(user)
        .then(data => {
          res.redirect('/');
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Unknown Error",
          });
        });
  
      console.log("exit");
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

// get all the data
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Unknown error" })
            })
    }

    
}

// Update the entry
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete the user
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}