const axios = require("axios");
const { welcome } = require("./case/welcome");
const template = async (req, res) => {
  try {
    //throw new Error('FUE UN ERROR CONTROLADO');
    console.log("BODY: ", req.body);
    const action = req.body.queryResult.action;

    console.log("user: ", req.body.originalDetectIntentRequest.payload.data);
    const payload = {
      userId: req.body.originalDetectIntentRequest.payload.data.sender.id,
      session: req.body.session,
      tokenPage:
        "EAADjNAsHypIBANzPPj6CGX2c8OHZBG2tSVO7qRpnsFrekOhbWVUEEdsxmmasogszKOy5IlLzIx6R5pAOznlGUHOWPnK5ZBgStAlZAYzPxalmnRZA8DkeYJRfM90iZB9htPhF68uQEAna0go24KXOZCk3VVx75ZB2fpuFmVaNfAbXQZDZD",
    };

    console.log("ACTION: ", action);
    switch (action) {
      case "_START":
        await welcome(req, res, payload);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("CATCH",error);
  }
};

module.exports = {
  template,
};
