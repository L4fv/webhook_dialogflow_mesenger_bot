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

  const bienvenido = [
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
      payload: {
        facebook: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text:
                "Para continuar por favor acepta los términos y condiciones",
              buttons: [
                {
                  type: "web_url",
                  url:
                    "http://acceso.com.pe/descargas/terms_condiciones_chatbot.pdf",
                  title: "Términos y condiciones términos y condiciones",
                  webview_height_ratio: "full",
                },
              ],
            },
          },
        },
      },
    },
    {
        "platform": "FACEBOOK",
        "payload": {
          "facebook": {
            "text": "Seleccione una opción:",
            "quick_replies": [{
                "content_type": "text",
                "title": "responder a sus preguntas!",
                "payload": "aceptar_terminos"
              },
              {
                "content_type": "text",
                "title": "enviarle un mensaje!",
                "payload": "rechazar_terminos1"
              }
            ]
          }
        }
      }
  ];
  res.send({
    "fulfillmentMessages": bienvenidos,
    "outputContexts": [{
        "name": p.session + "/contexts/QUESTION_1",
        "lifespanCount": 0,
        "parameters": {}
      },
      {
        "name": p.session + "/contexts/QUESTION_2",
        "lifespanCount": 0,
        "parameters": {}
      }
    ]
  };)
};

module.exports = {
  welcome,
};
