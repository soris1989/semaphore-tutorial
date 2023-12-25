$(document).ready(function () {
    var $results = $("#results");

    $results.append($("<span>").css({ display: "block" }).text("--START PROCESS--"));

    /* HOW TO USE */
    var throttler = new Semaphore(2);
    var p1 = throttler.callFunction(longTimeTask);
    var p2 = throttler.callFunction(longTimeTask);
    var p3 = throttler.callFunction(longTimeTask);
    var p4 = throttler.callFunction(longTimeTask);

    Promise.all([p1, p2, p3, p4]).then(function (res1, res2, res3, res4) {
        $results.append($("<span>").css({ display: "block" }).text("--END PROCESS--"));
    });

    function longTimeTask() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                var $span = $("<span>")
                    .css({ display: "block" })
                    .text("process-" + makeid(4));
                $results.append($span);
                resolve();
            }, 5000);
        });
    }
});

function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
