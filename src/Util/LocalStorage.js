export const saveListToLocalStorage = (tasks) => {
    localStorage.setItem("mahamart", JSON.stringify(tasks));
};