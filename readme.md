# EKM to Ebay Data Refactorisation
This is a html, javascript, and css based application that takes some JSON data and output it in the browser in a table. The purpose of this is for displaying github commit data in an html table.

## Prerequisites
- Browser: To use this application, you will need to have a browser. This application has been tested and will work on all chromium based browsers (chrome, edge, opera), firefox, safari.

## Installation
You can download this script onto your computer and open the index.html file in a browser and it will work without any further setup.

## Usage
### Sorting the table data
When opening this in a browser, you will see a table full of the fetched commit data. You will be able to press the "Authors Name", or "Author Commit Date" heading and it will order them. When the "Authors Name" header is pressed, it will be ordered alphabetically in acending first. If pressed again it will order alphabetically in decending order. When the "Authors Commit Date" header is pressed, it will be ordered in acending order first. If pressed again it will order alphabetically in decending order. 

The table will be formatted in a table as shown below.

| Authors Name | Author Commit Date | Message | Commit URL |
|--------------|--------------------|---------|------------|

When viewing the commit date in the table, it will be formatted as shown below.

```
mm-dd-yyyy hh:mm:ss
```

### Updating the table data
You can refresh the page and if there is new data in the json file, the table will be updated.