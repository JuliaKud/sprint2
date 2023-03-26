const ALL_TESTS = [
    ...WORLD_PARSER_TESTS,
    ...BUG_TESTS,
    ...BUG_ASM_TESTS,
]

const total = ALL_TESTS.length;
let successful = 0;

for (let test of ALL_TESTS) {
    let error = null;

    try {
        test.run();
    } catch (e) {
        error = e;
    }

    if (error === null) {
        successful++;
    }

    document.body.innerHTML += "<p>Name: " + test.name +
        "<br>Status: " + (error === null ? "+" : "-") +
        (error === null ? "" : "<br>Error: " + error.toString()) +
        "</p>";
}

document.body.innerHTML += "<p>Successful: " + successful.toString() +
    "<br>Failed: " + (total - successful).toString() +
    "<br>Total tests: " + total.toString() +
    " </p>";