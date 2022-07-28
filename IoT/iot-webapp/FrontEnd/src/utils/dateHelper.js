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

// used this: https://bobbyhadz.com/blog/javascript-format-date-mm-dd-yyyy-hh-mm-ss
export function db_time_parser(db_time, setting="date"){
    let date = new Date(db_time)
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return (
          [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            date.getFullYear(),
          ].join('/') +
          ' ' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':')
        );
      }

    return formatDate(date)

}

export function calculateDaysBetweenDates(earlierDate, laterDate){
  let date1 = new Date(earlierDate)
  let date2 = new Date(laterDate)
  let difference = Math.abs(date1.getTime() - date2.getTime())
  let dayDifference = Math.ceil(difference / (1000 * 3600 * 24));
  return dayDifference

}

// test

// let unix_timestamp = Date.now()
// console.log(unix_timestamp)
// let date = dateHelper(1650126521)
// console.log(date)