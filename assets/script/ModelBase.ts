/*
 * @Author: zpz
 * @Date: 2023-12-15 15:24:37
 * @LastEditors: zpz
 * @LastEditTime: 2023-12-21 11:40:55
 * @Description:  
 */

import { Mobx } from "./GameApp";
import MobxTest from "./MobxTest";


var keysSymbol = /*#__PURE__*/Symbol("mobx-keys");
var $mobx = /*#__PURE__*/Symbol("mobx administration");
var defineProperty = Object.defineProperty;
var objectPrototype = Object.prototype;
var action = Mobx.action;
var observable = Mobx.observable;
var computed = Mobx.computed;

function addHiddenProp(object, propName, value) {
    defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}

/** 遍历类中定义的属性和方法成员，添加对应的mobx观察状态 */
function makeAutoObservable(cls1: any): {  [key: string]: any } {
    // var adm = asObservableObject(cls1, null)[$mobx];
    // 拿到所有成员
    var proto = Object.getPrototypeOf(cls1);
    // 拿到所有定义的属性成员
    var proto1 = Object.keys(cls1);
    // 拿到所有定义的函数方法
    var proto2 = Object.getOwnPropertyDescriptors(proto);
    // 梳理所有定义的成员，进行Mobx观察状态添加
    const observableMap: {  [key: string]: any } = {};
    for(let key in proto1) {
        // 属性成员添加observable
        observableMap[proto1[key]] = observable;
    }
    for (let key in proto2) {
        const e = proto2[key];
        if (key === 'constructor') {
            // 跳过构造函数
            continue;
        }
        if (e.value) {
            if (typeof e.value === 'function') {
                // 函数方法添加action
                observableMap[key] = action;
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