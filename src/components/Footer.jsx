import { useState } from "react";
import sendEmail from "@/utils/SendEmail";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const [emailStatusMsg, setEmailStatusMsg] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // add user input to formData obj
    const formData = {
      emailType: "intro",
      userName: e.target.userName.value,
      userEmail: e.target.userEmail.value,
      message: e.target.message.value,
    };
    // run SendEmail(formData) to send email
    sendEmail(formData).then((result) => {
      if (result.status === 200) {
        clearForm(e);
        setEmailStatusMsg(`Email sent!`);
      } else {
        setEmailStatusMsg(`Error: ${result.status} ${result.text}`);
      }
    });
  };

  const clearForm = (e) => {
    e.target.userName.value = null;
    e.target.userEmail.value = null;
    e.target.message.value = null;
  };

  return (
    <div className={styles.footerWrapper}>
      <Form onSubmit={handleFormSubmit}>
        <h3>Contact Us</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="userEmail"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="userName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            style={{ height: "100px" }}
            placeholder="Message"
            name="message"
            required
          />
        </Form.Group>
        <Button variant="outline-light" type="submit">
          Submit
        </Button>
        <p>
          <i>{emailStatusMsg}</i>
        </p>
      </Form>
      <div className={styles.gitLink}>
        <a href="https://github.com/kirstenopstad/cams-camera">
          <img
            loading="lazy"
            src="/img/icons/github-mark-white.svg"
            alt="View on GitHub"
            style={{ width: "3em" }}
          />
        </a>
      </div>
      <div className={styles.address}>
        <p>
          Cam's Camera
          <br />
          123 First Ave. Suite 502
          <br />
          Los Angeles, CA 91919
          <br />
        </p>
      </div>
    </div>
  );
}
