import * as cc from 'cc';
import TestModel from './TestModel';
import { Mobx } from './GameApp';

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

    protected onLoad(): void {
        this._model = new TestModel();
        Mobx.autorun(() => {
            console.log('testLv: ', this._model.testLv);
        });
        Mobx.autorun(() => {
            console.log('testArr: ', this._model.testArr);
        });
        Mobx.autorun(() => {
            console.log('testObj: ', this._model.testObj);
        });
    }

    public onBtnAdd(): void {
        this._model.testLv++;
    }

    public onBtnChangeArr(): void {
        this._model.testArr.push(this._model.testLv);
    }

    public onBtnChangeObj(): void {
        this._model.testObj.testLv = this._model.testLv;
    }
}