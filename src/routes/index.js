import { init as userRoutesInit } from './user.routes.js';

export const init = ({ app, userService }) => {
    const modules = [userRoutesInit];
    modules.forEach(initModule => {
        initModule({ app, userService });
    });
};
