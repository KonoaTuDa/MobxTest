/*
 * @Author: zpz
 * @Date: 2024-01-17 15:22:59
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-17 15:23:44
 * @Description:  
 */
import Mobx from "./Mobx";

export default class ModelBase {
    constructor() { }
    
    /** 遍历类中定义的属性和方法成员，添加对应的mobx观察状态 */
    public makeAutoObservable(target: any): void {
        Mobx.myMakeAutoObservable(target);
    }
}