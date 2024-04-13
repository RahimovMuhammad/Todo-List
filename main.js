let box = document.querySelector(".box");
let API = "https://66193930125e9bb9f2996981.mockapi.io/Comfy-portfolio/TODO";
let addDialog = document.querySelector(".addDialog")
let formAdd = document.querySelector(".formAdd")
let addBtn = document.querySelector(".addBtn")
let closeBtn = document.querySelector(".closeBtn")
let closeBtn1 = document.querySelector(".cancelBtn")

let editDialog = document.querySelector(".editDialog")
let formEdit = document.querySelector(".formedit")
let closeBtnEdit = document.querySelector(".closeBtnEdit")
let closeBtnEdit1 = document.querySelector(".cancelBtnEdit")

addBtn.onclick=()=>{
    addDialog.showModal()
    formAdd.onsubmit=(e)=>{
        e.preventDefault()
        let user={
            title:formAdd["addTitle"].value,
            description:formAdd["addDescription"].value
        }
        postUser(user)
        get()
    }
}
closeBtn.onclick=()=>{
    addDialog.close()
}
closeBtn1.onclick=()=>{
    addDialog.close()
}

closeBtnEdit.onclick=()=>{
    editDialog.close()
}
closeBtnEdit1.onclick=()=>{
    editDialog.close()
}

async function get() {
    try {
        let responce = await fetch(API);
        let data = await responce.json();
        getData(data)
    } catch (error) {
        console.log(error);
    }
};
get()

async function postUser(user) {
    try {
        let responce = await fetch(API,{
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        })
        get()
    } catch (error) {
        console.log(error);
    }
};

async function deleted(id) {
    try {
        let responce = await fetch(`${API}/${id}`,{
            method:"DELETE"
        });
        get()
    } catch (error) {
        console.log(error);
    }
}

async function putUser(user,id) {
    try {
        let responce = await fetch(`${API}/${id}`,{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        });
        get()
    } catch (error) {
        console.log(error);
    }
}

function getData(data) {
    box.innerHTML = ""
    data.forEach(el => {
        let card = document.createElement("div")
        card.classList.add("card")
        let title = document.createElement("h3")
        title.innerHTML = el.title
        title.classList.add("titleName")
        let description = document.createElement("p")
        description.innerHTML = el.description
        description.classList.add("descriptionName")
        let btnFunction = document.createElement("div")
        btnFunction.classList.add("btnFunction")
        editBtn = document.createElement("img")
        editBtn.src = "EditFilled.svg"
        editBtn.onclick=()=>{
            editDialog.showModal()
            formEdit["editTitle"].value=el.title
            formEdit["editDescription"].value=el.description
            formEdit.onsubmit=(e)=>{
                e.preventDefault()
                let user={
                    title: formEdit["editTitle"].value,
                    description:formEdit["editDescription"].value
                }
                putUser(user,el.id)
                editDialog.close()
            }
        }
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "DeleteFilled.svg"
        deleteBtn.onclick=()=>{
            deleted(el.id)
        }
        let leftFunction = document.createElement("div")
        leftFunction.append(editBtn,deleteBtn)
        let checkFunction = document.createElement("div")
        checkFunction.classList.add("checks")
        let comp = document.createElement("input")
        comp.type = "checkbox"
        comp.checked = el.complited
        comp.onclick=()=>{
            el.complited=!el.complited;
            putUser(el,el.id)
        }
        if(el.complited==true){
            title.classList.add("delName")
        }
        let checkText = document.createElement("span")
        checkText.innerHTML = "done"
        checkText.classList.add("checkText")
        checkFunction.append(comp,checkText)
        btnFunction.append(leftFunction,checkFunction)
        card.append(title,description,btnFunction)
        box.append(card)
    });
}