import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import ContactForm from "../components/ContactForm";
import {CONTACT_US} from "../lib/constant";

export default function ContactUs() {
  return (
    <Container sx={{ bgcolor: "#F6EDF6", p: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        color={"#1C3A27"}
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
          {CONTACT_US}
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        color={"#1C3A27"}
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
        如有查詢，敬請留言，我們將盡快回覆閣下
      </Typography>

      <ContactForm />
    </Container>
  );
}
