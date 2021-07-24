 fetch('http://localhost:3000/weather?address=boston').then((response)=>{
   response.json().then((data)=>{
       if(data.error)
       {
           console.log(data.error)

       }
       else 
       {
           console.log(data.location)
           console.log(data.forecast)
       }
   })
 })

 const weatherform=document.querySelector('form')
 const search=document.querySelector('input')
 const messageone=document.querySelector('#m1')
 const messagetwo=document.querySelector('#m2')

 messageone.textContent =''
 


 weatherform.addEventListener('submit',(e)=>{
     e.preventDefault()
     const location = search.value
     
    messageone.textContent='Loading...'
    messagetwo.textContent=''

     fetch('http://localhost:3000/weather?address='+location).then((response)=>{
   response.json().then((data)=>{
       if(data.error)
       {
        messageone.textContent=data.errorMessage
       }
       else 
       {
        messageone.textContent=data.location
        messagetwo.textContent=data.forecast
       }
   })
 })
 })