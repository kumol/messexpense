const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage('./api_handler');
module.exports.success = (res, msg, body, optional) => {
    let responseObj = {
        statusCode: 200,
        success: true
    };
    optional ? optional.total ? responseObj.total = optional.total : null : null;
    optional ? optional.limit ? responseObj.limit = optional.limit : null : null;
    optional ? optional.page ? responseObj.page = optional.page : null : null;
    responseObj.message = msg ? msg : "";
    responseObj.msg = msg ? msg : "";
    responseObj.body = body ? body : {};
    return res.status(200).json(responseObj);
};

module.exports.created = (res, msg, body) => {
    return res.status(200).json({
        statusCode: 201,
        success: true,
        message: msg || "Successfully Created",
        msg: msg || "Successfully Created",
        body: body
    });
};

module.exports.notFound = (res, msg, body, optional) => {
    let responseObj = {
        statusCode: 204,
        success: false
    };
    optional ? optional.total ? responseObj.total = optional.total : null : null;
    optional ? optional.limit ? responseObj.limit = optional.limit : null : null;
    optional ? optional.page ? responseObj.page = optional.page : null : null;
    responseObj.message = msg ? msg : "";
    responseObj.msg = msg ? msg : "";
    responseObj.body = body ? body : {};
    return res.status(200).json(responseObj);
};

module.exports.notModified = (res, msg, body) => {
    return res.status(200).json({
        statusCode: 304,
        success: false,
        message: msg ? msg : "",
        msg: msg ? msg : "",
        body: body ? body : {}
    });
};

module.exports.throughError = (res, body) => {
    return res.status(500).json({
        statusCode: 500,
        success: false,
        message: body ? body.message : "",
        msg: body ? body.message : "",
        body: body ? body.stack : {}
    });
};

module.exports.forbidden = (res, msg, body)=>{
    return res.status(403).json({
        statusCode: 403,
        success: false,
        message: msg || "Unauthorized",
        body: body
    })
}
module.exports.badRequest = (res, msg, body) => {
    return res.status(422).json({
        statusCode: 422,
        success: false,
        message: msg || "Unprocessable Entity",
        msg: msg || "Unprocessable Entity",
        body: body
    });
};

module.exports.conflict = (res, msg, body) => {
    return res.status(409).json({
        statusCode: 409,
        success: false,
        message: msg || "Conflict",
        body: body
    });
};

module.exports.rateLimit = (req, res, next) => {
    let counter = JSON.parse(localStorage.getItem(`${req.clientIp}`));
    if (!counter) {
        localStorage.setItem(`${req.clientIp}`, JSON.stringify({ time: Date.now(), count: 1 }));
        counter = JSON.parse(localStorage.getItem(`${req.clientIp}`));
    }
    let time = Date.now() - counter.time;
    if (time > (1000 * 10)) {
        localStorage.removeItem(`${req.clientIp}`);
        localStorage.setItem(`${req.clientIp}`, JSON.stringify({ time: Date.now(), count: 1 }));
        time = 0;
    }
    if (time < (1000 * 10) && counter.count > 2) {
        return res.status(400).json({
            success: false,
            message: "Server is under heavy load"
        });
    }
    localStorage.setItem(`${req.clientIp}`, JSON.stringify({ ...counter, count: (counter.count || 1) + 1 }));
    // if (!firstSet) {
    //     localStorage.removeItem(`${req.clientIp}`);

    // }
    return res.json({
        success: true,
        time: time,
        counter: counter
    })
    //console.log(counter.count);
};