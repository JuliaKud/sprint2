/*
 * Base class for all tests in the application
 */
class Test {
    #name;
    #fn; // function to run as a test

    /*
     * Every test has a name to display.
     */
    constructor(name, fn) {
        this.#name = name;
        this.#fn = fn;
    }

    get name() {
        return this.#name;
    }

    /*
     * Test is considered successful if this method have not thrown any errors
     */
    run() {
        this.#fn();
    }


}