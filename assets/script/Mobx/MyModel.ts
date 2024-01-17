/*
 * @Author: zpz
 * @Date: 2024-01-16 18:14:44
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-17 15:23:50
 * @Description:  
 */
import ModelBase from "./ModelBase";

export default class MyModel extends ModelBase {
    private _testLv: number = 0;
    private _testArr: number[] = [];
    private _testObj: {name: string, age: number} = {name: "my", age: 0};

    constructor() {
        super();
        this.makeAutoObservable(this);
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
    
    public get testObj(): {name: string, age: number} {
        return this._testObj;
    }
    public set testObj(value: {name: string, age: number}) {
        this._testObj = value;
    }

    public doSomething(): void {
        this.testObj.name = Math.random().toString();
        this.testObj.age = Math.random() * 10;
    }
}