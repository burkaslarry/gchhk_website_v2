import {Typography} from "@mui/material";

const TermsSection = ({ title, content, padding }) => {
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
        padding={padding}
        gutterBottom
        fontWeight="500"
        sx={{ paddingTop: 3 }}
        align="left"
      >
        {content}
      </Typography>
    </div>
  );
};

export default TermsSection;
