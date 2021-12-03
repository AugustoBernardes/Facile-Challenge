const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const password = process.env.PASSWORD
// ===================================
// Importing model
const Name = require('../Model/NameModel')


// Home Page
const loadHomePage = (req,res) => {
    res.status(200)
    res.send({
        name:"Augusto",
        github:"https://github.com/AugustoBernardes",
        message:"Hi welcome!"
    })
}


// Encrypt
const encrypting = async (req,res) => {
    // Getting Name
    let receivedName = req.body.name.trim()

    try {

        if(receivedName === ''){
            res.status(400)
            res.send({
                code:"VALIDATION_FAILURE",
                message:"The input (NAME) is mandatory!"
            })
        }else{
            // Encrypting the name received
            const cipher = crypto.createCipher(algorithm,password);
            const crypted = cipher.update(receivedName,'utf-8','hex');

            // Creating the object
            let DbObject = {
                name: crypted
            }

            // Saving the name
            let name = new Name(DbObject)
            let savedName = await name.save()

            // Returning status
            res.status(200)
            res.send({
                id:savedName.id,
                name:savedName.name
            })
        }
    } catch (error) {

        res.status(400)
        console.error({
            code:"INTERNAL_ERROR",
            message:"Happened a error !"
        })
    }
    
}

const decrypting = async (req,res) => {
    // Getting the ID
    let receivedId = req.params.id

    try {
        let object = await Name.findById(receivedId)

        const decipher = crypto.createDecipher(algorithm,password)
        const decryptedText = decipher.update(object.name,'hex','utf-8')

        res.status(200)
        res.send({
            id:object.id,
            name:decryptedText
        })
    } catch (error) {
        res.status(400)
        res.send({
            code:"ID_FAILURE",
            message:`ID (${receivedId}) wasn't find!`
        })
    }
}

module.exports = {encrypting,loadHomePage,decrypting}