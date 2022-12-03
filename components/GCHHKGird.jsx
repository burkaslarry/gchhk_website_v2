import React from "react";
import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const GCHHKGird = ({ appliedStyle, itemStyle, resultList }) => {
  let jsx = [];
  resultList.forEach((cardItem) => {
    jsx.push(
      <div className={itemStyle}>
        <Container className={styles.container_item_1}>
          <Typography variant="h2" color="white" align="center">
            {cardItem.title}
          </Typography>
        </Container>
      </div>
    );
  });

  return <div class={appliedStyle}>{jsx}</div>;
};

export default GCHHKGird;
