const express = require("express")
const route = express.Router()


const evenueRepository = require("../repositories/evenueRepository")
const evRepo = new evenueRepository()


const revenueRepository = require("../repositories/revenueRepository")
const rvRepo = new revenueRepository()

const isAuthenticated = require("../passport/authentication")



route.get("/", isAuthenticated, async(req,res)=>{

    const evenues = await evRepo.findAllByUser(req.user.id);
    const revenues = await rvRepo.findAllByUser(req.user.id);

    const LastEvenues = evenues.sort((a,b) => b.value - a.value).splice(0,5)
    const LastRevenues =  revenues.sort((a,b) => b.value - a.value).splice(0,5)

    res.render("pages/evenue_revenue_graphic", {user:req.user, lastEvenues:LastEvenues, lastRevenues:LastRevenues})
})


route.post('/GetValues', isAuthenticated, async(req,res)=>{

    const evenues = await evRepo.findAllByUser(req.user.id)
    const revenues = await rvRepo.findAllByUser(req.user.id)


    const evPos = evenues.reduce( (array, ev)=>{
        
        const evenueDate = `${ev.createdAt.getDate()}/${ev.createdAt.getMonth()}/${ev.createdAt.getFullYear()}`

        const selectedEvenue = array.find(e => evenueDate == e.x)

        if(selectedEvenue){
            selectedEvenue.y +=  ev.value
        }else{
            array.push({x:evenueDate, y:ev.value})
        }

        return array
    }, [])


    const rvPos = revenues.reduce( (array, rv)=>{
        
        const revenueDate = `${rv.createdAt.getDate()}/${rv.createdAt.getMonth()}/${rv.createdAt.getFullYear()}`

        const selectedRevenue = array.find(r => revenueDate == r.x)

        if(selectedRevenue){
            selectedRevenue.y += rv.value
        }else{
            array.push({x:revenueDate, y:rv.value})
        }

        return array
    }, []) 


    res.json({evPos:evPos, rvPos:rvPos})
})


module.exports=route