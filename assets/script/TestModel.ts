/*
 * @Author: zpz
 * @Date: 2023-12-15 15:27:07
 * @LastEditors: zpz
 * @LastEditTime: 2023-12-21 11:54:04
 * @Description:  
 */
import { Mobx } from "./GameApp";
import ModelBase from "./ModelBase";

export default class TestModel extends ModelBase {
    public _testLv: number = 0;
    public _testArr: number[] = [];
    public _testObj: any = {};

    public tmpv: number = 0;

    constructor() {
        super();
        this.mob(this);
    }

    
    public get testLv(): number {
        return this._testLv;
    }
    public set testLv(value: number) {
        this._testLv = value;
    }
    
    public get testArr(): number[] {
        return this._testArr;
    }
    public set testArr(value: number[]) {
        this._testArr = value;
    }
    
    public get testObj(): any {
        return this._testObj;
    }
    public set testObj(value: any) {
        this._testObj = value;
    }

    public dosomething(): void {
        console.log('sss');
    }

    public getsomething(): any {
        let obj: any = {};
        return obj;
    }
}