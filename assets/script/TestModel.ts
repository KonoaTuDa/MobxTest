/*
 * @Author: zpz
 * @Date: 2023-12-15 15:27:07
 * @LastEditors: zpz
 * @LastEditTime: 2024-01-08 16:18:35
 * @Description:  
 */
import { Mobx } from "./GameApp";
import ModelBase from "./ModelBase";
import RoleData from "./RoleData";

export default class TestModel extends ModelBase {
    private _testLv: number = 0;
    private _testArr: number[] = [];
    private _testObj: {name: string, age: number} = {name: "zpz", age: 18};

    public tmpv: number = 0;

    public roleData: RoleData = null;

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
    
    public get testObj(): {name: string, age: number} {
        return this._testObj;
    }
    public set testObj(value: {name: string, age: number}) {
        this._testObj = value;
    }

    public dosomething(): void {
        console.log('sss');
        this.roleData.Id++;
        this.roleData.Name = "zpz" + this.roleData.Id;
        this.roleData.SId++;
        console.log('roleData:', this.roleData)
    }

    public getsomething(): any {
        let obj: any = {};
        return obj;
    }
}