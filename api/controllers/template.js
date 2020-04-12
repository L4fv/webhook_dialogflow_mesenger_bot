const template = async (req, res) => {
  try {
    //throw new Error('FUE UN ERROR CONTROLADO');
    console.log("BODY: ", req.body);
    const action = req.body.queryResult.action;
    console.log("ACTION: ", action);
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
