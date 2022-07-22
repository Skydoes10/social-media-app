const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;

		this.paths = {
			auth: '/api/auth',
			post: '/api/posts',
		};

        // Connect to database
        this.connectDB();

		// Middlewares
		this.middlewares();

		// Routes
		this.routes();
	}

    async connectDB() {
        await dbConnection();
    };

	middlewares() {
		// CORS
		this.app.use(cors());

		// Body parser
		this.app.use(express.json());

		// Static files
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.paths.auth, require('../routes/auth'));
		this.app.use(this.paths.post, require('../routes/post'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

module.exports = Server;
