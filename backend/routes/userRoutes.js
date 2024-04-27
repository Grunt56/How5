const { ObjectId } = require("mongodb")
const express = require("express")
const router = express.Router()
let db
const MongoClient = require("mongodb").MongoClient
const url = "mongodb+srv://admin:admin@how5.4hfmfty.mongodb.net/sistema_massagem?retryWrites=true&w=majority&appName=How5"
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})

// Conexão ao banco de dados
async function connectDb(){
    try { 
        await client.connect()
        console.log("conexao estabelecida")
        db = client.db()
    } catch (error) {
        console.error(error)
        
    }
}
connectDb()

// Pegar os dados dos usuários
router.get("/", async function(req, res){
    try {
        const users = await db.collection("usuarios").find({}).toArray()
        res.json(users)
        
    } catch (error) {
        res.status(500).json({error: "Erro interno do servidor"})
    }
})


// Cadastro dos clientes
router.post("/cadastro", async function(req, res){
    try {
        const user = req.body
        const createdUser = {
            telefone: user.telefone,
            nome: user.nome,
            cpf: user.cpf,
            senha: user.senha
        }
        const result = await db.collection("usuarios").insertOne(createdUser)
        res.json(result)
        
    } catch (error) {
        res.status(500).json({error: "Erro interno do servidor"})
    }
})

// Pegar informações de um usuário em especifico
router.get("/:id", async function(req, res){
    try {
        const id = req.params.id
        const user = await db.collection("usuarios").findOne({_id: new ObjectId(id)})
        if(user){
            res.json(user)
        } else{
            res.status(404).json({error: "Usuario não encontrado"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor"})
    }
})

module.exports = router
