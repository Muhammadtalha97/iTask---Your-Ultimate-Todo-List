import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const ToggleFinish = (e) => {
    setshowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  },[]);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    
    savetoLS(); 
  };
  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:w-[40%] md:mx-auto my-5 p-5 rounded-xl bg-violet-300 min-h-[80vh]">
        <h1 className="font-bold text-center text-2xl font-serif">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className=" text-lg font-bold font-serif">Add a Todo</h2>
          <div className="flex">
          <input
            onChange={handleChange}
            value={todo}
            className="w-full rounded-full px-3 py-1 shadow-xl "
            type="text"
            placeholder="Enter Your Task upto 3 character"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className=" mx-1 bg-violet-800 disabled:bg-violet-400 hover:bg-violet-950  text-sm font-bold py-2 px-5 text-white rounded-full "
          >
            Save
          </button>
          </div>
        </div>
        <input
        className="my-4"
          onChange={ToggleFinish}
          type="checkbox"
          checked={showFinished}
          name=""
          id="show"
        />{" "}
        <label className="mx-3" htmlFor="show">Show Finished</label>

        <div className="h-[2px] bg-black opacity-35 w-[90%] mx-auto my-2"></div>

        <h2 className="text-lg font-bold font-serif ">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-6">No Todos to Display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex  my-3 justify-between  "
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className=" bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className=" bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
