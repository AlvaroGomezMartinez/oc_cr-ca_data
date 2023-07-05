# Google Sheets File Documentation

## Introduction
This file provides the structure of the Google Sheets spreadsheet for the oc_cr-ca_data project. It contains the structure of the two sheets that would be included in a Google Spreadsheet that the Google Apps Scripts reference.

## Data Description
The data is a mix of checkboxes, text, dates, and URLs.
### Acronyms
Credit Retrieval (CA)
Credit Acceleration (CA)
Database (DB)
SpEd (Special Education)

### SUMMER CR-CA Data Sheet

The "SUMMER CR-CA Data" sheet contains information about courses that students take.

| Heading                    | Data Type | Additional Details                                                 |
|----------------------------|-----------|--------------------------------------------------------------------|
| DB                         | Checkbox  | True = record is ready to be imported to "Completed Credits" sheet |
| GRADE SpEd                 | Text      | Indicates whether a student receives special education support     |
| COHORT YEAR                | Date      | YYYY Year the student entered 9th grade                            |
| Student Name (Last, First) | Text      | Name of the student                                                |
| Student ID                 | Number    | Unique six-digit student identification                            |
| Course Name                | Text      | Name of the course the student is taking                           |
| Course Date Start          | Date      | MM-DD-YYYY Date the student started the course                     |
| Course Date Credit Earned  | Date      | MM-DD-YYYY Date the student earned the course credit               |
| Course Grade Average       | Number    | Ending grade average for the course                                |
| TEACHER OF RECORD          | Text      | Teacher who supervised the student                                 |
| hours on course if CA      | Number    | Length of time it took for student to complete credit acceleration |
| LOC link                   | URL       | Hyperlink to a Google Doc with certificate of completion           |
| Contact Log 6/29           | Text      | Notes from teacher contact                                         |
| Contact 7/3                | Text      | Notes from teacher contact                                         |

### Completed Credits Sheet

The "Completed Credits" sheet imports data that has a check in the DB column on the "SUMMER CR-CA Data" sheet. This sheet is used as a tracking sheet for the campus to input course completion in the school district's student information system database.

| Heading                              | Data Type | Additional Details                                        |
|--------------------------------------|-----------|-----------------------------------------------------------|
| #                                    | Text      | Number used to count the total number of records          |
| Student Name (Last, First)           | Text      | Name of the student                                       |
| Student ID                           | Number    | Unique six-digit student identification                   |
| Course Name                          | Text      | Name of the course the student is taking                  |
| Course Date Start                    | Date      | MM-DD-YYYY Date the student started the course            |
| Course Date Credit Earned            | Date      | MM-DD-YYYY Date the student earned the course credit      |
| Course Grade Average                 | Number    | Ending grade average for the course                       |
| TEACHER OF RECORD                    | Text      | Teacher who supervised the student                        |
| hours on course if CA- MT completion | Number    | Length of time it took for student to complete the course |
| LOC link                             | URL       | Hyperlink to a Google Doc with certificate of completion  |
| MT                                   | Text      | Miscellaneous notes                                       |
| NOTES                                | Text      | Miscellaneous notes                                       |

## Usage Guidelines

- The Google Apps Scripts reference the sheets by its name ("SUMMER CR-CA Data", "Completed Credits")
- The scripts create arrays from the dataset in the sheets

Refer to the SUMMER_CR-CA_Data.csv and the Completed_Credits files for sample datasets.