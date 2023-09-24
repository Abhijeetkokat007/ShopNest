import React, { useEffect } from "react";
import { useState } from "react";
import Task from "../../component/Task/Task";
import showToast from "crunchy-toast";
import { saveListToLocalStorage } from "../../Util/LocalStorage";
import "./Home.css";

const Home = () => {
  const [card, setcard] = useState([
    {
      id: 1,
      title: "Fan",
      description: "this product is very good",
      priority: "NEW",
    },
    // {
    //     id:2,
    //     title:'Books',
    //     description:'this product is very good',
    //     priority:'NEW'
    // },
    // {
    //     id:3,
    //     title:'Cheair',
    //     description:'this product is very good',
    //     priority:'OLD'
    // },
    // {
    //     id:4,
    //     title:'Mobail Phone',
    //     description:'this product is very good',
    //     priority:'OLD'
    // }
  ]);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(" ");
  const [priority, setPriority] = useState(" ");
  const [isEdit, setIsEdit] = useState(false);

  // const loadListFromLocalStorage = () =>{
  //     const list = JSON.parse(localStorage.getItem('mahamart'))
  // }
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('mahamart'));
    
    if (list && list.length >= 0) {
      setcard(list);
    }

  }, []);

  // const saveListToLocalStorage = (tasks) => {
  //     localStorage.setItem("mahamart", JSON.stringify(tasks));
  // };

  const clearInputFields = () => {
    setTitle("");
    setDescription("");
    setPriority("");
  }

  const findTaskndexById = (taskId) => {
    let index;
    card.forEach((task, i) => {
      if (task.id === taskId) {
        index = i
      }
    })
    return index;
  }

  const checkRequiredFields = () => {
    if (!title) {
      showToast("Title is required!", "alert", 3000);
      return false;
    }

    if (!description) {
      showToast("Description is required!", "alert", 3000);
      return false;
    }

    if (!priority) {
      showToast("Priority is required!", "alert", 3000);
      return false;
    }

    return true;
  };

  const addTaskTolist = () => {
    if (checkRequiredFields() === false) {
      return;
    }
    const randomId = Math.floor(Math.random() * 500);
    const obj = {
      id: randomId,
      title: title,
      description: description,
      priority: priority,
    };

    const newCard = [...card, obj];

    setcard(newCard);
    // setTitle("");
    // setDescription("");
    // setPriority("");
    clearInputFields();

    saveListToLocalStorage(newCard);
    showToast("Task added successfully!", "success", 3000);

    
  }

  // delet
  const removeTaskfromList = (obj) => {
    const index = card.indexOf(obj);

    const tempArray = card;
    tempArray.splice(index, 1);

    setcard([...tempArray]);

    saveListToLocalStorage(tempArray);
    showToast("Task deledet successfully!", "alert", 3000);
  };

  const setTaskEditable = (id) => {
    setIsEdit(true);
    setId(id);
    // let currentEditTask;

    // card.forEach((task) => {
    //     if (task.id === id) {
    //         currentEditTask = task;
    //     }
    // })

    const index = findTaskndexById(id);
    const currentEditTask = card[index];

    setTitle(currentEditTask.title);
    setDescription(currentEditTask.description);
    setPriority(currentEditTask.priority);
    //    setTitle(currentEditTask.title);
  }

  const updateTask = () => {
    let indexToUpdate;
    card.forEach((task, i) => {
      if (task.id === id) {
        indexToUpdate = i;
      }
    })

    // if(checkRequiredFields() === false){
    //   return;
    // }
    // const indexToUpdate = findTaskndexById(id);
    const tempArray = card;
    tempArray[indexToUpdate] = {
      id: id,
      title: title,
      description: description,
      priority: priority,
    };

    setcard([...tempArray]);
    saveListToLocalStorage(tempArray);
    setId(0);
    setTitle("");
    setDescription("");
    setPriority("");

    setIsEdit(false);
    showToast("Task updated successfully!", "info", 3000);
  };

  return (
    <div className="container">
      <div className="navbar-card">
        <h1 className="app-name">
          {" "}
          ShopNest <i class="fa-solid fa-cart-shopping "></i>
        </h1>

        <p className="card-nav margin-start">HOME</p>

        <p className="card-nav">ABOUT</p>
        <p className="card-nav">CONTACT</p>
      </div>

      <div className="app-flex">
        <div>
          <h3 className="text-center">Slow Product List</h3>
          {card.map((card, index) => {
            const { id, title, description, priority } = card;

            return (
              <Task
                id={id}
                title={title}
                description={description}
                priority={priority}
                key={index}
                removeTaskfromList={removeTaskfromList}
                obj={card}
                setTaskEditable={setTaskEditable}
              />
            );
          })}
        </div>

        <div>
          <div className="push-card">
            <h3 className="text-center">
              {isEdit ? `Update task ${id}` : `Add Task`}
            </h3>
            <div className="add-task-from-container">
              {/* <h3>show me title: {title} </h3> */}
            </div>
            <form>
              <input
                type="text"
                className="input"
                placeholder="enter title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />{" "}
              <br></br>
              <input
                type="text"
                className="input"
                placeholder="enter description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <br></br>
              <input
                type="text"
                className="input"
                placeholder="enter priority"
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                }}
              />
              <br></br>
              {/* <div className="d-flex">
                                {isEdit ? (
                                    <button
                                        type="button"
                                        className=" input btn"
                                        onClick={updateTask}
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="input btn"
                                        onClick={addTaskTolist}
                                    >
                                        Creat
                                    </button>
                                )}
                            </div> */}
              <div className="d-flex">
                <button
                  type="button"
                  className=" input btn"
                  onClick={() => {
                    isEdit ? updateTask() : addTaskTolist();
                  }}
                >
                  {isEdit ? "Update" : "Creat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <h4 className="foot-card">Devlope By <a className="git-footer" href="https://github.com/Abhijeetkokat007 ">@abhijeetkokat007<i class="fa-brands fa-github"></i></a> </h4>
      </div>
    </div>
  );
};

export default Home;
