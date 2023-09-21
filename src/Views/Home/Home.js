import React, { useEffect } from "react";
import { useState } from "react";
import Task from "../../component/Task/Task";
import "./Home.css"

const Home = () => {
    const [card, setcard] = useState([

        {
            id:1,
            title:'Fan',
            description:'this product is very good',
            priority:'NEW'
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
    
    ])

    const [title, setTitle] = useState(' ')
    const [description, setDescription] = useState(' ')
    const [priority, setPriority] = useState(' ')

    // const loadListFromLocalStorage = () =>{
    //     const list = JSON.parse(localStorage.getItem('mahamart'))
    // }
    useEffect(()=>{
        const list = JSON.parse(localStorage.getItem('mahamart'));
        setcard(list)
    }, [])

    const saveListToLocalStorage = (tasks) => {
              localStorage.setItem('mahamart', JSON.stringify(tasks))
    }

    const addTaskTolist = () =>{
        const randomId = Math.floor(Math.random()* 500);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }

        const newCard = ([...card, obj])
       
       setcard(newCard) 
       setTitle('');
       setDescription('');
       setPriority('');

       saveListToLocalStorage(newCard);
    }



    // delet
    const removeTaskfromList = (obj) => {
        
          const index = card.indexOf(obj);
           
          
          const tempArray = card;
          tempArray.splice(index, 1);

          
        
          setcard([...tempArray])

          saveListToLocalStorage(tempArray)
    }
    return (
        <div className="container">
           <div className="navbar-card">
           <h1 className="app-name"> MahaMart <i class="fa-solid fa-cart-shopping "></i></h1>
           
           <p className="card-nav margin-start">HOME</p>
           <p className="card-nav">ABOUT</p>
           <p className="card-nav">CONTACT</p>
           </div>

           <div className="app-flex">
              <div>
                <h3 className="text-center">Slow Product List</h3>
                {
                    card.map((card, index)=>{
                        const {id, title, description, priority} = card;
                         
                        return <Task id={id} 
                        title={title} 
                        description={description}
                         priority={priority}
                         key={index}
                         removeTaskfromList={removeTaskfromList}
                         obj={card}
                         />
                    })
                }
              </div>

              <div>
              <div className="push-card">
                <h3 className="text-center">Add Product</h3>
                <div className="add-task-from-container">
                    {/* <h3>show me title: {title} </h3> */}
                </div>
                <form>
                
                <input type="text" className="input" placeholder="enter title" value={title} onChange={(event)=>{
                    setTitle(event.target.value)
                }}/> <br></br>
                <input type="text" className="input" placeholder="Enter description" value={description} onChange={(event)=>{
                    setDescription(event.target.value)
                }}/><br></br> 
                 <input type="text" className="input" placeholder="Enter priority" value={priority} onChange={(event)=>{
                    setPriority(event.target.value)
                 }}/><br></br>
                 <button type="button" className="input btn" onClick={addTaskTolist}>Creat</button> <br></br> 
               
                
                </form>
                </div> 
                
              </div>
           </div>
           <div className="footer">
              <h4 className="foot-card">copywrite@ AbhijeetKokat007 </h4>
           </div>
        </div>

    )
}

export default Home
