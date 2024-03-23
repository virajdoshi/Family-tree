import { connect } from './src/database/connection/create.js';
import { init as routes } from './src/routes/index.js';
import { UserService } from './src/services/user.service.js';

export class Init {
    async initialize(app, config) {
        //connect mongodb
        await connect(config.MONGO.URL, {}, "familytree");

        //initialize service
        const userService = new UserService();

        //initialize the routes
        routes({ app, userService });
    }
}
