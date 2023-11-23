// connectCaller.js
import { ConnectClient, StartOutboundVoiceContactCommand } from "@aws-sdk/client-connect";

const handleCallClick = async (phoneNumber) => {
    const client = new ConnectClient({ 
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
      });
    
      const command = new StartOutboundVoiceContactCommand({
        DestinationPhoneNumber: phoneNumber,
        ContactFlowId: "your-contact-flow-id",
        InstanceId: "your-instance-id",
        SourcePhoneNumber: "your-source-phone-number",
      });

  try {
    const data = await client.send(command);
    console.log("Call initiated: ", data);
    // Handle response or further actions
  } catch (error) {
    console.error("Error initiating call: ", error);
    // Handle error
  }
};

export default handleCallClick;
