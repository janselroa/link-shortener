const {Router} = require("express")
const db = require("../db")
const {join} = require("path")
const LinksModel = require("../models/Links")
const router = Router()

router.get("/:url",async (req, res)=>{
    const link = await LinksModel.findOne({newurl:req.params.url})
    if(link!=undefined) res.redirect(link.originalurl)
    else res.redirect("/")
})

router.get("/",(req, res)=>res.sendFile(join(__dirname,"../views","index.html")))

router.post("/",async(req, res)=>{
    const originalurl = req.body.originalurl
    const newurl = req.body.newurl
    console.log(req.body)
    if(!originalurl || !newurl) return res.status(400).json({message: "Todos los campos deben ser rellenados"})
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    if(!urlRegex.test(originalurl)) return res.status(400).json({message:"URL invalida"})
    if((await LinksModel.find({newurl})).length!=0) return res.status(400).json({message: "Este enlace ya esta registrado"})
    const newLink = await new LinksModel({originalurl, newurl})
    newLink.save((err, data)=>{
        console.log(err, data)
        if(!err) res.json({
            status: 200,
            message: "Link creado con exito!",
            newLink: newurl
        })
    })
})
module.exports = router
