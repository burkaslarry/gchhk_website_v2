import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const EventBanner = ({ parentStyle, imageUrl, createDate, title }) => {
  return (
    <div className={parentStyle}>
      <Container
        borderRadius="25%"
        sx={{
          width: "100vw",
          height: "40vh",
          background:
            "linear-gradient(0deg, rgba(0 0 0 / 80%), rgba(0 0 0 / 29%)), url('" +
            imageUrl +
            "')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ display: "block", marginTop: 4 }} borderRadius="25%">
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Typography variant="h4" color="white" align="left">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4" color="white" align="right">
                {createDate}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default EventBanner;
