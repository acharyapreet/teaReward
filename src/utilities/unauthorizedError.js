const AppError = require("./appError");

class UnauthorizedError extends AppError {
    constructor() {
        super(`User is not athorized properly`, 401)

    }

}

module.exports = UnauthorizedError