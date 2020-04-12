const axios = require("axios");
const {
  awaiting_phone,
  awaiting_time_servicio,
  resolveAnswer,
  awaiting_end_custom,
  awaiting_direccion,
} = require("./case/servicio");
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

/*     console.log(
      "CONTEXT: ",
      getContextGeneric(req.body.queryResult.outputContexts)
    ); */

    console.log("ACTION: >>>>>>", action);
    switch (action) {
      case "_START":
        await welcome(req, res, payload);
        break;
      case "get_answer":
        await resolveAnswer(req, res, payload);
        break;
      case "get_servicio":
        await awaiting_time_servicio(req, res, payload);
        break;
      case "get_time_servicio":
        await awaiting_phone(req, res, payload);
        break;
      case "get_phone_number":
        await awaiting_direccion(req, res, payload);
        break;
      case "get_direccion":
        await awaiting_end_custom(req, res, payload);
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
