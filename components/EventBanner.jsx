import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const EventBanner = ({ imageUrl, createDate, title }) => {
  return (
    <div>
      <Container
        sx={{
          height: "35vh",
          borderRadius: "8px",
          background:
            "linear-gradient(0deg, rgba(0 0 0 / 80%), rgba(0 0 0 / 29%)), url('" +
            imageUrl +
            "')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "&:hover": {
            boxShadow:
              "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
          },
        }}
      >
        <Box sx={{ display: "block", marginTop: 4 }}>
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
