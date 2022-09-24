const form = document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const data = {
            originalurl: e.target[0].value,
            newurl: e.target[1].value
    }
    console.log(data)
    fetch("/",{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(data=>data.json()).then(data=>{
        const container = document.querySelector(".container")
        const div = document.createElement("div")
        div.classList.add("message")
        if(data.status==200){
            div.innerHTML=`<p>${data.message}:<a href="https://link-shortener-production-1229.up.railway.app/${data.newLink}">${data.newLink}</a></p>`
            e.target[0].value=null
            e.target[1].value=null
        }else{
            div.classList.add("error")
            div.innerHTML=`<p>${data.message}</p>`
        }
        if(document.querySelector(".message")){
            container.replaceChild(div, container.children[2])
        }else container.appendChild(div)
    })
})
