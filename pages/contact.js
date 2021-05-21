import { useState } from "react";
import * as yup from "yup";
import { API_URL } from "../components/api/url";

import Head from "../components/layout/head";
import Heading from "../components/layout/heading";

let schema = yup.object().shape({
  subject: yup.string().required(),
  content: yup.string().required(),
  email: yup.string().email().required(),
});

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [messageConfirmation, setMessageConfirmation] = useState("");

  async function sendMessage() {
    const messageData = {
      subject: subject,
      content: content,
      email: email,
    };
    console.log(messageData);
    const valid = await schema.isValid(messageData);

    if (valid === true) {
      await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(messageData),
      });
      setMessageConfirmation("Message Is Sent");
    } else {
      setMessageConfirmation(
        "Message Could not be sent, all fields are required and must be valid"
      );
    }
  }
  return (
    <>
      <Head title="Contact" />
      <Heading title="Holidaze" />
      <div className="border-top"></div>
      <div className="contact-title_container">
        <h2>Contact us</h2>
      </div>
      <div className="form_container">
        <form>
          <input
            className="subject_input"
            type="text"
            placeholder="subject"
            onChange={(subject) => setSubject(subject.target.value)}
            value={subject}
          />
          <textarea
            className="message_input"
            placeholder="Message"
            onChange={(content) => setContent(content.target.value)}
            value={content}
          />
          <input
            className="email_input"
            type="email"
            placeholder="Your Email"
            onChange={(email) => setEmail(email.target.value)}
            value={email}
          />
          <button type="button" onClick={() => sendMessage()}>
            Send Message
          </button>
          <br />
          <div className="message_confirmation">
            <p>{messageConfirmation}</p>
          </div>
        </form>
      </div>
    </>
  );
}
