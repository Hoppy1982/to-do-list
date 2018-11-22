const path = require('path')
const database = require('../db/database.js')

function todo(todoTaskUserInput) {
  console.log(`validating..`)
  console.log(todoTaskUserInput)
  let validationIssues = []

  if (hasCorrectKeys(todoTaskUserInput) === false) { validationIssues.push('hasCorrectKeys: failed') }
  if (sanitizeStr(todoTaskUserInput.name, 24) === false) { validationIssues.push('isStringOfLength: failed') }
  if (sanitizeStr(todoTaskUserInput.description, 255) === false) { validationIssues.push('isStringOfLength: failed') }
  if (numberInRange(todoTaskUserInput.priority, 0, 20) === false) { validationIssues.push('numberInRange: failed') }

  let prom1 = isPrimKeyInTable(todoTaskUserInput.progress, 'progresses', 'progress_id')
  let prom2 = isPrimKeyInTable(todoTaskUserInput.category, 'categories', 'category_id')

  return Promise.all([prom1, prom2])
    .then(values => {
      values.forEach(value => {
        if (value === false) {validationIssues.push('isPrimKeyInTable: failed')}
      })

      return validationIssues
    })
}


function hasCorrectKeys(unValidatedData) {
  console.log('Validating keys..')
  let passedValidation = true

  if (unValidatedData.hasOwnProperty('name') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('description') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('priority') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('progress') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('category') === false) { passedValidation = false }
  //id property is supplied in req obj if editing a task so can't check for num props like below
  //if (Object.keys(unValidatedData).length !== 5) { passedValidation = false }

  return passedValidation
}


function sanitizeStr(str, maxLength) {
  console.log('Validating sanitizeStr..')
  let passesTest = true
  const regex = /^[A-Za-z0-9_-\s.!?,]+$/

  if (str.length < 2) { passesTest = false }
  if ( str.length > 0 && !regex.test(str) ) { passesTest = false }
  if (typeof str !== 'string') { passesTest = false }
  if (str.length > maxLength) { passesTest = false }

  return passesTest
}


function numberInRange(inputNum, min, max) {
  console.log('Validating numberInRange..')
  let passesTest = true
  let num = parseInt(inputNum, 10)

  if (isNaN(num) === true) { passesTest = false }
  if (num < min || num > max) { passesTest = false }

  return passesTest
}


function isPrimKeyInTable(numStr, tableName, primaryKey) {
  console.log('Validating isPrimKeyInTable..')
  const regex = /^[0-9]+$/
  let sanitizedNumStr = numStr.toString()

  if (typeof sanitizedNumStr !== 'string') { sanitizedNumStr = '-1' }
  if ( regex.test(sanitizedNumStr) === false ) { sanitizedNumStr = '-1' }
  if (sanitizedNumStr.length > 2) { sanitizedNumStr = '-1' }

  const queryStr = `SELECT ${primaryKey} FROM ${tableName} WHERE ${primaryKey} = ${sanitizedNumStr}`

  return new Promise((resolve, reject) => {
    database.queryDB(queryStr)
      .then(rows => {
        if (rows.length === 0) {resolve(false)}
        if (rows.length > 0) {resolve(true)}
      })
      .catch(err => {
        reject(err)
      })
  })
}


module.exports = {todo}
