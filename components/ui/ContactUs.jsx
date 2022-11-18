import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormHelperText, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography color={green[900]}>
          {" "}
          <strong>Data sent successfully</strong>
        </Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("firstName", {
              required: { value: true, message: "Field is required" },
              maxLength: {
                value: 20,
                message: "exceeded the limit of 20 characters",
              },
            })}
            id="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            error={!!errors.firstName}
          />
          {errors.firstName && (
            <FormHelperText error>{errors.firstName?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("lastName", {
              required: { value: true, message: "Field is required" },
              maxLength: {
                value: 20,
                message: "exceeded the limit of 20 characters",
              },
            })}
            id="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            error={!!errors.lastName}
          />
          {errors.lastName && (
            <FormHelperText error>{errors.lastName?.message}</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("email", {
              required: { value: true, message: "Field is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            id="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText error>{errors.email?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("address", {
              required: { value: true, message: "Field is required" },
            })}
            id="address"
            label="Address line"
            fullWidth
            autoComplete="street-address"
            variant="standard"
            error={!!errors.address}
          />
          {errors.address && (
            <FormHelperText error>{errors.address?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("city", {
              required: { value: true, message: "Field is required" },
            })}
            id="city"
            label="City"
            fullWidth
            autoComplete="address-level2"
            variant="standard"
            error={!!errors.city}
          />
          {errors.city && (
            <FormHelperText error>{errors.city?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("state", {
              required: { value: true, message: "Field is required" },
            })}
            id="state"
            label="State/Province/Region"
            fullWidth
            autoComplete="address-level1"
            variant="standard"
            error={!!errors.state}
          />
          {errors.state && (
            <FormHelperText error>{errors.state?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("country", { required: true })}
            id="country"
            label="Country"
            fullWidth
            autoComplete="country"
            variant="standard"
            error={!!errors.country}
          />
          {errors.country && (
            <FormHelperText error>{errors.country?.message}</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
