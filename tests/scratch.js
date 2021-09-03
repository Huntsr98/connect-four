class Whatever {
    constructor (initialValue) {
        this.myValue = initialValue
    }
    myValue = 5;
    updateValue (newValue) {
        this.myValue = newValue
    }
    incrementValue(additionalValue) {
        this.myValue = additionalValue + this.myValue
    }
}