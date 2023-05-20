// const express = require('express')
import express from 'express';

const app = express()
const port = 8080

console.log(__dirname);
// route home
app.get('/', (req, res) => {
    res.send('HIHIHI!')
})

// port used to listen, client will call api to this port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})