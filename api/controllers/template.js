const axios = require("axios")
const template = async (req, res) => {
  try {
    //throw new Error('FUE UN ERROR CONTROLADO');
    console.log("BODY: ", req.body);
    const action = req.body.queryResult.action;
    console.log("ACTION: ", action);
    console.log("user: ",req.body.originalDetectIntentRequest.payload.data)
    var userId = req.body.originalDetectIntentRequest.payload.data.sender.id;
    var tokenPage = "EAADjNAsHypIBANzPPj6CGX2c8OHZBG2tSVO7qRpnsFrekOhbWVUEEdsxmmasogszKOy5IlLzIx6R5pAOznlGUHOWPnK5ZBgStAlZAYzPxalmnRZA8DkeYJRfM90iZB9htPhF68uQEAna0go24KXOZCk3VVx75ZB2fpuFmVaNfAbXQZDZD";
    const response = await axios({
        url: `https://graph.facebook.com/v2.6/${userId}?fields=first_name,last_name,profile_pic&access_token=${tokenPage}`,
        
        method: "GET",
        headers: {
          "content-type": "application/json"
          //Authorization: process.env.VUE_APP_AUTHORIZATION,
        }        
      });
      console.log("datos: ",response.data)

    switch (action) {
      default:
        break;
    }
  } catch (error) {
    console.log("CATCH");
  }
};

module.exports = {
  template,
};
