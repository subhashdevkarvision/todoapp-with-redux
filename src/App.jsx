import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "./features/todoSlices";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "reactstrap";

const App = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((item) => item.todos);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setErrorMsg("Task can not be empty!");
      return;
    }
    if (editId) {
      dispatch(updateTodo({ id: editId, task: input }));
      setEditId(null);
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
    setErrorMsg("");
  };

  const handleEditClick = (todo) => {
    setInput(todo.task);
    setEditId(todo.id);
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(removeTodo(deleteId));
    setOpenConfirm(false);
    setDeleteId(null);
  };
  return (
    <div className="min-h-screen bg-blend-darken flex flex-col items-center p-6 text-gray-50">
      <nav className="w-full bg-black shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
          <h1 className="text-white text-3xl font-extrabold tracking-wider">
            Todo Application
          </h1>
        </div>
      </nav>
      <form
        action=""
        className="w-full max-w-md my-6 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-transform transform hover:scale-[1.02]"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-2xl font-semibold text-center text-black mb-4">
          {editId ? "Edit Todo" : "Add Todo"}
        </h1>
        <TextField
          id="standard-basic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="Task Name  "
          variant="standard"
          className="w-full my-2"
        />
        <p className={errorMsg ? "block text-red-600" : "hidden"}>{errorMsg}</p>
        <Button
          type="submit"
          className=" w-full my-3
            bg-black         
            !text-white         
            hover:!bg-blue-600    
            transition-colors"
          variant="contained"
        >
          {editId ? "Update Task" : "Add Task"}
        </Button>
      </form>
      <div className="w-full max-w-3xl mt-8 overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse min-w-[320px]">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-center font-medium max-w-md w-3/4">
                Task
              </th>
              <th className="px-6 py-3 text-center font-medium w-1/4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {todos.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  align="center"
                  className="py-6 text-center text-gray-500"
                >
                  No Task Available
                </td>
              </tr>
            ) : (
              todos.map((item, index) => (
                <tr className="hover:bg-gray-50 transition-colors" key={index}>
                  <td className="px-6 py-4 text-gray-800 text-center break-words max-w-full sm:max-w-sm md:max-w-md whitespace-normal">
                    {item.task}
                  </td>
                  <td className="px-6 py-4 !text-center w-1/4">
                    <IconButton
                      onClick={() => handleEditClick(item)}
                      className="!text-indigo-600 hover:!bg-indigo-50 transition-colors"
                    >
                      <EditDocumentIcon />
                    </IconButton>{" "}
                    <IconButton
                      className="!text-red-600 hover:!bg-red-50 transition-colors"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
