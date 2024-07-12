# JavaScript Email Subscription

![Email Subscription](https://img.shields.io/badge/Email%20Subscription-JavaScript-blue)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

This repository contains a simple email subscription form that submits data to a Google Sheet. The form uses JavaScript to handle form submission and integrates with Google Sheets via Google Apps Script.

## Features

- **Form Submission:** Submits form data to Google Sheets.
- **Feedback Message:** Displays a thank-you message upon successful submission.
- **Google Sheets Integration:** Stores email addresses in a Google Sheet using Google Apps Script.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Qyuzet/js-email-subscription.git
    ```
2. Navigate to the project directory:
    ```bash
    cd js-email-subscription
    ```

## Usage

1. Open the `index.html` file in your web browser to view and interact with the email subscription form.

### Important Snippets

#### JavaScript Code for Form Submission

The JavaScript code handles the form submission and interacts with the Google Apps Script to store the email addresses in Google Sheets:

```javascript
const scriptURL = "https://script.google.com/macros/s/AKfycbyWsv3urlsd9-fF6raH_SPf4zwFsJJmJX0JVTUfreFROMzjSfRRUVh8wgQ9gfZ5ZHqmqg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Thank You For Subscribing";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
```

- `scriptURL`: The URL of the Google Apps Script that handles the form submission.
- `form`: The form element that submits data to the Google Sheet.
- `msg`: The element that displays a thank-you message upon successful submission.
- `form.addEventListener("submit", (e) => { ... })`: Adds an event listener to handle form submission.
- `fetch(scriptURL, { method: "POST", body: new FormData(form) })`: Submits the form data to the Google Apps Script.
- `.then((response) => { ... })`: Displays a thank-you message and resets the form upon successful submission.
- `.catch((error) => { ... })`: Logs any errors that occur during submission.

#### Google Apps Script for Handling Form Submissions

This Google Apps Script is used to handle the form submissions and store the data in a Google Sheet:

```javascript
var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
```

- `initialSetup()`: Sets up the script properties with the ID of the active spreadsheet.
- `doPost(e)`: Handles POST requests, locks the script to prevent concurrent executions, and stores the form data in the specified Google Sheet.

## Demo

You can view a live demo of the email subscription form [here](https://qyuzet.github.io/js-email-subscription/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue if you have any improvements or suggestions.

## License

This project is licensed under the MIT License.

## Acknowledgements

- The form-to-google-sheets functionality is inspired by [Jamie Wilson's project](https://github.com/jamiewilson/form-to-google-sheets).
