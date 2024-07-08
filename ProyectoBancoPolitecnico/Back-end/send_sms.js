require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

async function sendMessage() {
    try {
        const message = await client.messages.create({
            body: "MANDATEEEEEE dios mio",
            from: "+12568184349",
            to: "+593995985923"
            //to: "+593996969658"
        });
        console.log(message.body);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

sendMessage();
