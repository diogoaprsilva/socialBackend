const path = require('path')

const getImage = async (req, res) => {
    console.log("in getFile")

    try{
    let image = req.params.image
    
    const myPath = path.resolve(process.cwd(), "uploads", image);
    res.sendFile(myPath);
    }catch(e){
        console.log(e)
    }
    

}

module.exports ={getImage}