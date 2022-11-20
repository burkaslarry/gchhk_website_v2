import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import Image from "next/image";
import gchLogo from "../public/GCH.svg";
import { Box } from "@mui/system";

const HeroBanner = ({ resultConfig }) => {
  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          background: "url('" + resultConfig.imageUrl + "')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            background:
              "linear-gradient(180deg, #0c632f -5.54%, rgba(1, 22, 19, 0) 100%)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Image src={gchLogo} height={88} width={88} />
          </Box>

          <Container
            sx={{
              height: "100vh",
              direction: "column",
              justify: "space-evenly",
              alignItems: "center",
            }}
          >
            <Container className={styles.container_item}>
              <h1>{resultConfig.title}</h1>
              <br />
              <h2>{resultConfig.subtitle}</h2>
              <br />
              <Button
                variant="outlined"
                type="submit"
                color="themeWhite"
                sx={{ width: "20vw", padding: 1, margin: 2 }}
              >
                聯絡我們
              </Button>
            </Container>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default HeroBanner;
