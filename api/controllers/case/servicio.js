const axios = require("axios");

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
              payload: "a",
            },
            {
              content_type: "text",
              title: "En Una Semana",
              payload: "b",
            },
            {
              content_type: "text",
              title: "En dos semanas",
              payload: "c",
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
          text: "Seleccione una opción:",
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

module.exports = {
  awaiting_phone,
  awaiting_time_servicio,
  resolveAnswer,
  awaiting_end_custom,
  awaiting_direccion,
};
