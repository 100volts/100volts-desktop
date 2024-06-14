import Dashboard from "./view/Dashboard.js"
import Profile from "./view/Profile.js";
import ElMeters from "./view/ElMeters.js";


const navigateTo= url =>{
    history.pushState(null,null,url);
    router();
}


const router=async()=>{
    const routes=[
        {path:"/", view: Dashboard},
        {path:"/elmeters", view:ElMeters},
        {path:"/profile", view: Profile}
    ]


    const potentialMatcher=routes.map(route=>
        {
            return{
                route:route, 
                isMatch:location.pathname===route.path
            };
        }       
    )

    let match = potentialMatcher.find(potentialMatch=>potentialMatch.isMatch)

    //If Routh is not found
    if(!match){
        match={
            route:routes[0],
            isMatch:true
        }
    }

    const view=new match.route.view();

    //its awai so that the api call finishes and then load the page
    document.querySelector("#app").innerHTML=await view.getHtml()

    console.log(new match.route.view())
}

window.addEventListener("popstate",router)

document.addEventListener("DOMContentLoaded",()=>{
    //this is so the brouser not to reload the page
    document.body.addEventListener("click",e=>{//dalegate event listener
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })

    router();
});



