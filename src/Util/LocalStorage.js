import Task from "../component/Task/Task";

export const saveListToLocalStorage = (tasks) => {
    localStorage.setItem("mahamart", JSON.stringify(tasks));
};