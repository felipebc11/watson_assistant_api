const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();

const assistant = new AssistantV2({
  version: process.env.WATSON_VERSION,
  authenticator: new IamAuthenticator({
  apikey: process.env.WATSON_APIKEY,
  }),
  url: process.env.WATSON_URL,
});

module.exports ={

  async generateSession(request, response){
    
    let v;
    
    try{
      v = await assistant.createSession({
        assistantId: process.env.WATSON_ASSISTANT_ID
      })
          assistant.message({
          assistantId: process.env.WATSON_ASSISTANT_ID,
          sessionId: v.result.session_id,
          input: {
            'message_type': 'text',
            'text': request.body.mess
            }
          })
          .then(res => {
            let resu = res.result.output.generic;
            return response.json(resu);
          })
          .catch(err => {
            console.log(err);
          });
        }catch(err){
          console.log(err);
        }
  }
}




  
