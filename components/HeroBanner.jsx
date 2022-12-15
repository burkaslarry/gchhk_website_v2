import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Image from "next/image";
import gchLogo from "../public/GCH.svg";
import { Box, Stack } from "@mui/system";

const HeroBanner = ({
  resultConfig,
  showButton,
  facebookLink,
  igLink,
  handleClick,
}) => {
  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          background: "url('" + resultConfig.imageUrl + "')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "70vh",
            backgroundColor: "rgba(80, 167, 106, 0.7)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "block" }}>
              <Link href="/">
                <Image src={gchLogo} height={88} width={88} alt="" />
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Container
              sx={{
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
                <Link href={`#contact`}></Link>
                <Button
                  variant="outlined"
                  type="submit"
                  color="themeWhite"
                  onClick={handleClick}
                  sx={{
                    width: "20vw",
                    padding: 1,
                    margin: 2,
                    display: showButton == "true" ? "inline" : "none",
                  }}
                >
                  聯絡我們
                </Button>
              </Container>
            </Container>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HeroBanner;
