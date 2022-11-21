import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Image from "next/image";
import gchLogo from "../public/GCH.svg";
import { Box } from "@mui/system";

const EventBanner = ({ appliedStyle, itemStyle, resultList }) => {
  let jsx = [];
  resultList.forEach((cardItem) => {
    jsx.push(
      <div className={itemStyle}>
        <Container className={styles.container_item_1}>
          <Typography variant="h2" color="white" align="center">
            {cardItem.title}
          </Typography>
          <br />
          <Typography variant="h2" color="white" align="center">
            {cardItem.figure}
          </Typography>
        </Container>
      </div>
    );
  });

  return <div class={appliedStyle}>{jsx}</div>;
};

export default EventBanner;
