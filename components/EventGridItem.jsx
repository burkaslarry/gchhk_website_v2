import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const EventGridItem = ({ imageUrl, title, subtitle, type }) => {
  if (type == "lightgreen") {
    return (
      <div className="card_02">
        <div className="itemdiv">{title}</div>
      </div>
    );
  } else if (type == "darkgreen") {
    if (subtitle != "") {
      return (
        <div className="card_01">
          <div className="itemdivCenter">
            {title} <br /> {subtitle}
          </div>
        </div>
      );
    }
    return (
      <div className="card_01">
        <div className="itemdiv">{title}</div>
      </div>
    );
  } else if (type == "cover") {
    return (
      <div>
        <Container
          sx={{
            height: "12rem",
            padding: "1rem",
            width: "auto",
            borderRadius: "12px",
            color: "white",
            transition: `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)`,
            background:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" +
              imageUrl +
              "')",
            "&:hover": {
              transform: "scale(1.02, 1.02)",
              top: "-4px",
              boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.6)",
            },
          }}
        >
          <div className="itemdiv">{title}</div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="card">
        <div className="itemdiv">{title}</div>
      </div>
    );
  }
};

export default EventGridItem;
