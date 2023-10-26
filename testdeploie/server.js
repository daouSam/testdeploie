let express = require('express')

let app = express()

app.use(express.static(__dirname+'/dist/testdeploie'))

app.get('/*', (req, res) =>{
    res.sendFile(__dirname+'/dist/testdeploie/index.html')
})

app.listen(process.env.PORT || 8080)