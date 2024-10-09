/* Your Code Here */
function createEmployeeRecord([firstname, familyname, title, rate]) {
    return {
        firstName: firstname,
        familyName: familyname,
        title: title,
        payPerHour: rate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    let newArray = []
    array.forEach((item) => {
        newArray.push(createEmployeeRecord(item))
    })
    return newArray
}

function createTimeInEvent(date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.slice(11, 15)),
        date: date.slice(0, 10)
    })
    return this
}

function createTimeOutEvent(date) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.slice(11, 15)),
        date: date.slice(0, 10)
    })
    return this
}

function hoursWorkedOnDate(date) {
    // Find the timeIn and timeOut for the provided date
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);

    // Calculate the hours worked by subtracting the in time from the out time
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100;  // Dividing by 100 because hours are stored as 4-digit numbers like 0900 or 2100

    return hoursWorked
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName ? employee : undefined)
}

function calculatePayroll(employees) {
    return employees.reduce((accum, employee) => {
        let pay = allWagesFor.call(employee)
        return accum + pay
    }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

