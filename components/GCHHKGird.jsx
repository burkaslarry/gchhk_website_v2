import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const GCHHKGird = ({ masterclass, resultList, type }) => {
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
    } else if (type == "terms") {
      jsx.push(
        <div class="gcccardlightgreen3x" key={index}>
          <Link href={`/about/${result.displayPageId}`}>
            <Container
              justifyContent="center"
              alignItems="center"
              className={styles.container_item_1}
            >
              <Typography variant="h4" color="white" align="center">
                {result.displayTitle}
              </Typography>
            </Container>
          </Link>
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
      X;
    }
  });

  return <div class={masterclass}>{jsx}</div>;
};

export default GCHHKGird;
