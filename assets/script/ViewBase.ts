/*
 * @Author: zpz
 * @Date: 2024-01-15 21:24:56
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-15 22:00:22
 * @Description:  
 */
import { Component } from "cc";
import { Mobx } from "./GameApp";
import { autorun, reaction, when } from "mobx";
export default class ViewBase extends Component {
    /** 保存mobx反应disposer */
    private _mobxDisposers: any[] = [];

    /**
     * 封装autorun
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
     * @param predicate 跟踪观察对象，判断结果
     * @param runFn 如果第一个参数结果为true，则自动执行
     */
    public when(predicate: () => boolean, runFn: () => any) {
        const disposer = Mobx.when(predicate, runFn)
        this._mobxDisposers.push(disposer);
    }

    /** 界面销毁时自动调用 */
    public onDestroy() {
        if (this._mobxDisposers && this._mobxDisposers.length > 0) {
            this._mobxDisposers.forEach(disposer => {
                disposer && disposer();
            });
            this._mobxDisposers = null;
        }
    }
}