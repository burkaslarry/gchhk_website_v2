import { Typography } from "@mui/material";

const TermsSection = ({ title, content }) => {
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="700"
        sx={{ paddingTop: 3 }}
        align="center"
      >
        <strong>{title}</strong>
      </Typography>
      <br />
      <Typography
        variant="h6"
        padding={16}
        gutterBottom
        fontWeight="500"
        sx={{ paddingTop: 3 }}
        align="left"
      >
        {content}
      </Typography>
      <br />
      <br />
    </div>
  );
};

export default TermsSection;
