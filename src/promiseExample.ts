const pFactory = (time) => {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, time)
    })
    return p
}

const myPromise = pFactory(500)
const myPromise2 = pFactory(1500)

//Promise.all takes an array of promises -- only when all of the promises
//have resolved, then it returns an array of whatever they resolved with. 
Promise.all([myPromise, myPromise2]).then((v) => {
    console.log(v)
})