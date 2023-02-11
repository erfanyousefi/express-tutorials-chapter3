const express = require("express");
const app = express();

// app.get("/:number", (req, res) => {
//     let number = req.params.number;
//     let obj = {
//         key: ""
//     };
//     console.log(number);
//     console.log(obj.key);
//     if (number == 2) throw {
//         status: 400,
//         message: "number is not equals 2"
//     }
//     if (number == 3) throw {
//         status: 400,
//         message: "number is not equals 3"
//     }
//     if (number == 4) throw {
//         status: 400,
//         message: "number is not equals 4"
//     }
//     res.send("index address")
// });
app.get("/:number", (req, res, next) => {
    try {
        let number = req.params.number;
        let obj = {
            key: ""
        };
        console.log(number);
        console.log(obj.key);
        if (number == 2) throw {
            status: 400,
            message: "number is not equals 2"
        }
        if (number == 3) throw {
            status: 400,
            message: "number is not equals 3"
        }
        if (number == 4) throw {
            status: 400,
            message: "number is not equals 4"
        }
        res.send("index address")
    } catch (error) {
        next(error)
    }
});

app.use((req, res, next) => {
    return res.status(404).json({
        statusCode: res.statusCode,
        error: {
            type: 'NotFound',
            message: "not found " + req.url + " route"
        },
    })
});
app.use((err, req, res, next) => {
    return res.json({
        statusCode: err.status || 500,
        error: {
            message: err.message || "internalServerError"
        }
    })
});
app.listen(3000, () => {
    console.log("server run on port 3000");
})