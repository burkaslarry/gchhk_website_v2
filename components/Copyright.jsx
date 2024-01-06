import {Typography} from "@mui/material";

export function Copyright() {
  return (
    <Typography variant="h6" color="text.secondary" align="center">
      {"版權所有 © "}
      {"草根文化館有限公司 2020 - "}
      {new Date().getFullYear()}
    </Typography>
  );
}
