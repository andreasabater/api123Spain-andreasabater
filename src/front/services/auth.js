import { Await } from "react-router-dom"

let host_proyect25 = import.meta.env.VITE_BACKEND_URL

export const login = async (dataToSend) => {
    //Envair el email y pass al  back para recibir el token o no ...
    console.log(dataToSend)   
    const url = `${host_proyect25}/api/login` 
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    }
    const response = await fetch(url, options)
    if (!response.ok) {
        console.log('Error', response.status, response.statusText);
        return false
    }
    const data =  await response.json()
    return data
}

export const protect = async () => {
  console.log('funcion protect')
  const options = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  console.log(options);
  
  const response = await fetch(`${host_proyect25}/api/protected`, options); 
  if (!response.ok){
    console.log('Error', response.status, response.statusText)
    return false    
  }
  const data = await response.json()
  console.log("RESPUESTA PROTECTED:", data);
  return data 

}

export const signup = async (dataToSend) => {
  const url = `${host_proyect25}/api/users`
  
  const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
  }
    
  const response = await fetch(url, options)
  if (!response.ok) {
    const errorText = await response.text()
   console.error("Error backend:", errorText)
   return false
   }

  const data = await response.json()
  return data
  }