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
    let timeIn = obj.timeInEvents.find(function(obj){return obj.date = date})
    let timeOut = obj.timeOutEvents.find(function(obj){return obj.date = date})
    timeIn = timeIn.hour
    timeOut = timeOut.hour
    let hourIn = parseInt((""+timeIn).slice(0, -2))
    let hourOut = parseInt((""+timeOut).slice(0, -2))
    // console.log(hourOut)
    return hourOut - hourIn
}

function wagesEarnedOnDate(obj, date){
    let wagesEarned = hoursWorkedOnDate(obj, date) * obj.payPerHour
    return wagesEarned
}

function allWagesFor(obj){
    let allTimeInEventDates = obj.timeInEvents.map(timeInObj => timeInObj.date)
    console.log("Time in dates", allTimeInEventDates)
    let allWagesArray = allTimeInEventDates.map(date => wagesEarnedOnDate(obj, date))
    console.log(allWagesArray)
    
}
