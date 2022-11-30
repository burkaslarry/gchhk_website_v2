import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Client } from "@notionhq/client";
import { useEffect } from "react";

export function EventBanner({ results }) {
  useEffect(() => {
    console.log("EventBanner :" + results);
  });

  const getEventDatabaseDisplay = () => {
    let jsx = [];
    let imageUrl = "https://i.imgur.com/PSi9TDW.jpg";
    results.forEach((project) => {
      jsx.push(
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
            <Typography variant="h4" color="white" align="right">
              {project.createDate}
            </Typography>
            <Typography variant="h4" color="white" align="left">
              {project.title}
            </Typography>
          </Box>
        </Container>
      );
    });
    return jsx;
  };
  return <div className="gchhkgrid1">{getEventDatabaseDisplay()}</div>;
}

export async function getStaticProps() {
  const notion = new Client({
    auth: "secret_T6EnLu6qLDr4lO7ADKqfNyBW9hJ1LGTepiQ9btOXKJ7",
  });

  const databaseId = "b7574bb91d894e4fbbc8a9b9e67c8dde";

  const contentFilter = {
    and: [
      {
        property: "Title",
        rich_text: {
          is_not_empty: true,
        },
      },
    ],
  };
  const contentSorts = [{ property: "PublishDate", direction: "descending" }];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: contentFilter,
    sorts: contentSorts,
  });

  return {
    props: {
      results: response.results,
    },
  };
}

export default EventBanner;
