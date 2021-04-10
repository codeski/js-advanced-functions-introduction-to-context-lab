// Your code here
function createEmployeeRecord([first, famName, titl, payRate]){
    return { firstName: first, familyName: famName, title: titl, payPerHour: payRate, timeInEvents: [] , timeOutEvents: [] }
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(obj, dateTime){
    let timeStamp = dateTime.split(" ")
    obj.timeInEvents.push({ type: "TimeIn", hour: parseInt(timeStamp[1]), date: timeStamp[0] })
    return obj
}

function createTimeOutEvent(obj, dateTime){
    let timeStamp = dateTime.split(" ")
    obj.timeOutEvents.push({ type: "TimeOut", hour: parseInt(timeStamp[1]), date: timeStamp[0] })
    return obj
}

function hoursWorkedOnDate(obj, date){
    let timeIn = obj.timeInEvents.find(function(obj){return obj.date === date})
    let timeOut = obj.timeOutEvents.find(function(obj){return obj.date === date})
    timeIn = timeIn.hour
    timeOut = timeOut.hour
    let hourIn = parseInt((""+timeIn).slice(0, -2))
    let hourOut = parseInt((""+timeOut).slice(0, -2))
    return hourOut - hourIn
    
}

function wagesEarnedOnDate(obj, date){
    let wagesEarned = hoursWorkedOnDate(obj, date) * obj.payPerHour
    return wagesEarned
}

function allWagesFor(obj){
    let allTimeInDates = obj.timeInEvents.map(timeInObj => timeInObj.date)
    let wagesArray = allTimeInDates.map(date => wagesEarnedOnDate(obj, date))
    let totalWages = wagesArray.reduce((total, currentValue) => total + currentValue)
    return totalWages
    // let pay = obj.payPerHour
    // let allTimeInHours = obj.timeInEvents.map(timeInObj => timeInObj.hour)
    // let allTimeOutHours = obj.timeOutEvents.map(timeOutObj => timeOutObj.hour)
    // let totalHoursArray = []
    // for (let i = 0; allTimeInHours.length > i; i++) {
    //     totalHoursArray.push(allTimeOutHours[i] - allTimeInHours[i])
    // }
    // let x = totalHoursArray.map(i => i.toString())
    // x = x.map(i => i.replace(/(0){2}$/i, ''))
    // x = x.map(i => parseInt(i))
    // let totalHours = x.reduce((total, currentValue) => total + currentValue)
    // return totalHours * pay
}

function findEmployeeByFirstName(srcArray, firstName){
    let obj = srcArray.find(obj => obj.firstName === firstName)
    return obj
}

function calculatePayroll(arrayOfEmployees){
    console.log(arrayOfEmployees)
    let totalWagesArray = arrayOfEmployees.map(obj => allWagesFor(obj))
    let grandTotal = totalWagesArray.reduce((total, currentValue) => total + currentValue)
    return grandTotal
}
