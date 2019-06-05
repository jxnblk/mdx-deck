import { useEffect } from 'react'

const STORAGE_INDEX = 'mdx-slide'
const STORAGE_STEP = 'mdx-step'

const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('open', function () {
  console.log('ws:connected !!')
});
socket.addEventListener('error', function (event) {
  console.log('ws:error !!',event)
});


function useSocketMessage({ goto, update,index, step }){
  useEffect(function(){
    function handler(event) {
      const data=JSON.parse(event.data);
      console.log('Message from server ', data);
      if(data.type==='broadcast'){
        const value=data.payload.value-0;
        if(data.payload.type===STORAGE_INDEX && value!==index){
          localStorage.setItem(STORAGE_INDEX, value)
          goto(value)
        }else if(data.payload.type===STORAGE_STEP && value!==step){
          localStorage.setItem(STORAGE_STEP, value)
          update({ step: value})
        }
      }else{
        console.log('Message from server ', data);
      }
    }
    socket.addEventListener('message', handler);
    return function(){
      socket.removeEventListener('message', handler);
    }
  },[goto, update])
}
const useSocket = (slide, step) => {
  useEffect(() => {
    try {
        const msg=JSON.stringify({type:'broadcast',payload:{
          type:STORAGE_INDEX,
          value:slide,
          [STORAGE_STEP]:step
        }})
        socket.send(msg);
      } catch (err) {
        console.error('error while sending ws:message ',err)
      }
  }, [slide])
  useEffect(() => {
    try {
        const msg=JSON.stringify({type:'broadcast',payload:{
          type:STORAGE_STEP,
          value:step,
          [STORAGE_INDEX]:slide,
        }})
        socket.send(msg);
      } catch (err) {
        console.error('error while sending ws:message ',err)
      }
  }, [step])
}




export default ({ goto, update, index, step }) => {
  useSocketMessage({ goto, update ,index, step});
  useSocket(index,step)
  return false
}
