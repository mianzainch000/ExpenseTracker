import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense } from "../Redux/expenseSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../Redux/expenseSlice";
import expenseForm from "../styles/expenseForm.module.css";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  Button,
} from "@mui/material";

export const ReadExpense = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { expenses } = useSelector((state) => state.expenses);

  console.log(expenses);
  // const expenses = useSelector((state) => state.expenses.expenses);

  const handleDeleted = (index) => {
    dispatch(deleteExpense(index));
    dispatch(calculateTotal());
  };

  return (
    <>
      {/* Dialog Box */}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogContentText>
            Are you sure wnat to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleted(deleteId);
              setDialogOpen(false);
            }}
            sx={{ color: "red" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}

      <TableContainer component={Paper} className={expenseForm.tableContainer}>
        <Table aria-label="simple table" stickyHeader>
          {expenses?.map((data, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor:
                  data.selectBox === 1
                    ? "lightGreen"
                    : data.selectBox === 2
                    ? "red"
                    : "inherit",
              }}
            >
              <TableCell
                sx={{
                  fontSize: {
                    lg: "20px",
                    sm: "20px",
                    md: "20px",
                    xs: "16px",
                  },
                }}
                className={expenseForm.tableCell}
              >
                {data.date}
              </TableCell>

              <TableCell
                sx={{
                  fontSize: {
                    lg: "20px",
                    sm: "20px",
                    md: "20px",
                    xs: "16px",
                  },
                }}
                className={expenseForm.tableCell}
              >
                {data.description}
              </TableCell>

              <TableCell
                sx={{
                  fontSize: {
                    lg: "20px",
                    sm: "20px",
                    md: "20px",
                    xs: "16px",
                  },
                }}
                className={expenseForm.tableCell}
              >
                {data.amount}
              </TableCell>

              <TableCell
                onClick={() => {
                  setDeleteId(index);
                  setDialogOpen(true);
                }}
              >
                <DeleteIcon
                  sx={{
                    color: "white;",
                    fontSize: {
                      lg: "40px",
                      md: "40px",
                      sm: "40px",
                      xs: "30px",
                    },
                  }}
                />
              </TableCell>

              <TableCell>
                <NavLink to={`/update/${index}`}>
                  <EditIcon
                    sx={{
                      color: "yellow;",
                      fontSize: {
                        lg: "40px",
                        md: "40px",
                        sm: "40px",
                        xs: "30px",
                      },
                    }}
                  />
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};
