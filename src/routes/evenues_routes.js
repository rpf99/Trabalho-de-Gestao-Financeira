const express = require("express")
const route = express.Router()

const EvenueRepository = require("../repositories/evenueRepository")
const eRepo = new EvenueRepository()

const isAuthenticated = require("../passport/authentication")


let menuDescription = {
    title: "Gerenciando Despesas",
    insertLink: "/admDespesas/novaDespesa",
    updateLink: "/admDespesas/editarDespesa",
    removeLink: "/admDespesas/removerDespesa",
    insertButtonName: "Inserir Despesa",
    atributo: "Despesa",
    list:null
}

let evenueOptions = {
    url:null,
    title:null,
    buttonName:null,
    selected:null
}


route.get('/', isAuthenticated, async(req,res)=>{

    const evenueList = await eRepo.findAllByUser(req.user.id)
    
    menuDescription.list = evenueList

    res.render("pages/menu_evenue_revenue", {user:req.user, mainD:menuDescription})
})


route.get('/novaDespesa', isAuthenticated, (req,res)=>{

    evenueOptions.url = "/admDespesas/novaDespesa"
    evenueOptions.selected = null
    evenueOptions.title= "Nova Despesa"
    evenueOptions.buttonName="Adicionar"

    res.render("pages/evenue_revenue_edit",{error:null, user:req.user, options:evenueOptions})
})


route.post('/novaDespesa', isAuthenticated, (req,res)=>{
   
    let name = req.body.name;
    let value = parseFloat(req.body.value);

    if(name && value){
            
            eRepo.insert({name:name, value:value, UserId:req.user.id})
            res.redirect("/admDespesas")
    }else{
        res.render("pages/evenue_revenue_edit", { error:'Os campos deveriam estar preenchidos', 
                                                  user:req.user, options:evenueOptions})
    }
})


route.get('/editarDespesa/:id', isAuthenticated, async(req,res)=>{

    let id = parseInt(req.params.id)

    evenueOptions.url = `/admDespesas/editarDespesa/${id}`

    let evenue = await eRepo.findById(id)
    evenueOptions.selected = evenue

    evenueOptions.title= `Modificando ${evenue.name}`
    evenueOptions.buttonName="Atualizar"

    res.render("pages/evenue_revenue_edit",{error:null, user:req.user, options:evenueOptions})
})


route.post('/editarDespesa/:id', isAuthenticated, async(req,res)=>{

    let value = parseFloat(req.body.value);
    
    if(value){

            await eRepo.update({value:value}, parseInt(req.params.id))
            res.redirect("/admDespesas")
    }else{
        res.render("pages/evenue_revenue_edit",{ error:'O parametro apresentado deveria estar preenchido',
                                                 user:req.user, options:evenueOptions})
    }
})


route.post('/removerDespesa/:id', isAuthenticated, async(req,res)=>{

    let id = parseInt(req.params.id)
    
    await eRepo.delete(id)
    res.redirect('/')
})


module.exports=route