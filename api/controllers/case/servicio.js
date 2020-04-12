const axios = require("axios");

const servicio = async (req, res, p) => {

  console.log("datos: ", data);

  const bienvenidos = [
    {
      platform: "FACEBOOK",
      text: {
        text: [
          `¿Con qué tipo de servicio podemos ayudarte?`          
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
              title: "Desinfección",
              payload: "a",
            },
            {
              content_type: "text",
              title: "Fumigación",
              payload: "b",
            },
            {
              content_type: "text",
              title: "Desinfección y Fumigación",
              payload: "c",
            },
            {
              content_type: "text",
              title: "Limpieza, Desinfección y Fumigación",
              payload: "d",
            },
          ],
        },
      },
    },
  ];
  res.send({
    fulfillmentMessages: bienvenidos,
    outputContexts: [
      {
        name: p.session + "/contexts/awaiting_time_servicio",
        lifespanCount: 0,
        parameters: {},
      }
    ],
  });
};

module.exports = {
  servicio,
};
