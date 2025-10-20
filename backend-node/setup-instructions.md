# WhatsApp Setup Instructions

## 1. Get Twilio Account
- Sign up at https://www.twilio.com
- Go to Console Dashboard
- Copy Account SID and Auth Token

## 2. Set up WhatsApp Sandbox
- Go to Console → Messaging → Try it out → Send a WhatsApp message
- Send "join <your-sandbox-name>" to +1 415 523 8886 from your WhatsApp
- Your phone is now connected to the sandbox

## 3. Update .env file
```
TWILIO_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TOKEN=your-auth-token-here
TWILIO_WHATSAPP_NUMBER=+14155238886
```

## 4. Test WhatsApp
```bash
node test-whatsapp.js
```

## Common Issues:
- Phone number must include country code (+1234567890)
- Must join Twilio sandbox first
- Check Twilio console for error logs