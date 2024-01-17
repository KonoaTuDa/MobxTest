/*
 * @Author: zpz
 * @Date: 2024-01-16 18:30:07
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-17 15:24:06
 * @Description:  
 */
import { Component } from "cc";
import Mobx from "./Mobx";

export default class ViewBase extends Component {
    /** 保存mobx反应disposer */
    private _mobxDisposers: any[] = [];

    /**
     * 封装autorun 当runFn内被观察的对象发生改变时，会自动执行，第一次调用会自动执行一次runFun
     * @param runFn 自动执行的函数 
     */
    public autorun(runFn: () => any) {
        const disposer = Mobx.autorun(runFn);
        this._mobxDisposers.push(disposer);
    }

    /**
     * 封装reaction 
     * @param expression 跟踪观察对象并返回结果，作为第二个参数runFun的输入
     * @param runFn 自动执行的函数
     */
    public reaction(expression: () => any, runFn: (args: any) => any) {
        const disposer = Mobx.reaction(expression, runFn)
        this._mobxDisposers.push(disposer);
    }

    /**
     * 封装when
     * @param predicate 跟踪观察对象，判断结果 如果结果为true，自动执行runFn
     * @param runFn 
     */
    public when(predicate: () => boolean, runFn: () => any) {
        const disposer = Mobx.when(predicate, runFn)
        this._mobxDisposers.push(disposer);
    }

    /** 界面销毁时自动调用 若子类需要重写onDestroy，一定要记得super.onDestroy() */
    public onDestroy() {
        if (this._mobxDisposers && this._mobxDisposers.length > 0) {
            this._mobxDisposers.forEach(disposer => {
                disposer && disposer();
            });
            this._mobxDisposers = null;
        }
    }
}