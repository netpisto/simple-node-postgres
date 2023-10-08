const exprees = require("express")
const user = require("./routes/user")
const signup = require("./routes/auth/signup")
const signin = require("./routes/auth/signin")
const app = exprees()
const port = 5000
app.use("/user",user)
app.use("/signup",signup)
app.use("/signin",signin)

app.listen(port,()=>console.log(`app is listening on port ${port}`))