export const COHORT_NAME = "2301-FTB-PT-WEB-PT";

export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



const URL = (path) => {
    const url = 'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT' + path;
    return url;
}


const getOptions = (method,body,token) => ({
    method: method ? method.toUpperCase() : "GET",
    headers: {
        'Content-Type': 'application/json', 
        ...(token && {'Authorization': `Bearer ${token}`}) 
    },
    ...( body && { body: JSON.stringify(body) }),
});


export const makePost = async (token, {title, description, price, location, willDeliver}) => {
    console.log('makePost ' + token)
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            location,
            description,
            price,
            willDeliver
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }



export const callAPI = async({path, method, body, token}) => {
    try {
        const result = await fetch(
            URL(path),
            getOptions(method, body, token),
        );
        const response = await result.json();
        console.log(response);
        if (response.error) throw response.error;
        return response?.data;
    } catch(e) {
        console.error(e);
    }
}
