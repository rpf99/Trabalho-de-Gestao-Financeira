const express = require("express")
const route = express.Router()

const RevenueRepository = require("../repositories/revenueRepository")
const reRepo = new RevenueRepository()

const isAuthenticated = require("../passport/authentication")


let menuDescription = {
    title: "Gerenciando Receitas",
    insertLink: "/admReceitas/novaReceita",
    updateLink: "/admReceitas/editarReceita",
    removeLink: "/admReceitas/removerReceita",
    insertButtonName: "Inserir Receita",    
    atributo: "Receita",
    list:null
}

let revenueOptions = {
    title:null,
    url:null,
    buttonName:null,
    selected:null
}


route.get('/', isAuthenticated, async(req,res)=>{

    const revenueList = await reRepo.findAllByUser(req.user.id)

    menuDescription.list = revenueList

    res.render("pages/menu_evenue_revenue", {user:req.user, mainD:menuDescription})
})


route.get('/novaReceita', isAuthenticated, async(req,res)=>{

    revenueOptions.title="Nova Receita"
    revenueOptions.selected = null
    revenueOptions.url = "/admReceitas/novaReceita"
    revenueOptions.buttonName='Adicionar'

    res.render("pages/evenue_revenue_edit", {error:null, user:req.user, options:revenueOptions})
})


route.post('/novaReceita', isAuthenticated, async(req,res)=>{

    let name = req.body.name;
    let value = parseFloat(req.body.value);

    if(name && value){

            reRepo.insert({name:name, value:value, UserId:req.user.id})
            res.redirect('/admReceitas')
    }else{
        res.render("pages/evenue_revenue_edit", {  error:'Os campos deveriam estar preenchidos',
                                                   user:req.user, options:revenueOptions})
    }
})


route.get('/editarReceita/:id', isAuthenticated, async(req,res)=>{

    const id = parseInt(req.params.id)

    revenueOptions.url=`/admReceitas/editarReceita/${id}`

    const revenue = await reRepo.findById(id)
    revenueOptions.selected = revenue

    revenueOptions.title=`Modificar ${revenue.name}`
    revenueOptions.buttonName="Atualizar"

    res.render("pages/evenue_revenue_edit", {error:null, user:req.user, options:revenueOptions})
})


route.post('/editarReceita/:id', isAuthenticated, async(req,res)=>{

    let id = parseInt(req.params.id)
    let value = req.body.value

    if(value){

            await reRepo.update({value:value}, id)
            res.redirect('/admReceitas')
    }else{
        res.render("pages/evenue_revenue_edit",{ error:'o parametro apresentado deveria estar preenchido', 
                                                 user:req.user, options:revenueOptions})
    }
})


route.post('/removerReceita/:id', isAuthenticated, async(req,res)=>{

    let id = parseInt(req.params.id)

    await reRepo.delete(id)
    res.redirect('/')
})


module.exports=route