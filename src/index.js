/**
 * The projects purpose is explained in the README. There is
 * detailed description of how the solution works on the 
 * SOLUTION file.
 * 
 * @author Ulisses Ferreira
 */

const fs = require('fs')
const readline = require('readline')

const fileIndex = process.argv.indexOf('--input_file') + 1
const windowIndex = process.argv.indexOf('--window_size') + 1

// Check for missing arguments.
if (fileIndex === 0 || windowIndex === 0) {
  console.log('Missing arguments in function')
  process.exit(1)
}

const eventStreamFile = process.argv[fileIndex]
const windowSize = process.argv[windowIndex]

let currentDate = 0
let dataMap = []

const outputStream = fs.createWriteStream('output.json', {flags: 'w'})

const fileReader = readline.createInterface({
  input: fs.createReadStream(eventStreamFile),
});

/**
 * Core logic. This happens everytime we read a line from
 * the input file. If we read a line whose timestamp is X
 * we catch up with all the moving averages until X (with
 * a 1 minute interval). We temporarily store lines read in
 * a cache until we no longer need them (they are older than
 * the window period)
 */
fileReader.on('line', (line) => {

  const event = JSON.parse(line)
  const date = Date.parse(event.timestamp)

  dataMap.push({
    date,
    duration: event.duration
  })

  const dateRounded = new Date(event.timestamp).setSeconds(0,0)

  // First run
  if (currentDate === 0) {

    currentDate = dateRounded + (60 * 1000)

    let outputDate = dateToString(dateRounded)

    outputStream.write(`{"date": "${outputDate}", "average_delivery_time": 0}\n`)

  } else {

    for (i = currentDate; i <= dateRounded; i = i + (60 * 1000)) {

      let numOfItems = 0
      let sum = 0
      // Queremos ver de i até -10 minutos todas as posicoes
      dataMap.forEach((item) => {
        if ((item.date < i) && (item.date > (i - (windowSize * 60 * 1000)))) {
          console.log(dateToString(i) + ' > ' + dateToString(item.date) + ' > ' + dateToString(i - windowSize * 60 * 1000))
          numOfItems = numOfItems + 1
          sum = sum + item.duration
        }
      })
      //
      console.log('Em ' + dateToString(i) + ' deu a sum: ' + sum)
      let outputAverage = sum / numOfItems
      let outputDate = dateToString(i)
      outputStream.write(`{"date": "${outputDate}", "average_delivery_time": ${outputAverage}}\n`)
    }

    let numOfItems = 0
    let sum = 0

    dataMap.forEach((item) => {
      if (item.date > (date - windowSize * 60 * 1000)) {
        numOfItems = numOfItems + 1
        sum = sum + item.duration
      }
    })

    let outputAverage = sum / numOfItems
    let outputDate = dateToString(dateRounded + (60 * 1000))
    outputStream.write(`{"date": "${outputDate}", "average_delivery_time": ${outputAverage}}\n`)

    currentDate = dateRounded + (60 * 1000)

  }
})

fileReader.on('close', () => {
  outputStream.end()
})

/**
 * Transforms a unix time number to a proper date in the
 * following format: year-month-day hour:minute:seconds
 * Automatically pads the numbers with zeroes on the left.
 * 
 * @param {Number} unixEpoch - Number of milliseconds elapsed 
 * from 00:00:00 Thursday, 1 January 1970.
 * Read here for more info https://en.wikipedia.org/wiki/Unix_time
 */
const dateToString = (unixEpoch) => {
  let stringDate = new Date(0)
  stringDate.setUTCMilliseconds(unixEpoch)
  const year = stringDate.getFullYear()
  const month = zeroPad(stringDate.getMonth() + 1)
  const day = zeroPad(stringDate.getDate())
  const hour = zeroPad(stringDate.getHours())
  const minutes = zeroPad(stringDate.getMinutes())
  const seconds = zeroPad(stringDate.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

/**
 * Returns a two digit number with zeroes
 * padded on the left if these are not present
 * Ex: 1 -> 01
 *     0 -> 00
 *    01 -> 01
 * 
 * @param {*} number 
 */
const zeroPad = (number) => {
  return ("00" + number).slice(-2)
}