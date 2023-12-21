
const updateUser = async(id)=>{

    try {
        let role=document.getElementById(`role_${id}`).value;

        if(role){

    const DataJsonString = JSON.stringify({id,role});
    const url= 'http://localhost:8080/api/users/adminUsers'
  
    const result= await fetch(url, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: DataJsonString
  
  });
    const message = await result.json();
    alert(message.message);
    window.location.replace("http://localhost:8080/adminUsers");

}
        
    } catch (error) {
        console.log(error)
        
    }









}