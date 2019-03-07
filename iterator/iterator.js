const createIterator = function* () {
    let x = 0;
    while (true) {
        yield x;
        x += 1;
    }
};
const iterator = createIterator();


function take(i,iter) {
    let x = iter;
    return x

};

for (let i of take(3,iterator)) {
    console.log(`data --- ${i}`)
}


