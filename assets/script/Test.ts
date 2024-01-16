/*
 * @Author: zpz
 * @Date: 2023-12-15 15:28:26
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-15 21:58:48
 * @Description:  
 */
import * as cc from 'cc';
import TestModel from './TestModel';
import { Mobx } from './GameApp';
import MobxTest from './MobxTest';
import ViewBase from './ViewBase';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends ViewBase {
    @property(cc.Button)
    BtnAdd: cc.Button = null;
    @property(cc.Button)
    BtnChangeArr: cc.Button = null;
    @property(cc.Button)
    BtnChangeObj: cc.Button = null;

    private _model: TestModel = null;

    private _t: MobxTest = null;

    private _flag: boolean = false;

    protected onLoad(): void {
        this._model = new TestModel();
        // this._t = new MobxTest();

        this.autorun(() => { 
            this.showTestLv();
        });

        this.reaction(() => {
            return this._model.testArr.length;
        }, (args) => { 
            this.showTestArr(args); 
        });
        
        this.when(() => {
            return this._model.testObj.age <= 2;
        }, () => { 
            this.showTestObj(); 
        });
    }

    private showTestLv(): void {
        console.log('testLv: ', this._model.testLv);
    }

    private showTestArr(length: number): void {
        console.log('testArr: ', length);
    }

    private showTestObj(): void {
        console.log('testObj: ', this._model.testObj);
        this._flag = true;
    }


    public onBtnAdd(): void {
        this._model.testLv++;
    }

    public onBtnChangeArr(): void {
        this._model.testArr.push(this._model.testLv);
        // this._model.dosomething();
    }

    public onBtnChangeObj(): void {
        if (this._flag) {
            this.node.removeFromParent();
            this.node.destroy();
            return;
        }
        this._model.testObj.name = Math.random().toString();
        this._model.testObj.age = Math.random() * 10;
    }
}