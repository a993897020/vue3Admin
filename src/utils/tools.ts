/*
 * @Author: 关振俊
 * @Date: 2022-07-15 09:38:04
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-15 10:03:26
 * @Description: 
 */
/**
 * 
 * @param time 毫秒时间
 * @returns 
 */
export const onPending=(time:number):Promise<void>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(),time)
    })
}
