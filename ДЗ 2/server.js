import { createServer } from 'http'

export class Server {
    constructor(port, database) {
        this.database = database
        this.routes = { "GET": {}, "POST": {}, "PUT": {}, "DELETE": {} };
        this.port = port;
    }

    get(route, func) {
        this.routes["GET"][route] = func;
    }

    post(route, func) {
        this.routes["POST"][route] = func;
    }

    put(route, func) {
        this.routes["PUT"][route] = func;
    }


    delete(route, func) {
        this.routes["DELETE"][route] = func;
    }

    router(req, resp) {
        const { method, url } = req;

        // The following two ifs are obviously never reached
        if (!(method in this.routes)) {
            resp.write(418);
            throw Error('Unfortunetly, this is not express');
        }

        if (!(url in this.routes[method])) {
            resp.write(418);
            throw Error('Unknown url');
        }

        let body = [];

        req.on('data', chunk => body.push(chunk));

        req.on('end', () =>
            this.routes[method][url].bind(this)(
                req,
                resp,
                JSON.parse(Buffer.concat(body).toString() || '{}'))
        );
    }

    listen() {
        console.log(`App running on port ${this.port}.`)
        createServer(this.router.bind(this)).listen(this.port);
    }
}
