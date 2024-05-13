import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import expenseForm from "../styles/expenseForm.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { updateExpense, calculateTotal } from "../Redux/expenseSlice";
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
export const UpdateExpense = () => {
  const { index } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expenses } = useSelector((state) => state.expenses);

  const fetchedExpense = expenses[index];

  const formik = useFormik({
    initialValues: {
      description: "",
      amount: "",
      selectBox: "",
      date: "",
    },

    onSubmit: (values, onSubmitprops) => {
      onSubmitprops.setSubmitting(false);
      update(values.description, values.amount, values.selectBox, values.date);

      formik.handleReset();
    },

    validationSchema: Yup.object({
      description: Yup.string().required("Description is Required"),
      amount: Yup.string().required("Amount is Required"),
      selectBox: Yup.string().required("SelectBox is Required"),
      date: Yup.string().required("Date is Required"),
    }),
  });

  const update = (description, amount, selectBox, date) => {
    dispatch(
      updateExpense({
        index: index,
        description,
        amount,
        selectBox,
        date,
      })
    );
    dispatch(calculateTotal());
    navigate("/");
  };

  useEffect(() => {
    formik.setValues({
      description: fetchedExpense.description,
      amount: fetchedExpense.amount,
      date: fetchedExpense.date,
    });
  }, [fetchedExpense]);

  return (
    <div>
      <Box
        className={expenseForm.container}
        sx={{
          margin: { lg: "0", md: "0", sm: "0", xs: "auto" },
          width: { lg: "40%", md: "100%", sm: "100%", xs: "100%" },
        }}
      >
        <Box sx={{ backgroundColor: "whitesmoke" }}>
          <Typography
            sx={{
              fontSize: { lg: "50px", md: "50px", sm: "50px", xs: "35px" },
            }}
            bgcolor="black"
            color="white"
            padding="20px"
            textAlign="center"
          >
            Expense Tracker
          </Typography>

          <Typography variant="h4" textAlign="center" marginTop="10px">
            Transaction Update
          </Typography>
          <br />

          <form onSubmit={formik.handleSubmit}>
            <Grid item container lg={12} spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className={expenseForm.inputField}>
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Date"
                    variant="outlined"
                    autoComplete="off"
                    type="date"
                    name="date"
                    sx={{
                      width: "90%",
                    }}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>

                {formik.touched.date && formik.errors.date ? (
                  <Box className={expenseForm.error}>{formik.errors.date}</Box>
                ) : (
                  ""
                )}
              </Grid>
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
                    Update Transaction
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </div>
  );
};
