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

// Pegar os dados dos agendamentos
router.get("/", async function(req, res){
    try {
        const schedules = await db.collection("agendamentos").find({}).toArray()
        res.json(schedules)
        
    } catch (error) {
        res.status(500).json({error: "Erro interno do servidor"})
    }
})


// Cadastro dos clientes
router.post("/cadastro", async function(req, res){
    try {
        const schedule = req.body
        const createdSchedule = {
            horario: schedule.horario,
            situacao: schedule.situacao,
            telefone: schedule.telefone,
            nome: schedule.nome,
            cpf: schedule.cpf,
        }
        const result = await db.collection("agendamentos").insertOne(createdSchedule)
        res.json(result)
        
    } catch (error) {
        res.status(500).json({error: "Erro interno do servidor"})
    }
})

// Pegar informações de um agendamento em especifico
router.get("/:id", async function(req, res){
    try {
        const id = req.params.id
        const schedule = await db.collection("agendamentos").findOne({_id: new ObjectId(id)})
        if(schedule){
            res.json(schedule)
        } else{
            res.status(404).json({error: "Agendamento não encontrado"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor"})
    }
})

module.exports = router
