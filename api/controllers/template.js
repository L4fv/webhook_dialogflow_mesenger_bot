

const template = async (req, res) => {
    try {
        //throw new Error('FUE UN ERROR CONTROLADO');
        console.log("BODY: ", req.body)
        console.log("BODY2: ", req)
    } catch (error) {
        console.log("CATCH");
        
    }
}

module.exports = {
    template
}