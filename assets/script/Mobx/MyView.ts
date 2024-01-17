/*
 * @Author: zpz
 * @Date: 2024-01-17 15:23:23
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-17 15:23:56
 * @Description:  
 */
import { _decorator } from "cc";
import MyModel from "./MyModel";
import ViewBase from "./ViewBase";

const { ccclass } = _decorator;

@ccclass('MyView')
export default class MyView extends ViewBase {
    private _model: MyModel = null;
    private _flag: boolean = false;

    protected start(): void {
        this._model = new MyModel();

        this.autorun(() => {
            this.showTestLv();
        });

        this.reaction(() => {
            return this._model.testArr.length;
        }, (len: number) => {
            this.showArrLen(len);
        });

        this.when(() => {
            return this._model.testObj.age >= 5;
        }, () => {
            this.showTestObj();
        })
    }

    private showTestLv(): void {
        console.log('testLv: ', this._model.testLv);
    }

    private showArrLen(len: number): void {
        console.log('arrLen: ', len);
        console.log('testArr: ', this._model.testArr);
    }

    private showTestObj(): void {
        console.log('testObj: ', this._model.testObj);
    }

    private testDestroy(): void {
        console.log('testDestroy');
        this.node.removeFromParent();
        this.node.destroy();
    }

    private onBtnAdd(): void {
        this._model.testLv++;
    }

    private onBtnArr(): void {
        this._model.testArr.push(Math.random() * 10);
    }

    private onBtnObj(): void {
        if (!this._flag) {
            this._model.doSomething();

        } else {
            this.testDestroy();
            return;
        }
        if (this._model.testObj.age <= 4) {
            this._flag = true;
            this.showTestObj();
            console.log('flag is true , next click will destroy MyView Node')
        }

    }
}