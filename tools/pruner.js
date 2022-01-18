const { ResetCode } = require("../models/reset");

 function pruner(email) {
    setTimeout(async () => {
        await ResetCode.deleteOne({email});
        console.log("Pruned");
    }, 180000);
}

module.exports = pruner;
