const express = require('express')
const ReactSSR = require('react-dom/server')
const path = require('path')
const fs = require('fs')
const favicon = require('serve-favicon')

const app = express()
const isDev = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
app.use(favicon(path.join(__dirname, '../favicon.ico')))
if (!isDev) {
    const serverEntry = require('../dist/server-entry').default
    const file = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', (req, res)=>{
        const appString = ReactSSR.renderToString(serverEntry)
        res.end(file.replace('<!-- app -->', appString))
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, ()=>{
    console.log('server is listening on 3333')
})