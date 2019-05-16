const express = require('express')
const app = express();

 const cors = require('cors');

 app.use(cors());

const AssistantV1 = require('ibm-watson/assistant/v1');

const service = new AssistantV1({
    version: '2019-05-16',
    iam_apikey: 'iueV0cCZC_S0kzF5aIB4xrLlO6gQA0J1W6fw6cvbOmlJ',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

app.get('/', (req, res) => {

    let response=''
    console.log(req.query.input)

    service.message({
        workspace_id: '063e86c6-8b51-4076-8875-73dfc556fce5',
        input: { 'text': req.query.input }
    }).then(answer => {
            res.send(answer.output.text[0]);
        })
    .catch(err => {
            console.log(err)
        });
})



app.listen(8080, () => {
     console.log('listening. . .')
})
