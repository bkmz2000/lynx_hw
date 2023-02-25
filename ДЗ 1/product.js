export class Product {
    constructor({ name = '', price = 0, quantity = 0, description = '' }) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

// Assumptions: all string queries are case insensetive
// None of the string queries contain any of ['<', '>', '<=', '>=']
export class ProductList {
    constructor(arr) {
        this.list = arr.map((arg) => new Product(arg));
    }

    push(obj) {
        this.list.push(Product(obj));
    }

    query(str) {
        let constraints = str.split('&');

        let ret = this.list.slice(0);

        for (let constraint of constraints) {
            let pred = this.constraintToPredicate(constraint);
            ret = ret.filter(pred);
        }

        return ret;
    }

    constraintToPredicate(constraint) {
        let str = /contains|starts|ends/;
        let int = /<|>|=/;

        if (constraint.search(str) != -1) {
            return this.strPredicate(constraint);
        }

        if (constraint.search(int) != -1) {
            return this.intPredicate(constraint);
        }

        throw Error(`Unknown constraint format ${constraint}`);
    }

    strPredicate(constraint) {
        let [field, action, arg] = constraint.split('-');

        action = {
            'starts': 'startsWith',
            'ends': 'endsWith',
            'contains': 'includes'
        }[action];

        return (it) => it[field].toLowerCase()[action](arg.toLowerCase());
    }

    intPredicate(constraint) {
        let [field, cmp] = constraint.split('-');

        let fs = {
            '>': (a, b) => a > b,
            '<': (a, b) => a < b,
            '>=': (a, b) => a >= b,
            '<=': (a, b) => a <= b,
        };

        let l = 1;

        if (cmp[1] == '=') {
            l = 2;
        }

        let action = fs[cmp.slice(0, l)];
        let arg = Number(cmp.slice(l));

        return (it) => action(it[field], arg);
    }
}