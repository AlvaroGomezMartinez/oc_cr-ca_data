/* 
The function below is meant to add data from columns G, H, I, and J of the SUMMER CR-CA Data sheet into columns P, Q, R, and S of the MASTER STUDENT LIST sheet.
This script has a trigger set to run every 5 minutes.
Point of contact: Alvaro Gomez at alvaro.gomez@nisd.net or 210-363-1577.
*/

function updateMasterStudentList() {
  try {
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let masterSheet = ss.getSheetByName('MASTER STUDENT LIST');
    let summerSheet = ss.getSheetByName('SUMMER CR-CA Data');

    let masterData = masterSheet.getDataRange().getValues();
    let summerData = summerSheet.getDataRange().getValues();

    for (let i = 1; i < masterData.length; i++) {
      let masterRow = masterData[i];
      let masterG = masterRow[6];
      let masterH = masterRow[7];
      let masterP = masterRow[15];

      if (masterG && masterH) {
        for (let j = 1; j < summerData.length; j++) {
          let summerRow = summerData[j];
          let summerE = summerRow[4];
          let summerF = summerRow[5];

          if (masterG === summerE && masterH === summerF) {
            let summerG = summerRow[6];
            let summerH = summerRow[7];
            let summerI = summerRow[8];
            let summerJ = summerRow[9];

            if (masterP === "") {
              masterSheet.getRange(i + 1, 16).setValue(summerG);
              masterSheet.getRange(i + 1, 17).setValue(summerH);
              masterSheet.getRange(i + 1, 18).setValue(summerI);
              masterSheet.getRange(i + 1, 19).setValue(summerJ);
            } else if (masterP !== "" && summerH && summerI && summerJ) {
              masterSheet.getRange(i + 1, 16).setValue(summerG);
              masterSheet.getRange(i + 1, 17).setValue(summerH);
              masterSheet.getRange(i + 1, 18).setValue(summerI);
              masterSheet.getRange(i + 1, 19).setValue(summerJ);
            }

            break;
          }
        }
      }
    }
  } catch (error) {
    let errorMessage = "Error: " + error.message;
    let errorStackTrace = "Stack trace:\n" + error.stack;
    let subject = "Error in updateMasterStudentList()";
    let message = errorMessage + "\n\n" + errorStackTrace;
    let recipient = "alvaro.gomez@nisd.net";
    MailApp.sendEmail(recipient, subject, message);
  }
}
