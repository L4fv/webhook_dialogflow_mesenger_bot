const axios = require("axios");

const welcome = async (req, res, p) => {
  const { data } = await axios({
    url: `/${p.userId}?fields=first_name,last_name,profile_pic&access_token=${p.tokenPage}`,
    baseURL: "https://graph.facebook.com/v6.0",
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("datos: ", data);

  const fulfillmentMessages = [
    {
      platform: "FACEBOOK",
      text: {
        text: [
          `Hola ${data.first_name}, ${data.last_name}, bienvenido a SH Saneamiento y Servicios`          
        ],
      },
    },
    {
        platform: "FACEBOOK",
        text: {
          text: [            
            "¿Prefieres responder nuestras preguntas o enviarnos un mensaje?",
          ],
        },
      },
    {
      platform: "FACEBOOK",
      payload: {
        facebook: {
          text: "Seleccione una opción:",
          quick_replies: [
            {
              content_type: "text",
              title: "responder a sus preguntas!",
              payload: "robot",
            },
            {
              content_type: "text",
              title: "Contactar con un asesor",
              payload: "no_robot",
            },
          ],
        },
      },
    },
  ];
  res.send({
    fulfillmentMessages: fulfillmentMessages,
    outputContexts: [
      {
        name: p.session + "/contexts/awaiting_question",
        lifespanCount: 1,
        parameters: {},
      }      
    ],
    
  });
};

module.exports = {
  welcome,
};
