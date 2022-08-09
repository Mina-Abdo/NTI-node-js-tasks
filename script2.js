const userData = document.querySelector("#userData");
const userInfo = document.querySelector("#userInfo");
const tbody = document.querySelector("#tbody")
const single = document.querySelector("#single")
const addTransaction = document.querySelector("#addTransaction")
// function to read from storage
const readFromLocalStorage = (storageKey="users" , option="array")=>{
	let data;
	try{
		data = localStorage.getItem(storageKey);
		if(option!="string") data = JSON.parse(data)
		if(!Array.isArray(data) && option=="array") throw new Error('invalid data')
		
		
	}
	catch(e){
		data = [];
	}
	return data
}	
// function to write to storage
const writeToStorage = (data, storageKey="users")=>{
    localStorage.setItem(storageKey, JSON.stringify(data))
}

// design function to create wanted elements
const createMyOwnElement = (el , parent , classes , txt=null)=>{
    const myElem = document.createElement(el);
    parent.appendChild(myElem);
    myElem.classList = classes;
    if(txt) myElem.textContent = txt;
    return myElem;
}
	//function to show new page
    const showTransaction = (i)=>{
        writeToStorage(i , "id")
        window.location.href = 'transaction.html';
    }
    //function to delete a user
        const deleteUser = (id , ref)=>{
            const data = readFromLocalStorage("users" , "array")
            data.splice(id , 1)
            writeToStorage(data)
            drawData(ref , data)
        }
    //create a function to draw each user
        const drawUser = (user , i , ref)=>{
            const tr = createMyOwnElement("tr" , tbody , "")
            const td1 = createMyOwnElement("td" , tr , "" , user.usernum )
            const td2 = createMyOwnElement("td" , tr , "" , user.name)
            const td3 = createMyOwnElement("td" , tr , "" , user.balance)
            const td4 = createMyOwnElement("td" , tr , )
            const editBtn = createMyOwnElement("button" , td4 , "btn btn-danger mx-3" , "Edit")
            const showBtn = createMyOwnElement("button" , td4 , "btn btn-warning mx-3" , "Show")
            const deleteBtn = createMyOwnElement("button" , td4 , "btn btn-success mx-3" , "Delete")
            const addTransaactionBtn = createMyOwnElement("button" , td4 , "btn btn-primary mx-3" , "Add Transaction")
                // showBtn.addEventListener("click" , show(i))
                // deleteBtn.addEventListener("click" , deleteUser(i , ref))
            addTransaactionBtn.addEventListener("click" , showTransaction(i))
        }
    //function to draw data
		const drawData = (ref , allUsers)=>{
			ref.innerHTML = "";
            if(allUsers.length== 0){
                const tr=createMyOwnElement("tr" , tbody , "")
                const td=createMyOwnElement("td" , tr , "bg-danger text-white text-center" , "no users yet")
                td.setAttribute("colspan" , "4")

            }else{
                allUsers.forEach((user , i)=>{
                    
                    drawUser(user , i, ref)
                    
                })
            }
		}
        //function to add users
        const addFun =(event)=>{
            event.preventDefault();
            const allUsers = readFromLocalStorage();
            let data = {
                usernum: Date.now(),
                transactions:[],
                name : userData.elements.name.value,
                balance : userData.elements.balance.value,
            }
            console.log(data);
            allUsers.push(data);
            writeToStorage(allUsers);
            console.log(allUsers)
            window.location.href = 'operation.html';
        }
        //function to show single user
            const show = (id)=>{
                console.log(id)
                writeToStorage(id , "id")
                window.location.href="single.html"
            }
        if(userData) userData.addEventListener("submit" , addFun);
       if(tbody){
            const allUsers = readFromLocalStorage("users")
            drawData(tbody , allUsers)
            const deleteBtn = document.querySelectorAll("#tbody tr button:nth-of-type(3)")
            console.log(deleteBtn)
     
       }
       if(single){
        const id = localStorage.getItem("id")
        const data = readFromLocalStorage("users")
        if(id>data.length || id<0){
            const mesg = createMyOwnElement("p" , single , "alert alert-danger" , "invalid id")
        }else{
            const li1 = createMyOwnElement("li" , single , "" , data[id].usernum)
            const li2 = createMyOwnElement("li" , single, "" , data[id].name)
            const li3 = createMyOwnElement("li" , single, "" , data[id].balance)
        }
        }

        if(addTransaction){
            addTransaction.addEventListener("submit" , (e)=>{
                e.preventDefault();
                const transaction = {
                    tType: addTransaction.elements.tType.value,
                    tValue: addTransaction.elements.balance.value,
                }
                const id = readFromLocalStorage("id" , "string")
                const data = readFromLocalStorage("users" , "array")
                data[id].transactions.push(transaction)
                console.log(transaction)
                if(transaction.tType=="withdraw")
                    data[id].balance=data[id].balance - transaction.tValue
                else
                    data[id].balance=data[id].balance + transaction.tValue
                writeToStorage(data , "users")
                window.location.href="operation.html"
                
            })
        }

        