import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormHelperText,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, pink, purple } from "@mui/material/colors";
import { useForm } from "react-hook-form";

const inputFillChecking = {
  titleName: "姓名",
  titleEmail: "電郵地址",
  titleDonate: "捐款事宜",
  titleGeneral: "一般查詢",
  titleContent: "內容",
  titleColor: "#1C3A27",
  nonEmptyMessage: "必須填寫",
  placeholder: "請填寫",
  max40: "最多填40字母",
  max400: "最多填400字",
  missionControl: "草根文化館",
  invalidEmail: "必須符合電郵地址格式，如 sjkelvin23@gmail.com",
};

var isSubmitSuccessful = false;

export default function ContactForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "5561f46b-c354-4847-9f43-13e57e8d2e68");
    formData.append("subject", "一般查詢 - " + objectBefore.senderName);
    草根文化館;

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      isSubmitSuccessful = true;
      console.log(result);
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography color={green[900]}>
          {" "}
          <strong>電郵已送出，謝謝</strong>
        </Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="senderName"
            id="senderName"
            required
            placeholder={inputFillChecking.placeholder}
            label={inputFillChecking.titleName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            id="email"
            required
            label={inputFillChecking.titleEmail}
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={inputFillChecking.titleContent}
            fullWidth
            required
            multiline
            maxRows={4}
            name="message"
            id="outlined-multiline-flexible"
            variant="standard"
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "60vw", padding: 1, margin: 2 }}
          >
            送出電郵
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <input
            type="hidden"
            name="from_name"
            value={inputFillChecking.missionControl}
          ></input>
        </Grid>
      </Grid>
    </form>
  );
}
