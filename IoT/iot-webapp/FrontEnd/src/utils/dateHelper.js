export function dateHelper(unix_time, setting="full"){
    // const unixTimestamp = 1655893145

    const milliseconds = unix_time * 1000 // 1575909015000

    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString() 
    const humanDateArr = humanDateFormat.split(',') // ['22/06/2022', ' 18:19:05']
    if (setting == "date"){
        return humanDateArr[0]
    }
    else if (setting == "time"){
        return humanDateArr[1]
    }
    else {
        return humanDateFormat
    }



}


// test

// let unix_timestamp = Date.now()
// console.log(unix_timestamp)
// let date = dateHelper(1650126521)
// console.log(date)