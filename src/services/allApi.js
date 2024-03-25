import { Base_url } from "./baseurl"
import { commonApi } from "./commonApi"

//register API
export const registerAPI=async(users)=>{

  return await  commonApi('POST',`${Base_url}/user/register`,users,"")
 
}

//login api
export const loginAPI=async(users)=>{

  return await  commonApi('POST',`${Base_url}/user/login`,users,"")
 
}

//fn to add blogs
export const addBlogsApi=async(reqBody,reqHeader)=>{

  return await  commonApi('POST',`${Base_url}/blogs/add`,reqBody,reqHeader)
 
}

//homeblogs

export const homeBlogsApi=async()=>{

  return await  commonApi('GET',`${Base_url}/blogs/homeblogs`)
 
}

//allblogs

export const allBlogsApi=async(skey,reqHeader)=>{

  return await  commonApi('GET',`${Base_url}/blogs/allhomeblogs?search=${skey}`,"",reqHeader)
 
}

//userblogs

export const userBlogsApi=async(reqHeader)=>{

  return await  commonApi('GET',`${Base_url}/user/usrproject`,"",reqHeader)
 
}

//editblogs

export const editBlogsApi=async(blogid,reqBody,reqHeader)=>{

  return await  commonApi('PUT',`${Base_url}/blogs/edit${blogid}`,reqBody,reqHeader)
 
}

//delete project

export const deleteBlogsApi=async(blogid,reqHeader)=>{

  return await  commonApi('DELETE',`${Base_url}/blogs/pop${blogid}`,{},reqHeader)
 
}


