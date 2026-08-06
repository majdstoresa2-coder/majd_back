const MajdKernel = require("./kernel/majd-kernel");

async function main() {

    const kernel = new MajdKernel();

    await kernel.boot();

    console.log(kernel.getStatus());

}

main();
