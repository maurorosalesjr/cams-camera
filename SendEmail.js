import emailjs from '@emailjs/browser';

// these populate email templates, edit with caution
const COMPANY = "Cam's Camera"
const CC_LIST = "kirsten.opstad@gmail.com, builtbyko@gmail.com"

// takes formData as input and returns success or error message
export default sendEmail = ({formData}) => {
  // NOTE: ensure formData.emailType is included
  let templateParams = {};
  // if intro email, send to 
  if (formData.emailType === "intro") {
    templateParams = {
      // parameters match existing template -> if changed, emailJS template must be changed
      user_name: formData.userName,
      user_email: formData.userEmail,
      message: formData.messsage
    };
    // use intro template (sent to company)
    templateId = process.env.REACT_APP_EMAILJS_INTRO_TEMPLATE_ID;
  } else if (emailType === "quote") {
    // TODO: build message for quote
    templateParams = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhoneNumber: formData.userPhoneNumber,
      message: formData.userPhoneNumber,
      companyName: COMPANY,
      ccList: CC_LIST
    };
    // use intro template (sent to client, cc'd to ccList)
    templateId = process.env.REACT_APP_EMAILJS_QUOTE_TEMPLATE_ID;
  }

  emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, templateId, templateParams, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
  .then((result) => {
      // return success message
      if (result.status === 200) {
        return (`${result.status} - ${result.text}`)
      }
      console.log(result)
    }, (error) => {
      // return error message
      return (`${error.status} - ${error.text}`)
  });
};