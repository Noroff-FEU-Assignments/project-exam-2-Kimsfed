import { API_URL } from "../api/url";
import { useState } from "react";
import * as yup from "yup";

let schema = yup.object().shape({
  subject: yup.string().required(),
  message: yup.string().required(),
});

function Enquiry() {
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  async function sendMessage() {
    const messageData = {
      subject: messageSubject,
      message: messageContent,
    };

    const valid = await schema.isValid(messageData);

    if (valid === true) {
      const send = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const sendResponse = await send.json();

      console.log(sendResponse);
      if (sendResponse) {
        setSentMessage("Enquiry Is Sent");
      }
    } else {
      setSentMessage("Enquiry Could Not Be Sent");
    }
  }
  return (
    <div>
      <div>
        <h3>Send enquiry</h3>
      </div>
      <div>
        <form>
          <input
            type="text"
            onChange={(subject) => setMessageSubject(subject.target.value)}
            value={messageSubject}
            placeholder="Your Email Or Phone Number"
          />
          <input
            type="text"
            placeholder="Name Of Hotel"
            onChange={(message) => setMessageContent(message.target.value)}
            value={messageContent}
          />
          <button type="button" onClick={() => sendMessage()}>
            Send Message
          </button>
          <br />
        </form>
      </div>
      <div className="message_confirmation">
        <p>{sentMessage}</p>
      </div>
    </div>
  );
}
export default Enquiry;
