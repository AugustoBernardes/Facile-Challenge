
const undefinedRoutes = (req,res) => {
    res.status(400)
    res.send({
        code:"ROUTE_FAILURE",
        message:"This route don't exist!"
    })
}

module.exports = {undefinedRoutes}