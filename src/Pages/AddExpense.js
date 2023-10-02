import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ReadExpense } from "./ReadExpense";
import { useDispatch, useSelector } from "react-redux";
import expenseForm from "../styles/expenseForm.module.css";
import { addExpense, calculateTotal } from "../Redux/expenseSlice";
import {
  TextField,
  Grid,
  Button,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";

export const AddExpense = () => {
  const dispatch = useDispatch();
  let totalIncomeVar = useSelector((state) => state.expenses.totalIncome);
  let totalExpenceVar = useSelector((state) => state.expenses.totalExpence);

  const formik = useFormik({
    initialValues: {
      description: "",
      amount: "",
      selectBox: "",
    },

    onSubmit: (values, onSubmitprops) => {
      onSubmitprops.setSubmitting(false);
      postExpense(values);
      formik.handleReset();
    },

    validationSchema: Yup.object({
      description: Yup.string()
        .required("Description is Required")
        .matches(/^[A-Za-z]+$/, "Only Alphabets are Allowed"),
      amount: Yup.string().required("Amount is Required"),
      selectBox: Yup.string().required("SelectBox is Required"),
    }),
  });

  const postExpense = (values) => {
    console.log({ values });
    dispatch(addExpense(values));
    dispatch(calculateTotal());
  };

  return (
    <div>
      <Box
        className={expenseForm.container}
        sx={{
          margin: { lg: "0", md: "0", sm: "0", xs: "auto" },
          width: { lg: "40%", md: "10n0%", sm: "100%", xs: "100%" },
        }}
      >
        <Box>
          <Typography
            bgcolor="black"
            color="white"
            padding="20px"
            textAlign="center"
            sx={{
              fontSize: { lg: "50px", md: "50px", sm: "50px", xs: "35px" },
            }}
          >
            Expense Tracker
          </Typography>
          <Box sx={{ backgroundColor: "whitesmoke" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography fontSize="30px">Current Balance</Typography>
              <Typography
                borderBottom="1px solid black"
                width="90%"
                margin="auto"
              ></Typography>
              <Typography variant="h3">
                ${totalIncomeVar - totalExpenceVar}
              </Typography>
              <Box className={expenseForm.income_expense}>
                <Box>
                  {" "}
                  <Typography fontSize="30px"> Income</Typography>
                  <Typography fontSize="30px">${totalIncomeVar} </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography fontSize="30px">Expence</Typography>
                  <Typography fontSize="30px">${totalExpenceVar}</Typography>
                </Box>
              </Box>
              <Typography variant="h4" marginTop="10px">
                Transcation History
              </Typography>
              <br />
              <ReadExpense />
              <br />
              <Typography
                borderBottom="1px solid black"
                width="90%"
                textAlign="center"
                margin="auto"
              ></Typography>
              <br />
              <Typography variant="h4">Transcation Add</Typography>
              <br />
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <Grid item container lg={12} spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box className={expenseForm.inputField}>
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      autoComplete="off"
                      type="text"
                      name="description"
                      sx={{
                        width: "90%",
                      }}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>

                  {formik.touched.description && formik.errors.description ? (
                    <Box className={expenseForm.error}>
                      {formik.errors.description}
                    </Box>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box className={expenseForm.inputField}>
                    <TextField
                      id="outlined-basic"
                      label="Amount"
                      variant="outlined"
                      autoComplete="off"
                      type="number"
                      name="amount"
                      sx={{
                        width: "90%",
                      }}
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>

                  {formik.touched.amount && formik.errors.amount ? (
                    <Box className={expenseForm.error}>
                      {formik.errors.amount}
                    </Box>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box className={expenseForm.inputField}>
                    <Box
                      sx={{
                        width: "90%",
                      }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="amount"
                          name="selectBox"
                          value={formik.values.selectBox}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem value={1}>Income</MenuItem>
                          <MenuItem value={2}>Expense</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  {formik.touched.selectBox && formik.errors.selectBox ? (
                    <Box className={expenseForm.error}>
                      {formik.errors.selectBox}
                    </Box>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box className={expenseForm.inputField}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={
                        !formik.isValid ||
                        formik.values.amount.length === 0 ||
                        formik.isSubmitting
                      }
                      className={expenseForm.button}
                      sx={{
                        width: "90%",
                      }}
                    >
                      Add Transcation
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
