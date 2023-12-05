
 
 
 
 const deleteProduct = async (id) => {
  try {
    const result= await fetch(`products/${id}`, {
      method: "DELETE",
    });
    window.alert(await result.json());
    location.reload();

    
  } catch (err) {
    console.log(err);
  }
};


const updateProduct = (id)=>{
  window.location = `updateProduct/${id}`;
}


const submitUpdate = async (id) =>{

try {
  
  const url = `http://localhost:8080/products/${id}`;
  
  const fileInput = document.getElementById('file');
  var formdata = new FormData();
  const updateForm = document.getElementById("updateForm");
  

  if(fileInput.files.length>0){
    
   
  
      const formData = new FormData(updateForm);

      for(let [name, value] of formData) {
        if(name !="file"){
          
          formdata.append(name,value);
        }
      }

      formdata.append("file", fileInput.files[0]);
        let requestOptions = {
          method: 'PUT',
          body: formdata,
        // redirect: 'follow'
        };
        
        
        const result = await fetch(url, requestOptions)
        
        const message = await result.json();
        alert(message.message);
  
}
  else{
    

    
      const formData = new FormData(updateForm);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      
      const result= await fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: formDataJsonString
   
    });

   
        
        const message = await result.json();
        alert(message.message);
    
    
    
      
  
    
  }


  window.location.replace("/home");



} catch (err) {
  alert(err)
  console.log(err);
  
}

}



