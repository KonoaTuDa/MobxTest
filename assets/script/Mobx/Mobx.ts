import { Component, _decorator } from "cc";
import mobx from "mobx/dist/mobx.cjs.development.js";

const { ccclass, executionOrder } = _decorator;
const configure = mobx.configure;

configure({
    enforceActions: "nerver",
})


@ccclass('Mobx')
@executionOrder(-999)
export default class Mobx extends Component {
    public static observable = mobx.observable;
    public static action = mobx.action;
    public static computed = mobx.computed;

    /** 遍历类中定义的属性和方法成员，添加对应的mobx观察状态，用于在子类中替代mobx的makeAutoObservable */
    public static myMakeAutoObservable(target: any) {
        // 拿到所有成员
        const proto = Object.getPrototypeOf(target);
        // 拿到所有定义的属性成员
        const proto1 = Object.keys(target);
        // 拿到所有定义的函数方法
        const proto2 = Object.getOwnPropertyDescriptors(proto);
        // 梳理所有定义的成员，进行Mobx观察状态添加
        const observableMap: { [key: string]: any } = {};

        let key: string = '';
        for (let i = 0; i < proto1.length; i++) {
            key = proto1[i];
            if (target[key] !== undefined && target[key] !== null) {
                // 为所有的属性和对象添加observable注解
                observableMap[key] = this.observable;
            }
        }
        for (key in proto2) {
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
                    // 函数方法添加action注解
                    observableMap[key] = this.action.bound;
                }
            }
            if (e.get) {
                // getter添加computed注解
                observableMap[key] = this.computed;
            }
        }
        return this.makeObservable(target, observableMap);
    }

    /**
     * 添加注解
     * @param target 目标实例对象 
     * @param annotations 注解内容
     * @param options 额外设置选项 https://mobx.nodejs.cn/observable-state.html
     * @returns 
     */
    public static makeObservable(target: any, annotations?: any, options?: any) {
        return mobx.makeObservable(target, annotations, options);
    }

    /**
     * 自动推断添加注解
     * @param target 目标实例对象
     * @param overrides 可用来指定某些对象不需要被注解
     * @param options 额外设置选项 https://mobx.nodejs.cn/observable-state.html
     * @returns 
     */
    public static makeAutoObservable(target: any, overrides: any, options: any) {
        return mobx.makeAutoObservable(target, overrides, options);
    }

    /**
     * 观察跟踪 runFn中涉及到的可观察对象，当对象发生改变时，自动执行。第一次调用时会默认执行一次runFn
     * @param runFn 
     * @returns 
     */
    public static autorun(runFn: () => any) {
        return mobx.autorun(runFn);
    }

    /**
     * 观察跟踪predicate中涉及到的可观察对象，当对象发生改变时，自动执行predicate，并拥有一个返回值，返回值为true时执行runFn
     * @param predicate 
     * @param runFn 
     * @returns 
     */
    public static when(predicate: () => boolean, runFn: () => any) {
        return mobx.when(predicate, runFn);
    }

    /**
     * 观察跟踪expression中涉及到的可观察对象，当对象发生改变时，自动执行expression，并拥有一个返回值，返回值作为参数传递给runFn，并执行runFn
     * @param expression 
     * @param runFn 
     * @returns 
     */
    public static reaction(expression: () => any, runFn: (args: any) => any) {
        return mobx.reaction(expression, runFn);
    }
}