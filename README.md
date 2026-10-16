# Selenium WebDriver Automation with JavaScript

This project contains browser automation examples written in modern JavaScript with Selenium WebDriver. The main workflow automates the **Practice Form** on the [DemoQA](https://demoqa.com/) website. It also includes two Text Box examples that demonstrate basic form automation, generated test data, assertions, and Mocha reporting.

The project is intended for learning and practicing:

- Selenium WebDriver with Node.js
- Element location using IDs, links, XPath, CSS selectors, and classes
- Scrolling elements into view before interacting with them
- Waiting for pages and elements to become available
- Working with radio buttons, date pickers, autocomplete fields, checkboxes, file uploads, and dropdowns
- Reusing generated test data
- Structuring browser tests with Mocha
- Generating HTML test reports with Mochawesome

## Project Files

| File | Purpose |
| --- | --- |
| `practice_form.js` | Primary end-to-end automation for the DemoQA Practice Form |
| `text_box.js` | Basic Text Box automation with Faker-generated data and repeated submissions |
| `text_box_with_report.js` | Mocha-based Text Box tests with assertions and Mochawesome-compatible reporting |
| `package.json` | Project metadata and npm dependencies |
| `mochawesome-report/` | Generated report output, when a Mochawesome test run has been executed |

## Prerequisites

Install the following before running the project:

1. **Node.js** with npm
2. **Google Chrome**
3. A network connection to access `https://demoqa.com/`

The installed Chrome version should be compatible with the Selenium-managed ChromeDriver used by Selenium WebDriver.

Verify the installations:

```powershell
node --version
npm --version
```

## Installation

Clone or download the project, open a terminal in the project directory, and install the dependencies:

```powershell
npm install
```

The project uses:

- `selenium-webdriver` for browser automation
- `@faker-js/faker` for generating dynamic test data
- `mocha` for organizing and running tests
- `mochawesome` for HTML and JSON test reports

## Main Workflow: `practice_form.js`

`practice_form.js` automates the complete DemoQA Practice Form workflow:

1. Opens the DemoQA home page.
2. Maximizes the Chrome window.
3. Locates the **Forms** card.
4. Scrolls the Forms card into view.
5. Uses a JavaScript click for the Forms card because the DemoQA footer can intercept a normal Selenium click on a small screen.
6. Locates and opens the **Practice Form** link.
7. Waits until the browser URL contains `/automation-practice-form`.
8. Waits until the `firstName` field is available.
9. Enters first name, last name, email address, and phone number.
10. Selects the configured gender.
11. Opens the date picker and selects the configured month, year, and date.
12. Enters a subject and selects the matching autocomplete option.
13. Selects the Sport hobby.
14. Uploads an image.
15. Enters the current address.
16. Selects the configured state and city from the React Select dropdowns.
17. Submits the form.
18. Waits briefly and closes the browser.

### Running the Practice Form

From the project directory, run:

```powershell
node .\practice_form.js
```

The browser is intentionally visible while the test runs so that each automation step can be observed.

### Practice Form Automation Demonstration

The following video demonstrates the complete browser interaction after running the Practice Form script:

[Watch the Practice Form automation video](https://drive.google.com/file/d/1lfnRLjxQVqtugBItEJfsxcblunLgw70T/view?usp=sharing)

The demonstration shows the script:

1. Opening the DemoQA website in Chrome.
2. Navigating to **Forms** and then **Practice Form**.
3. Scrolling navigation targets into a usable position on the page.
4. Waiting for the Practice Form page and its fields to load.
5. Filling the personal information fields.
6. Selecting gender, date of birth, subject, hobby, state, and city.
7. Uploading the configured image.
8. Entering the current address and submitting the form.
9. Closing the browser after the workflow completes.

### Updating Test Data

The main test data is declared near the top of `practice_form.js`:

```js
const gender = "Male";
const month = "1";
const year = "2016";
const date = "21";
const subject = "Computer";
const state = "NCR";
const city = "Delhi";
```

Change these values to test another valid combination supported by the DemoQA form.

The month value is the date-picker option value, not necessarily the displayed month name. For example, `1` represents February in the HTML select used by the DemoQA page.

### Configuring the File Upload

The file upload uses the local path assigned to `filepath`:

```js
const filepath = "C:/Users/MSI/Desktop/DSC_5903.jpg";
```

Before running the test on another computer, replace this value with the absolute path to an existing image file. The path must point to a real local file accessible by the user running Node.js.

For example:

```js
const filepath = "C:/Users/YourName/Pictures/profile-photo.jpg";
```

If the file does not exist, Selenium will fail when it attempts to send the path to the upload input.

## Selenium Techniques Used in the Practice Form

### Explicit waits

The script imports `until` from Selenium WebDriver and waits for navigation and page elements:

```js
await driver.wait(
    until.urlContains("/automation-practice-form"),
    10000
);

const firstName = await driver.wait(
    until.elementLocated(By.id("firstName")),
    10000
);
```

This is more reliable than immediately searching for an element while the destination page is still loading.

### Scrolling before clicking

The DemoQA home page contains a fixed footer. On a small screen, the footer may cover the Forms card and cause `ElementClickInterceptedError`. The script scrolls the element into view and uses a JavaScript click:

```js
await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'start'});",
    forms
);
await driver.executeScript("arguments[0].click();", forms);
```

The same approach is used for the Practice Form navigation link.

### Dynamic element selection

Several selectors are built from the configured test values:

```js
await driver.findElement(
    By.xpath(`//div[@role='option' and contains(text(),'${subject}')]`)
).click();
```

This allows the test to select the requested subject, state, and city without hard-coding a single option.

## Supporting Example: `text_box.js`

`text_box.js` demonstrates a non-Mocha Selenium flow for the DemoQA Text Box page. It:

1. Opens DemoQA.
2. Navigates to **Elements > Text Box**.
3. Scrolls to the Text Box link before clicking it.
4. Generates five sets of data with Faker.
5. Clears and fills the name, email, current address, and permanent address fields.
6. Submits each set of data.
7. Reads the generated output and prints `PASS` or `FAIL` based on the submitted name.

The number of iterations can be changed here:

```js
const RUNS = 5;
```

Run it with:

```powershell
node .\text_box.js
```

This file is a straightforward script rather than a Mocha test suite.

## Supporting Example: `text_box_with_report.js`

`text_box_with_report.js` contains the structured version of the Text Box automation. It uses Mocha and assertions so that each navigation step and form submission appears as a test result.

It includes:

- A Mocha `describe` test suite
- `before` and `after` hooks for browser setup and cleanup
- A reusable `scrollClick` helper
- A reusable `type` helper
- Explicit waits for URLs and elements
- Faker-generated data
- Five independent form-submission test cases
- Assertions for name, email, current address, and permanent address

Run the test with the default Mocha reporter:

```powershell
npx mocha .\text_box_with_report.js
```

To generate a Mochawesome report:

```powershell
npx mocha .\text_box_with_report.js --reporter mochawesome
```

The generated files are normally written to `mochawesome-report\`. Open the HTML report in a browser:

```powershell
Start-Process .\mochawesome-report\mochawesome.html
```

The report records the navigation tests and each generated-data submission separately. A failed assertion identifies which submitted value did not appear correctly in the output section.

To change the number of generated submissions, update:

```js
const RUNS = 5;
```

## Recommended Run Order

To explore the project progressively:

```powershell
npm install
node .\practice_form.js
node .\text_box.js
npx mocha .\text_box_with_report.js --reporter mochawesome
```

Allow each browser session to finish before starting the next command.

## Troubleshooting

### `ElementClickInterceptedError`

This usually means another element, commonly the fixed DemoQA footer, is covering the target. The Practice Form navigation already handles this by scrolling the target and using JavaScript click. For new interactions, scroll the element into a safe viewport position before clicking.

### `NoSuchElementError`

The page may still be loading, or the selector may no longer match the DemoQA markup. Prefer an explicit wait:

```js
const element = await driver.wait(
    until.elementLocated(By.id("element-id")),
    10000
);
```

### File upload failure

Confirm that `filepath` is an absolute path and that the file exists. Update the path for the current machine.

### Browser does not close

Make sure the script reaches `driver.quit()`. If a script is interrupted manually, close any remaining ChromeDriver or Chrome process before trying again.

### DemoQA changes

DemoQA is a public website and its markup, timing, or availability may change. If a selector stops working, inspect the current page and update the corresponding locator while preserving the explicit waits and scrolling behavior.

## Notes and Limitations

- These examples run against a live public website and therefore depend on network availability and the current DemoQA page structure.
- The Practice Form currently submits configured static data and does not assert the submitted values in a result modal.
- The Text Box report workflow includes assertions and is the recommended example for learning test-result validation.
- The scripts open a real Chrome browser and are not configured for headless execution.
- The local image path must be customized before running the Practice Form on another machine.
