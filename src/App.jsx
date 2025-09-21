import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "./features/todoSlices";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "reactstrap";

const App = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((item) => item.todos);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }
    if (editId) {
      dispatch(updateTodo({ id: editId, task: input }));
      setEditId(null);
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  const handleEditClick = (todo) => {
    setInput(todo.task);
    setEditId(todo.id);
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
      <div className="w-full max-w-3xl mt-8 overflow-hidden rounded-2xl shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-center font-medium">Task</th>
              <th className="px-6 py-3 text-center font-medium">Actions</th>
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
                  <td className="px-6 py-4 text-gray-800 text-center">
                    {item.task}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-3">
                    <IconButton
                      onClick={() => handleEditClick(item)}
                      className="!text-indigo-600 hover:!bg-indigo-50 transition-colors"
                    >
                      <EditDocumentIcon />
                    </IconButton>{" "}
                    <IconButton
                      className="!text-red-600 hover:!bg-red-50 transition-colors"
                      onClick={() => dispatch(removeTodo(item.id))}
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
    </div>
  );
};

export default App;
