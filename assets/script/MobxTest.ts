import { Mobx } from "./GameApp";

export default class MobxTest {
    public _testLv: number = 0;
    public _testArr: number[] = [];
    public _testObj: any = {};

    public tmpv: number = 0;

    constructor() {
        // this.mob(this);
    }

    public mob(clz: any) {
        return Mobx.makeAutoObservable(clz);
    }

    public set testLv(value: number) {
        this._testLv = value;
    }
    public get testLv(): number {
        return this._testLv;
    }
    public set testArr(value: number[]) {
        this._testArr = value;
    }
    public get testArr(): number[] {
        return this._testArr;
    }
    public set testObj(value: any) {
        this._testObj = value;
    }
    public get testObj(): any {
        return this._testObj;
    }

    public dosomething(): void {
        console.log('sss');
    }

    public getsomething(): any {
        let obj: any = {};
        return obj;
    }
}