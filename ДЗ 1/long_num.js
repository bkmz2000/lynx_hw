export class LongNum {
    // obj can be a string, a number or a LongNum.
    // Or any type, that produces a representation of an int with to_string
    constructor(obj = '') {
        this.digits = Array.from(obj.toString());
        this.neg = false;
        this.trim()
        if (this.digits.length == 0) {
            this.digits = ['0'];
            this.neg = false;
        }
        this.length = this.digits.length;
    }

    div(other) {
        if (this.eq(other)) {
            return new LongNum(1);
        }

        if (this.eq(0)) {
            return new LongNum(0);
        }

        if (this.eq(other)) {
            return new LongNum(1);
        }

        if (this.eq(other.withOtherSign())) {
            return new LongNum(-1);
        }

        if (other.digits[0] == '0' && other.length == 1) {
            throw Error('Num / 0');
        }

        let neg = false;

        if (other.neg != this.neg) {
            neg = true;
        }

        if (other.neg) {
            other = other.withOtherSign();
        }

        let curr = new LongNum(this.digits[0]);
        let i = 1;
        while (curr.max(other).eq(other)) {
            curr = curr.E(1);
            curr = curr.plus(new LongNum(this.digits[i]));
            i++;
        }

        let ret = new LongNum(0);
        for (let j = i; j < this.length + 1; ++j) {
            if (curr.neq(other) && curr.min(other).eq(curr)) {
                ret = ret.E(1);
                curr = curr.E(1).plus(new LongNum(this.digits[j]));
                continue;
            }

            let nextDigit = curr.stupid_div(other);
            let rem = curr.minus(other.mult(new LongNum(nextDigit)));
            curr = rem.E(1).plus(new LongNum(this.digits[j]));
            ret = ret.E(1).plus(nextDigit);
        }

        if (neg) {
            ret = ret.withOtherSign();
        }

        return ret;
    }

    stupid_div(other) {
        if (this.eq(other)) {
            return new LongNum(1);
        }

        let curr = new LongNum(other);
        let ret = new LongNum(1);

        // ret + other < this
        while (curr.plus(other).max(this).eq(this)) {
            curr = curr.plus(other);
            ret = ret.plus(new LongNum(1));
        }

        if (curr.plus(other).eq(this)) {
            ret = ret.plus(new LongNum(1));
        }

        return ret;
    }

    mult(other) {
        let length = this.length + other.length + 1

        let lhs = this.toWorkableArry(length);
        let rhs = other.toWorkableArry(length);

        let parts = [];

        for (let i = 0; i < length; ++i) {
            let part = new Array(length);
            let carry = 0;

            for (let j = 0; j < length; ++j) {
                part[j] = (Number(lhs[j]) * Number(rhs[i]) + carry) % 10;
                carry = Math.floor((Number(lhs[j]) * Number(rhs[i]) + carry) / 10);
            }

            parts.push(part.reverse().join(''));
        }

        let ret = new LongNum(0);

        for (let i = 0; i < length; ++i) {
            let part = new LongNum(parts[i]);
            part = part.E(i);
            ret = ret.plus(part);
        }

        if (this.neg != other.neg) {
            ret = ret.withOtherSign();
        }

        return ret;
    }

    // return this*10^n
    E(n) {
        let str = this.digits.slice(0);
        let prefix = this.neg ? '-' : '';

        for (let i = 0; i < n; ++i) {
            str.push('0');
        }

        return new LongNum(prefix + str.join(''));
    }

    // removes leading minuses and zeros and keeps track the sign
    trim() {
        let i = 0;
        while (this.digits[i] == '-') {
            this.neg = !this.neg;
            ++i;
        }

        while (this.digits[i] == '0') {
            ++i;
        }

        this.digits = this.digits.slice(i);
    }

    toWorkableArry(length) {
        let ret = this.toString().split('').reverse();

        if (this.neg) {
            ret.pop();
        }

        while (ret.length < length) {
            ret.push('0');
        }

        return ret;
    }

    withOtherSign() {
        let ret = '-' + this.toString();
        return new LongNum(ret);
    }

    plus_sing(other) {
        // -x + y => y-x;
        if (this.neg && !other.neg) {
            return other.minus(this.withOtherSign());
        }

        // x + (-y) => x-y
        if (!this.neg && other.neg) {
            return this.minus(other.withOtherSign());
        }

        // (-x) + (-y) => -(x+y)
        if (this.neg && other.neg) {
            return this.withOtherSign().plus(other.withOtherSign()).withOtherSign();
        }
    }

    plus(other) {
        if (this.neg || other.neg) {
            return this.plus_sing(other);
        }

        let mlength = Math.max(this.length, other.length) + 1;

        let lhs = this.toWorkableArry(mlength);
        let rhs = other.toWorkableArry(mlength);

        for (let i = 0; i < mlength; ++i) {
            let a = Number(lhs[i]);
            let b = Number(rhs[i]);
            lhs[i] = a + b;
            if (lhs[i] > 9) {
                lhs[i + 1]++;
                lhs[i] -= 10;
            }
        }

        return new LongNum(lhs.map(String).reverse().join(''));
    }

    minus_sing(other) {
        // -x - y => -(x+y)
        if (this.neg && !other.neg) {
            return this.withOtherSign().plus(other).withOtherSign();
        }

        // x - (-y) => x+y
        if (!this.neg && other.neg) {
            return this.plus(other.withOtherSign());
        }

        // -x - (-y) => -x+y
        if (this.neg && other.neg) {
            return this.plus(other.withOtherSign());
        }

        // n-N => -(N-n)
        if (this.neq(this.max(other))) {
            return other.minus(this).withOtherSign();
        }
    }

    minus(other) {
        if (this.neg || other.neg || this.neq(this.max(other))) {
            return this.minus_sing(other);
        }

        let mlength = Math.max(this.length, other.length) + 1;

        let lhs = this.toWorkableArry(mlength);
        let rhs = other.toWorkableArry(mlength);

        let answer = lhs.slice(0);

        for (let i = 0; i < mlength - 1; ++i) {
            answer[i] = Number(answer[i]) - Number(rhs[i]);
            if (answer[i] < 0) {
                answer[i + 1]--;
                answer[i] += 10;
            }
        }

        return new LongNum(answer.map(String).reverse().join(''));
    }

    max(other) {
        if (this.neg && other.neg) {
            this.withOtherSign().min(other.withOtherSign());
        }

        if (this.neg && !other.neg) {
            return other;
        }

        if (!this.neg && other.neg) {
            return this;
        }

        if (this.length > other.length) {
            return this;
        }

        if (this.length < other.length) {
            return other;
        }

        for (let i = 0; i < this.length; ++i) {
            if (this.digits[i] > other.digits[i]) {
                return this;
            }

            if (this.digits[i] < other.digits[i]) {
                return other;
            }
        }

        return this;
    }

    min(other) {
        if (this.neg && other.neg) {
            this.withOtherSign().max(other.withOtherSign());
        }

        if (this.neg && !other.neg) {
            return this;
        }

        if (!this.neg && other.neg) {
            return other;
        }

        if (this.length < other.length) {
            return this;
        }

        if (this.length > other.length) {
            return other;
        }

        for (let i = 0; i < this.length; ++i) {
            if (this.digits[i] < other.digits[i]) {
                return this;
            }

            if (this.digits[i] > other.digits[i]) {
                return other;
            }
        }

        return this;
    }

    eq(other) {
        return this.toString() == other.toString()
    }

    neq(other) {
        return !this.eq(other);
    }

    toString() {
        let prefix = this.neg ? '-' : '';
        return prefix + this.digits.join('');
    }
}