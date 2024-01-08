/*
 * @Author: zpz
 * @Date: 2023-12-15 15:28:26
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-08 16:41:20
 * @Description:  
 */
import * as cc from 'cc';
import TestModel from './TestModel';
import { Mobx } from './GameApp';
import MobxTest from './MobxTest';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends cc.Component {
    @property(cc.Button)
    BtnAdd: cc.Button = null;
    @property(cc.Button)
    BtnChangeArr: cc.Button = null;
    @property(cc.Button)
    BtnChangeObj: cc.Button = null;

    private _model: TestModel = null;

    private _t: MobxTest = null;

    protected onLoad(): void {
        this._model = new TestModel();
        this._t = new MobxTest();
        Mobx.autorun(() => {
            console.log('testLv: ', this._model.testLv);
        });
        Mobx.autorun(() => {
            console.log('testArr: ', this._model.testArr.length);
        });
        Mobx.autorun(() => {
            console.log('testObj: ', this._model.testObj.name);
        });
        Mobx.autorun(() => {
            console.log('testObj: ', this._model.testObj.age);
        });
    }

    public onBtnAdd(): void {
        this._model.testLv++;
    }

    public onBtnChangeArr(): void {
        this._model.testArr.push(this._model.testLv);
        // this._model.dosomething();
    }

    public onBtnChangeObj(): void {
        this._model.testObj.name = Math.random().toString();
        this._model.testObj.age = Math.random() * 10;
    }
}