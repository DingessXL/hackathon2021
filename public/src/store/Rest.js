import axios from "axios"
// import { Promise } from 'es6-promise'

export default {
  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get("/allUsers").then(res => {
        resolve(res.data);
      })
    })
  },
  getAllCards() {
    return new Promise((resolve, reject) => {
      axios.get("/allCards").then(res => {
        resolve(res.data);
      })
    })
  }  
    
  // },
  // getAllCards() {
  //   let res = await axios.get("/allCards");
  //   return res.data;
  
}