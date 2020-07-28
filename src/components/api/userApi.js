import axios from 'axios';

const serverUrl = "";
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export async function getUser (userId) {
    var userJson = {
        id : userId
    };

      const res = await axios.request({
        method: 'get',
        url: serverUrl + `/api/users/getUser?id=${userJson.id}`,
      })
      await sleep(2000);
      return res;
      

    
}
export async function resetPassword(userEmail) {
  const userData = 
  {
    email: userEmail
  }


  const res = await axios
  .post(serverUrl+"/api/auth/login/forgot", userData)
  .then(function(res)
  {
    return res;
  }) // re-direct to login on successful register
  .catch(err =>
    console.log(err)
  );
    if (res)
    {
      return {forgotPass: false, verCodeOpen:true};
    }else return {errors: {emailForgot: "Email not found"}};
    
  
}

export async function confirmation(userToken) {
  
  const userData = 
  {
    token: userToken
  }


  const res = await axios
  .post(serverUrl+"/api/auth/confirmation1", userData)
  .then(function(res)
  {
    return res;
  }) // re-direct to login on successful register
  .catch(err =>
    console.log(err)
  );
    if(res)
    {
      return {confirmSuccess: true};
    }
    else return {errorConfirm:true};
  
}

export async function resetPassVer(userData) {
  const res = await axios
  .post(serverUrl+ "/api/auth/login/reset1", userData)
  .then(function(res)
  {
    return 1;
  }) // re-direct to login on successful register
  .catch(function(err){
    if(err.message == "Request failed with status code 400")
    {
      return 2;
    }
    else if (err.message == "Request failed with status code 401")
    {
      return 3;
    }
  }
  );

  if (res == 1)
  {
    return {verCodeOpen:false, resetSuccess: true};
  }
  else if (res == 2)
  {
    return {errors:{newPassConfError: "Passwords must be longer than 6 characters or dont match.", newPassError: "Passwords must be longer than 6 characters or dont match."}}
  }
  else if(res == 3)
  {
    return {errors:{verCodeError: "Token invalid or expired."}}
  }
  
}

export async function resendCode(userEmail) {
  
  const userData = 
  {
    email: userEmail
  }


  const res = await axios
  .post(serverUrl+"/api/auth/resend", userData)
  .then(function(res)
  {
    return res;
  }) // re-direct to login on successful register
  .catch(err =>
    console.log(err)
  );
    if(res)
    {
      return {resendCode:false,resendCodeSuccess: true};
    }
    else 
    {
      return {errors:{resendEmailError: "Email not found or is already verified."}};
    }
}

export async function addRestaurant(restId)
{
    const userData = 
    {
      id : window.localStorage.getItem('id'),
      restData : restId
    }
    console.log(userData);
    
    const res = await axios
    .post(serverUrl+"/api/auth/addFavorite", userData)
    .then(function(res)
    {
      return res;
    }) // re-direct to login on successful register
    .catch(function(err)
    {
      return err;
    }
  );
    return res;
}

export async function getFavs()
{
    const userData = 
    {
      id : window.localStorage.getItem('id')
    }
    
    const res = await axios
    .get(serverUrl+`/api/auth/getFavorites?id=${window.localStorage.getItem('id')}`)
    .then(function(res)
    {
      return res;
    }) // re-direct to login on successful register
    .catch(function(err)
      {
        return false;
      }
    );
    if (res)
    {
      return res;
    }else {
      return "error";
    }

    
    
}

export async function isFav(restData)
{
    const userData = 
    {
      id : window.localStorage.getItem('id'),
      restData : restData
    }
    
    const res = await axios
    .post(serverUrl+"/api/auth/isFav", userData)
    .then(function(res)
    {
      return 1;
    }) // re-direct to login on successful register
    .catch(function(err)
    {
      return 2;
    }
  );
    return res;
}

export async function removeFav(restData)
{
    const userData = 
    {
      id : window.localStorage.getItem('id'),
      restData : restData
    }
    console.log(userData);
    
    const res = await axios
    .post(serverUrl+"/api/auth/removeFav", userData)
    .then(function(res)
    {
      return 1;
    }) // re-direct to login on successful register
    .catch(function(err)
    {
      return 2;
    }
  );
    return res;
}



