import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import ContactForm from "../ui/ContactForm";

export default function ContactUs() {
  return (
    <Container>
      <Typography variant="h6" gutterBottom sx={{ paddingTop: 3 }}>
        Contact us
      </Typography>
      <ContactForm />
    </Container>
  );
}
