/*
 * @Author: 关振俊
 * @Date: 2022-09-22 15:12:08
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-26 10:29:13
 * @Description: 
 */
import { io } from "socket.io-client";

const URL = "http://localhost:3050";
const socket:any = io(URL, { autoConnect: false });

socket.onAny((event:any, ...args:any) => {
  console.log(event, args);
});

export default socket;
