const axios = require("axios")
const welcome = (req,res,p) =>{
    const response = await axios({
        url: `/${p.userId}?fields=first_name,last_name,profile_pic&access_token=${p.tokenPage}`,
        baseURL:"https://graph.facebook.com/v2.6",
        method: "GET",
        headers: {
          "content-type": "application/json",        
        },
      });
      console.log("datos: ", response.data);

/*       const bienvenido = [
          {"platform": "FACEBOOK",
          "text": {
            "text": ["Hola" + first_name + "" + last_name + ", bienvenido a la atención en línea de Acceso"]
          }}
      ] */

}

module.exports={
    welcome
}