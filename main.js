const ImageKit = require("imagekit");
const express = require('express')
const fs = require('fs');
const multer = require("multer");
const cors = require('cors');
const connectDB = require("./connection")
const ImageModel= require("./models/imageModel")


connectDB();


const storage = multer.memoryStorage();

const upload = multer({storage: storage});



const imagekit = new ImageKit({
    publicKey : "public_+Wdv2HD0+8HAQAbVC+Vkav50vAw=",
    privateKey : "private_PKoR11akpCv1bzHBgkWnpgurlTY=",
    urlEndpoint : "https://ik.imagekit.io/eahpoqsjfp/"
});


const app = express()
const port = 4000

app.use(cors())

app.post('/upload', upload.single('file'), (req, res)=>{
    if(!req.file){
        return res.status(400).json({error : "No file uploaded"});
    }else{
        const FileData = req.file.buffer;
        const FileName = req.body.name;

        imagekit.upload({
                  file : FileData,
                  fileName : FileName,
                  tags: ["tag1", "tag2"]
                }, function(error, result) {
                  if(error){
                    console.log(error);
                    return res.status(500).json({ error: 'Failed to process file' });
                  } 
                  else {
                    try {
                        const UploadImage = new ImageModel({
                            imageName: req.body.name,
                            discription:req.body.discription,
                            tag:req.body.tag,
                            fileName: result.name,
                            imageId: result.fileId,
                            url : result.url,
                            tham_url : result.thumbnailUrl
                        })
                        UploadImage.save();
                        console.log("Image uploaded successfully")
                        res.json({ success: true, result });
                        
                    } catch (error) {
                        console.log(error)
                    }
                  }
                
                });
    }
})

app.get('/', async(req, res) => {
    const data = await ImageModel.find();
    
    // console.log(data)   
    res.json(data)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
