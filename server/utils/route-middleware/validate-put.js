const express = require('express')
const path = require('path')
const pool = require('../../db/database.js')


function inputVal(req, res, next) {
  const unValidatedData = {
    new_isChecked: req.body.new_isChecked,
    edit_isChecked: req.body.edit_isChecked,
    selected_id_val: req.body.selected_id_val,
    name_val: req.body.name_val,
    desc_val: req.body.desc_val,
    priority_val: req.body.priority_val,
    progress_val: req.body.progress_val,
    category_val: req.body.category_val
  }
  let validationIssues = []

  if (hasCorrectKeys(unValidatedData) === false) { validationIssues.push('hasCorrectKeys: failed') }
  if (singleSelection([unValidatedData.new_isChecked, unValidatedData.edit_isChecked]) === false) { validationIssues.push('singleSelection: failed') }
  if (sanitizeStr(unValidatedData.name_val, 24) === false) { validationIssues.push('isStringOfLength: failed') }
  if (sanitizeStr(unValidatedData.desc_val, 255) === false) { validationIssues.push('isStringOfLength: failed') }
  if (numberInRange(unValidatedData.priority_val, 0, 25) === false) { validationIssues.push('numberInRange: failed') }
  if (isPrimKeyInTable(unValidatedData.progress_val, 'progresses') === false) { validationIssues.push('isPrimKeyInTable: failed') }

  if (validationIssues.length === 0) { req.body.passedValidation = true }//needs await somewhere here
  else { req.passedValidation = false; req.body.validationIssues = validationIssues }
  next()
}


function hasCorrectKeys(unValidatedData) {
  const passedValidation = true
  if (unValidatedData.hasOwnProperty('new_isChecked') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('edit_isChecked') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('selected_id_val') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('name_val') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('desc_val') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('priority_val') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('progress_val') === false) { passedValidation = false }
  if (unValidatedData.hasOwnProperty('category_val') === false) { passedValidation = false }
  if (Object.keys(unValidatedData).length !== 8) { passedValidation = false }
  return passedValidation
}


function singleSelection(possibleSelections) {
  let instancesOfTrue = possibleSelections.reduce((acc, val) => {
    if (val === true) {return acc + 1}
    else {return acc}
  }, 0)

  if (instancesOfTrue === 1) {return true}
  else {return false}
}


function sanitizeStr(str, maxLength) {
  let passesTest = true
  const regex = /^[A-Za-z0-9_-\s]+$/

  if ( str.length > 0 && !regex.test(str) ) { passesTest = false }
  if (typeof str !== 'string') { passesTest = false }
  if (str.length > 30) { passesTest = false }

  return passesTest
}


function numberInRange(inputNum, min, max) {
  let passesTest = true
  let num = parseInt(inputNum, 10)

  if (isNaN(num) === true) { passesTest = false }
  if (num < min || num > max) { passesTest = false }

  return passesTest
}


function isPrimKeyInTable(numStr, tableName) {//somethings fucked with this, always returning true????
  const regex = /^[0-9]+$/
  let sanitizedNumStr = numStr

  if (typeof sanitizedNumStr !== 'string') { sanitizedNumStr = '-1' }
  if ( !regex.test(sanitizedNumStr) ) { sanitizedNumStr = '-1' }
  if (sanitizedNumStr.length > 2) { sanitizedNumStr = '-1' }

  const queryStr = `SELECT progress_id FROM progresses WHERE progress_id = ${sanitizedNumStr}`
  console.log(queryStr)

  async function getRows() {
    let rows = await pool.promisifiedQuery(queryStr)
    await console.log(rows)
    await console.log(`rows.length: ${rows.length}`)
    if (await rows.length === 0) {return false}
  }

  return getRows()
}


module.exports = {
  inputVal: inputVal
}
