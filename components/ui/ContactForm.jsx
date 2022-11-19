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
import React from "react";
import RadioSelection from "../ui/RadioSelection";

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
  invalidEmail: "必須符合電郵地址格式，如 sjkelvin23@gmail.com",
};

var selection = "female";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const onSubmit = (data) => {
    console.log("radio sent :" + JSON.stringify(selection));
    console.log("email sent :" + JSON.stringify(data));
  };

  if (isSubmitSuccessful) {
    setTimeout(
      function () {
        isSubmitSuccessful = false;
      }.bind(this),
      5000
    );

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            {...register("firstName", {
              required: {
                value: true,
                message: inputFillChecking.nonEmptyMessage,
              },
              maxLength: {
                value: 40,
                message: inputFillChecking.max40,
              },
            })}
            id="firstName"
            placeholder={inputFillChecking.placeholder}
            label={inputFillChecking.titleName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            error={!!errors.firstName}
          />
          {errors.firstName && (
            <FormHelperText error>{errors.firstName?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("email", {
              required: {
                value: true,
                message: inputFillChecking.nonEmptyMessage,
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: inputFillChecking.invalidEmail,
              },
            })}
            id="email"
            label={inputFillChecking.titleEmail}
            fullWidth
            autoComplete="email"
            variant="standard"
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText error>{errors.email?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} container justifyContent="center" fullWidth>
          <RadioSelection stateSelection="female" />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("content", {
              required: {
                value: true,
                message: inputFillChecking.nonEmptyMessage,
              },
              maxLength: {
                value: 400,
                message: inputFillChecking.max400,
              },
            })}
            label={inputFillChecking.titleContent}
            fullWidth
            maxRows={4}
            id="outlined-multiline-flexible"
            variant="standard"
            error={!!errors.content}
          />
          {errors.content && (
            <FormHelperText error>{errors.content?.message}</FormHelperText>
          )}
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
            sx={{ width: "50vw", padding: 1, margin: 2 }}
          >
            送出電郵
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
