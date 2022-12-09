import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const GCHHKGird = ({ resultList, type }) => {
  let jsx = [];
  resultList.map((result, index) => {
    if (type == "project") {
      jsx.push(
        <div class="gcccardlightgreen" key={index}>
          <Link
            href={`/projects/${result.properties.ProjectCode.title[0].plain_text}`}
          >
            <Container
              justifyContent="center"
              alignItems="center"
              className={styles.container_item_1}
            >
              <Typography variant="h4" color="white" align="center">
                {result.properties.LongName.rich_text[0].plain_text}
              </Typography>
              <br />
              <Typography variant="h4" color="white" align="center">
                {result.properties.ShortName.rich_text[0].plain_text}
              </Typography>
            </Container>
          </Link>
        </div>
      );
    } else if (type == "recycle") {
      jsx.push(
        <div class="gcccardgreen" key={index}>
          <Container
            justifyContent="center"
            alignItems="center"
            className={styles.container_item_1}
          >
            <Typography variant="h4" color="white" align="center">
              {result.properties.Title.title[0].plain_text}
            </Typography>
            <br />
            <Typography variant="h4" color="white" align="center">
              {result.properties.Number.number +
                " " +
                result.properties.Unit.rich_text[0].plain_text}
            </Typography>
          </Container>
        </div>
      );
    } else {
      jsx.push(
        <div class="gcccardgreen" key={index}>
          <Container
            justifyContent="center"
            alignItems="center"
            className={styles.container_item_1}
          >
            <Typography variant="h4" color="white" align="center">
              {result.properties.Title.title[0].plain_text}
            </Typography>
          </Container>
        </div>
      );
    }
  });

  return <div class="gcccardhk3">{jsx}</div>;
};

export default GCHHKGird;
