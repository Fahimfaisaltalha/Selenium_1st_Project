
import { Browser, Builder, By, until } from "selenium-webdriver";

const driver = new Builder().forBrowser(Browser.CHROME).build();

const gender = "Male";
const month = "1";
const year = "2016";
const date = "21";
const subject ="Computer";
const state ="NCR";
const city = "Delhi";
const filepath ="C:/Users/MSI/Desktop/DSC_5903.jpg"
async function testRun() {

    await driver.get("https://demoqa.com/");
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    const forms = await driver.findElement(By.xpath("//h5[text()='Forms']"));
    await driver.executeScript(
        "arguments[0].scrollIntoView({block: 'start'});",
        forms
    );
    await driver.executeScript("arguments[0].click();", forms);


    const practiceForm = await driver.wait(
        until.elementLocated(By.xpath("//span[text()='Practice Form']/ancestor::a")),
        10000
    );
    await driver.executeScript(
        "arguments[0].scrollIntoView({block: 'start'});",
        practiceForm
    );
    await driver.executeScript("arguments[0].click();", practiceForm);
  

    await driver.wait(
        until.urlContains("/automation-practice-form"),
        10000
    );
    const firstName = await driver.wait(
        until.elementLocated(By.id("firstName")),
        10000
    );
    await firstName.sendKeys("Fahim Faisal");
 

    await driver.findElement(By.id("lastName")).sendKeys("Talha");


    await driver.findElement(By.id("userEmail")).sendKeys("FahimFaisal@gmail.com");
 

    await driver.findElement(By.xpath(`//input[@id='gender-radio-1' and @value='${gender}']`) ).click();


    await driver.findElement(By.id("userNumber")).sendKeys("01777777777");
  
    // Open date picker
    await driver.findElement(By.id("dateOfBirthInput")).click();
  
    // Select month
    await driver.findElement(By.xpath("//select[@class='react-datepicker__month-select']")).click();
    await driver.findElement( By.xpath(`//select[@class='react-datepicker__month-select']/option[@value='${month}']`)).click();


    // Select year
    await driver.findElement(By.xpath("//select[@class='react-datepicker__year-select']")).click();
    await driver.findElement(By.xpath(`//select[@class='react-datepicker__year-select']/option[@value='${year}']`)).click();
   
    // Select date
    await driver.findElement(By.className(`react-datepicker__day react-datepicker__day--0${date}`)).click();
   

    await driver.findElement(By.id("subjectsInput")).sendKeys(subject);
    await driver.sleep(1000);
    await driver.findElement(By.xpath(`//div[@role='option' and contains(text(),'${subject}')]`)).click();
   

    await driver.findElement(By.xpath("//input[@id='hobbies-checkbox-1'] /following-sibling::label[contains(text(),'Sport')]")).click();
  

    await driver.findElement(By.id("uploadPicture")).sendKeys(filepath);
  
    await driver.findElement(By.id("currentAddress")).sendKeys("Dhaka Bangladesh");
 

    await driver.findElement(By.id("react-select-3-input")).sendKeys(state);
     await driver.sleep(1000);
    await driver.findElement(By.xpath(`//div[@role='option' and contains(text(),'${state}')]`)).click();


    await driver.findElement(By.id("react-select-4-input")).sendKeys(city);
     await driver.sleep(1000);
    await driver.findElement(By.xpath(`//div[@role='option' and contains(text(),'${city}')]`)).click();


    await driver.findElement(By.id("submit")).click();

    await driver.sleep(3000);
    await driver.quit();
}

testRun();
 