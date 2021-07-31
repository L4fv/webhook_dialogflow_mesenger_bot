const axios = require("axios");
const {getContextGeneric} = require("utils/helper")
const resolveAnswer = async (req, res, p) => {
  const parameters = req.body.queryResult.parameters;
  console.log("parameters :", parameters);
  if (parameters.idFirstQuestion == "robot") {
    //console.log("1");
    const fulfillmentMessages = [
      {
        platform: "FACEBOOK",
        text: {
          text: [`¿Con qué tipo de servicio podemos ayudarte?`],
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
                payload: "Desinfección",
              },
              {
                content_type: "text",
                title: "Fumigación",
                payload: "Fumigación",
              },
              {
                content_type: "text",
                title: "Desinfección y Fumigación",
                payload: "Desinfección y Fumigación",
              },
              {
                content_type: "text",
                title: "Limpieza, Desinfección y Fumigación",
                payload: "Limpieza, Desinfección y Fumigación",
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
          name: p.session + "/contexts/awaiting_servicio",
          lifespanCount: 1,
          parameters: {},
        },
        {
          name: p.session + "/contexts/awaiting_response_2",
          lifespanCount: 0,
          parameters: {},
        },
      ],
    });
  } else {
    //console.log("2");
    res.send({
      fulfillmentMessages: [
        {
          platform: "FACEBOOK",
          text: {
            text: [
              `Gracias por tu interes, en breve nos comunicaremos contigo¡¡`,
            ],
          },
        },
      ],
      outputContexts: [
        {
          name: p.session + "/contexts/awaiting_response_2",
          lifespanCount: 1,
          parameters: {},
        },
        {
          name: p.session + "/contexts/awaiting_servicio",
          lifespanCount: 0,
          parameters: {},
        },
      ],
    });
  }
};

const awaiting_time_servicio = async (req, res, p) => {
  const parameters = req.body.queryResult.parameters;
  console.log("parameters :", parameters);

  const fulfillmentMessages = [
    {
      platform: "FACEBOOK",
      text: {
        text: [`¿Cuándo requieres que se realice el servicio?`],
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
              title: "Lo antes posible",
              payload: "Lo antes posible",
            },
            {
              content_type: "text",
              title: "En Una Semana",
              payload: "En Una Semana",
            },
            {
              content_type: "text",
              title: "En dos semanas",
              payload: "En dos semanas",
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
        name: p.session + "/contexts/awaiting_time_servicio",
        lifespanCount: 1,
        parameters: {},
      },
    ],
  });
};
const awaiting_phone = async (req, res, p) => {
  const parameters = req.body.queryResult.parameters;
  console.log("parameters :", parameters);

  const fulfillmentMessages = [
    {
      platform: "FACEBOOK",
      text: {
        text: [`¿A qué número de teléfono podemos llamarte?`],
      },
    },

    {
      platform: "FACEBOOK",
      payload: {
        facebook: {
          text: "Seleccione una opción ó escriba el telefono al cuál desea que nos contactemos:",
          quick_replies: [
            {
              content_type: "user_phone_number",
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
        name: p.session + "/contexts/awaiting_phone",
        lifespanCount: 1,
        parameters: {},
      },
    ],
  });
};
const awaiting_direccion = async (req, res, p) => {
  const parameters = req.body.queryResult.parameters;
  console.log("parameters :", parameters);
  const params = getContextGeneric(req.body.queryResult.outputContexts)
  console.log("INFO_DATA: ",params.parameters)
  const { data } = await axios({
    url: `/orq/email/v2.0/send`,
    baseURL: "http://localhost:3001",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      setup: {
        serviceId: 1,
      },
      payload: {
        destinatario: "info@sh-invyneg.com",
        asunto: "CHATBOT - INFO",
        html: emailFormat({...params.parameters})
      },
    },
  });
  console.log("datos: ", data);
  const fulfillmentMessages = [
    {
      platform: "FACEBOOK",
      text: {
        text: [
          `¿Puedes brindarnos la direccion y distrito de tu vivienda, local o empresa?`,
        ],
      },
    },
  ];
  res.send({
    fulfillmentMessages: fulfillmentMessages,
    outputContexts: [
      {
        name: p.session + "/contexts/awaiting_direccion",
        lifespanCount: 1,
        parameters: {},
      },
    ],
  });
};
const awaiting_end_custom = async (req, res, p) => {
  const parameters = req.body.queryResult.parameters;
  console.log("parameters :", parameters);

  const fulfillmentMessages = [
    {
      platform: "FACEBOOK",
      text: {
        text: [
          `Gracias por responder nuestras preguntas. Nos pondremos en contacto contigo Hasta pronto¡¡`,
        ],
      },
    },
  ];
  res.send({
    fulfillmentMessages: fulfillmentMessages,
    outputContexts: [
      {
        name: p.session + "/contexts/awaiting_end_custom",
        lifespanCount: 1,
        parameters: {},
      },
    ],
  });
};

const emailFormat = (p)=>{
return `
<table class="tg">
<tr>
  <th class="tg-0lax">NOMBRE</th>
  <th class="tg-0lax">Tipo de Servicio</th>
  <th class="tg-0lax">URGENCIA</th>
  <th class="tg-0lax">TELEFONO</th>
  <th class="tg-0lax">DIRECCION</th>
  
</tr>
<tr>
    <td class="tg-0lax">${p.first_name} ${p.last_name}</td>
    <td class="tg-0lax">${p.idServicio}</td>
    <td class="tg-0lax">${p.idTimeServicio}</td>
    <td class="tg-0lax">${p.idPhoneNumber}</td>
    <td class="tg-0lax"></td>
    
  </tr>
</table>
`
}


module.exports = {
  awaiting_phone,
  awaiting_time_servicio,
  resolveAnswer,
  awaiting_end_custom,
  awaiting_direccion,
};
