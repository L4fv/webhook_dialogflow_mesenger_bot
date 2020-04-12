const axios = require("axios");
const { servicio } = require("./case/servicio");
const { welcome } = require("./case/welcome");
const { getContextGeneric } = require("utils/helper");
const template = async (req, res) => {
  try {
    //throw new Error('FUE UN ERROR CONTROLADO');
    console.log("BODY: ", req.body);
    const action = req.body.queryResult.action;

    //console.log("user: ", req.body.originalDetectIntentRequest.payload.data);
    const payload = {
      userId: req.body.originalDetectIntentRequest.payload.data.sender.id,
      session: req.body.session,
      tokenPage:
        "EAADjNAsHypIBANzPPj6CGX2c8OHZBG2tSVO7qRpnsFrekOhbWVUEEdsxmmasogszKOy5IlLzIx6R5pAOznlGUHOWPnK5ZBgStAlZAYzPxalmnRZA8DkeYJRfM90iZB9htPhF68uQEAna0go24KXOZCk3VVx75ZB2fpuFmVaNfAbXQZDZD",
    };

    console.log(
      "CONTEXT: ",
      getContextGeneric(req.body.queryResult.outputContexts)
    );

    console.log("ACTION: ", action);
    switch (action) {
      case "_START":
        await welcome(req, res, payload);
        break;
      case "get_servicio":
        await servicio(req, res, payload);

        break;
      case "end_conversation":
        break;
      case "get_time_servicio":
        console.log("get_time_servicio");
        break;
      case "get_phone_number":
        console.log("get_phone_number");
        break;
      case "get_direccion":
        console.log("get_direccion");
        break;

      case "end_conversation_custom":
        console.log("end_conversation_custom");
        break;
      default:
        console.log("oki_doki");
        break;
    }
  } catch (error) {
    console.log("CATCH", error);
  }
};

module.exports = {
  template,
};
