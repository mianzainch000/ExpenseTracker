import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense } from "../Redux/expenseSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../Redux/expenseSlice";
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

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "500px;", width: "90%", margin: "auto" }}
      >
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
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {data.date}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {data.description}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
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
                    fontSize: "30px;",
                    textAlign: "center",
                  }}
                />
              </TableCell>
              <TableCell>
                <NavLink to={`/update/${index}`}>
                  <EditIcon
                    sx={{
                      color: "yellow;",
                      fontSize: "30px;",
                      textAlign: "center",
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
