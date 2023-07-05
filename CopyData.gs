/* 
The functions below do three things.
1. onOpen creates a User Interface in the 2023 SUMMER OC CR/CA DATA. The user interface has two options. One, runs the updateCompletedCredits function. Two, is a hyperlink that goes to a video showing how to update the "Completed Credits" sheet.
2. showConfirmationDialog is a simple confirmation to the user who selects to update the Completed Credits sheet.
3. updateCompletedCredits looks for rows in the "SUMMER CR-CA Data" sheet with checks in column A. If a check is there then it will look to see if that row doesn't already exist in "Completed Credits". If it doesn't exist then it will insert the row into "Completed Credits".
Point of contact: Alvaro Gomez at alvaro.gomez@nisd.net or 210-363-1577.
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('UPDATE the Completed Credits Sheet')
    .addItem('Import new students from SUMMER CR-CA Data', 'showConfirmationDialog')
    .addItem('Watch instructions video', 'openInstructionsVideo')
    .addToUi();
}

function showConfirmationDialog() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'UPDATE the Completed Credits Sheet',
    'Click yes to begin inserting new rows from the SUMMER CR-CA Data sheet into the Completed Credits sheet.',
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.YES) {
    updateCompletedCredits();
    ui.alert('Completed Credits updated successfully.');
  }
}

function openInstructionsVideo() {
  var videoUrl = 'https://watch.screencastify.com/v/MuRWm5sSjy8R3bMQZPlI';
  var htmlOutput = HtmlService.createHtmlOutput('<script>window.open("' + videoUrl + '");google.script.host.close();</script>');
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Tutorial Video');
}

function updateCompletedCredits() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var summerDataSheet = spreadsheet.getSheetByName("SUMMER CR-CA Data");
  var completedCreditsSheet = spreadsheet.getSheetByName("Completed Credits");
  var summerDataRange = summerDataSheet.getRange("A2:N" + summerDataSheet.getLastRow());
  var existingDataRange = completedCreditsSheet.getRange("A2:L" + completedCreditsSheet.getLastRow());
  var existingData = existingDataRange.getValues();
  var newData = [];

  var summerData = summerDataRange.getValues();

  for (var i = 0; i < summerData.length; i++) {
    var row = summerData[i];
    var isChecked = row[0]; // Checkbox in column A
    var studentID = row[4]; // Student ID in column E
    var courseName = row[5].toString().toLowerCase(); // Course Name in column F
    var courseDateStart = row[6]; // Course Date Start in column G
    var url = row[11]; // LOC link in column L

    if (!isChecked) {
      continue; // Skip if not checked
    }

    var isDuplicate = false;

    for (var j = 0; j < existingData.length; j++) {
      var existingRow = existingData[j];
      var existingStudentID = existingRow[2];
      var existingCourseName = existingRow[3].toString().toLowerCase();
      var existingCourseDateStart = existingRow[4];
      var existingUrl = existingRow[9];

      if (
        existingStudentID === studentID &&
        existingCourseName === courseName
      ) {
        isDuplicate = true;
        break;
      }
    }

    if (isDuplicate) {
      continue; // Skip if duplicate
    }

    var newRow = [
      row[3].toString().toUpperCase(), // Student Name
      studentID, // Student ID
      courseName.toUpperCase(), // Course Name
      courseDateStart, // Course Date Start
      row[7], // Course Date Credit Earned
      row[8], // Course Grade Average
      row[9], // Teacher of Record
      row[10], // Hours on course if CA-MT completion
      url, // LOC link
      "", // MT
      "" // NOTES
    ];

    newData.push(newRow);
  }

  newData.sort(function(a, b) {
    var studentA = String(a[1]).toLowerCase();
    var studentB = String(b[1]).toLowerCase();
    return studentA.localeCompare(studentB);
  });

  var insertIndex = 2;

  for (var m = 0; m < newData.length; m++) {
    var studentID = String(newData[m][1]).toLowerCase();
    var nextStudentID = (m + 1 < newData.length) ? String(newData[m + 1][1]).toLowerCase() : "";

    if (studentID.localeCompare(nextStudentID) < 0) {
      insertIndex++;
    }

    completedCreditsSheet.insertRowBefore(insertIndex);
    completedCreditsSheet.getRange(insertIndex, 2, 1, newData[m].length).setValues([newData[m]]).setBackground(null).setBorder(true, true, true, true, true, true);
    insertIndex++;
  }

  completedCreditsSheet.getRange("A2:L" + completedCreditsSheet.getLastRow()).sort({ column: 2, ascending: true });

  // Renumber rows in column A starting from 1
  var lastRow = completedCreditsSheet.getLastRow();
  var rowNumbers = completedCreditsSheet.getRange("A2:A" + lastRow).getValues();
  var updatedRowNumbers = rowNumbers.map(function (value, index) {
    return [index + 1];
  });
  completedCreditsSheet.getRange("A2:A" + lastRow).setValues(updatedRowNumbers);
}
