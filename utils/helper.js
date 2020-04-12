module.exports = {
  //metodo que recibe en arreglo de contextos de salida y retorna el contexto generico
  //el cual posee todos los parametros
  getContextGeneric: function (outputContexts) {
    //return outputContexts.filter(context => context.name.indexOf("generic") > -1)[0];
    outputContexts.map((v) => console.log("output : ", v));
    return
  },

  
};
