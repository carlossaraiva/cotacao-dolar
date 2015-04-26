var io;

exports.socket = function (ioRef) {
    io = ioRef;
    io.on("connection", function (socket) {
        console.log("There is someone here..")
    });
};