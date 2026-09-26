const balance=document.querySelector("#balance")
const income=document.querySelector("#income")
const expense=document.querySelector("#expence")
const descbox=document.querySelector("#desc")
const amountbox=document.querySelector("#amount")
const submit_btn=document.querySelector("#Addbtn")
const del_btn=document.querySelector(".del_btn")
const spanbox=document.querySelector(".delspan")
const delpop=document.querySelector(".delconfirm")
const form1=document.querySelector(".form")
const cancelbutton=document.querySelector(".cancel_btn")
const delconfirm_btn=document.querySelector(".delconfirm_btn")
const transactionlist=document.querySelector(".transactionlist")
let transactions=JSON.parse(localStorage.getItem("transactions")) || [];

form1.addEventListener("submit",addtransaction)
function addtransaction(e){
  e.preventDefault();
  if(descbox.value=="" || amountbox.value==""){
   alert("Enter valid values")
  }
  else{
  const description=descbox.value.trim()
  const amount=parseFloat(amountbox.value)
  
  transactions.push({
    id:Date.now(),
    description,amount
  })
   localStorage.setItem("transactions",JSON.stringify(transactions))
   updatetransactionlist()
   updatesummary()
   amountbox.value=""
   descbox.value=""
}}
function updatetransactionlist(){
  transactionlist.innerHTML=""
  const sorted_transaction=[...transactions].reverse()
  sorted_transaction.forEach(transaction=>{
      const transactionbox=createtransactionelement(transaction)
  transactionlist.appendChild(transactionbox)
  })

}
function createtransactionelement(a){
  const li=document.createElement("li")
  li.className="libox"
  li.innerHTML=`<span>${a.description}</span><div><span>${formatcurrency(a.amount)}</span><button class="del_btn">&times</button></div>`
  li.classList.add(a.amount > 0 ? "incometransaction" : "expensetransaction");
  li.querySelector(".del_btn").addEventListener("click",()=>{
    
    createpopup(a)
    
  })
  return li
  
}
let delid=null;
function createpopup(transaction){
  spanbox.innerText=transaction.description;
  delid=transaction.id
  delpop.style.display="flex";
  
  
}
cancelbutton.addEventListener("click",()=>{
  delpop.style.display="none";
})
delconfirm_btn.addEventListener("click",()=>{
  delfunction(delid)
  delpop.style.display="none";
})
updatetransactionlist()

function delfunction(id){
  transactions=transactions.filter((transaction)=>transaction.id!==id)
  localStorage.setItem("transactions",JSON.stringify(transactions))
  updatetransactionlist()
  updatesummary()
}
function updatesummary(){
  const balancevalue=transactions.reduce((acc,transaction)=>acc+transaction.amount,0)
  const incomevalue=transactions.filter((transaction)=>transaction.amount>0).reduce((acc,transaction)=>acc + transaction.amount,0)
  const expensevalue=transactions.filter((transaction)=>transaction.amount<0).reduce((acc,transaction)=>acc + transaction.amount,0)
  income.textContent=formatcurrency(incomevalue)
  balance.textContent=formatcurrency(balancevalue)
  expense.textContent=formatcurrency(expensevalue)
  
}
function formatcurrency(number){
  return new Intl.NumberFormat("en-IN",{
    style:"currency",
    currency:"INR"
  }).format(number)
}

   updatetransactionlist()
   updatesummary()
   