import { LongNum } from "./long_num.js";

function test_add() {
    console.log('add')
    for (let i = 0; i < 10000; ++i) {
        let lhs = Math.floor(Math.random() * 10000 - 5000);
        let rhs = Math.floor(Math.random() * 10000 - 5000);


        let x = new LongNum(lhs.toString());
        let y = new LongNum(rhs.toString());

        if ((lhs + rhs).toString() !== x.plus(y).toString()) {
            console.log(lhs, rhs, x.plus(y).toString());
        }
    }
}

function test_sub() {
    console.log('sub')
    for (let i = 0; i < 10000; ++i) {
        let lhs = Math.floor(Math.random() * 10000 - 5000);
        let rhs = Math.floor(Math.random() * 10000 - 5000);


        let x = new LongNum(lhs.toString());
        let y = new LongNum(rhs.toString());

        if ((lhs - rhs).toString() !== x.minus(y).toString()) {
            console.log(lhs, rhs, x.minus(y).toString());
        }
    }
}

function test_mult() {
    console.log('mult')
    for (let i = 0; i < 10000; ++i) {
        let lhs = Math.floor(Math.random() * 10000 - 5000);
        let rhs = Math.floor(Math.random() * 10000 - 5000);


        let x = new LongNum(lhs.toString());
        let y = new LongNum(rhs.toString());

        if ((lhs * rhs).toString() !== x.mult(y).toString()) {
            console.log(lhs, rhs, x.mult(y).toString());
        }
    }
}

function test_stupid() {
    console.log('stupid')
    for (let i = 0; i < 100; ++i) {
        let lhs = Math.floor(Math.random() * 100) + 1;
        let rhs = Math.floor(Math.random() * 100) + 1;

        let x = new LongNum(lhs.toString());
        let y = new LongNum(rhs.toString());

        if ((lhs * rhs / rhs).toString() !== x.mult(y).stupid_div(y).toString()) {
            console.log(lhs, rhs, lhs * rhs / rhs, x.mult(y).stupid_div(y).toString());
        }
    }
}

function test_div() {
    console.log('div')
    for (let i = 0; i < 10000; ++i) {
        let lhs = Math.floor(Math.random() * 10000) - 5000;
        let rhs = Math.floor(Math.random() * 10000) - 5000;

        if (rhs == 0) {
            rhs = 1;
        }

        let x = new LongNum(lhs.toString());
        let y = new LongNum(rhs.toString());

        if ((lhs * rhs / rhs).toString() !== x.mult(y).div(y).toString()) {
            console.log(lhs, rhs, lhs * rhs / rhs, x.mult(y).div(y).toString());
        }
    }
}


let lhs = -1;
let rhs = 81;

let x = new LongNum(lhs.toString());
let y = new LongNum(rhs.toString());

if ((lhs * rhs / rhs).toString() !== x.mult(y).div(y).toString()) {
    console.log(lhs, rhs, x.mult(y).div(y).toString());
}

test_add()
test_sub()
test_mult()
test_stupid()
test_div()