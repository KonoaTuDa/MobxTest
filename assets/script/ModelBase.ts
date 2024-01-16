/*
 * @Author: zpz
 * @Date: 2023-12-15 15:24:37
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-15 18:52:37
 * @Description:  
 */
/*
 * @Author: zpz
 * @Date: 2023-12-15 15:24:37
 * @LastEditors: zpz
 * @LastEditTime: 2023-12-21 11:40:55
 * @Description:  
 */

import { Mobx } from "./GameApp";
import MobxTest from "./MobxTest";


let keysSymbol = /*#__PURE__*/Symbol("mobx-keys");
let $mobx = /*#__PURE__*/Symbol("mobx administration");
let defineProperty = Object.defineProperty;
let objectPrototype = Object.prototype;
let action = Mobx.action;
let observable = Mobx.observable;
let computed = Mobx.computed;
let configure = Mobx.configure;

configure({
    enforceActions: "nerver",
    
})

function addHiddenProp(object, propName, value) {
    defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}

/** 遍历类中定义的属性和方法成员，添加对应的mobx观察状态 */
function makeAutoObservable(target: any): {  [key: string]: any } {
    // 拿到所有成员
    let proto = Object.getPrototypeOf(target);
    // 拿到所有定义的属性成员
    let proto1 = Object.keys(target);
    // 拿到所有定义的函数方法
    let proto2 = Object.getOwnPropertyDescriptors(proto);
    // 梳理所有定义的成员，进行Mobx观察状态添加
    const observableMap: {  [key: string]: any } = {};
    
    let key: string = '';
    for(let i = 0; i < proto1.length; i++) {
        key = proto1[i];
        if (target[key] !== undefined && target[key] !== null) {
            observableMap[key] = observable;
        }
    }
    // for(let key in proto1) {
    //     // 属性成员添加observable
    //     if (cls1[proto1[key]] instanceof Array) {
    //         observableMap[proto1[key]] = observable;
    //     } else if (cls1[proto1[key]] instanceof Object) {
    //         observableMap[proto1[key]] = observable;
    //     } else {
    //         observableMap[proto1[key]] = observable;
    //     }
    // }
    for (let key in proto2) {
        const e = proto2[key];
        if (key === 'constructor') {
            // 跳过构造函数
            continue;
        }
        if (target[key] == undefined || target[key] == null) {
            continue;
        }
        if (e.value) {
            if (typeof e.value === 'function') {
                // 函数方法添加action
                observableMap[key] = action.bound;
            }
        }
        if (e.get) {
            // getter添加computed
            observableMap[key] = computed;
        }
    } 
    return observableMap;
}


export default class ModelBase {
    constructor() {
    }

    public mob(clz: any): void {
        const map = makeAutoObservable(clz);
        const target = Mobx.makeObservable(clz, map);
        const testm = new MobxTest();
        const t2 = testm.mob(testm);
    }
}