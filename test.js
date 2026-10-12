
import { Browser, Builder, By, until } from "selenium-webdriver";

const driver = new Builder().forBrowser(Browser.CHROME).build();

async function testRun() {
    await driver.get("https://demoqa.com/");
    await driver.sleep(3000);

    await driver.manage().window().maximize();
    await driver.sleep(2000);

    // Click Elements on the home page
    await driver.findElement(By.linkText("Elements")).click();
    await driver.sleep(3000);

    // Wait for the Text Box link
    const textBox = await driver.wait(
        until.elementLocated(By.css('a[href="/text-box"]')),
        10000
    );
    await driver.sleep(2000);

    // Scroll to the link
    await driver.executeScript(
        "arguments[0].scrollIntoView({block: 'center'});",
        textBox
    );
    await driver.sleep(3000);

    // Click Text Box
    await textBox.click();
    await driver.sleep(3000);

    await driver.findElement(By.id("userName")).click();
    await driver.sleep(3000);

    await driver.findElement(By.xpath("//input[@placeholder='Full Name']")).sendKeys("Fahim Faisal Talha");
    await driver.sleep(3000);

    await driver.findElement(By.id("userEmail")).click();
    await driver.sleep(3000);

    await driver.findElement(By.xpath("//input[@placeholder='name@example.com']")).sendKeys("Fahim@email.com");
    await driver.sleep(3000);

    await driver.findElement(By.id("currentAddress")).click();
    await driver.sleep(3000);

    await driver.findElement(By.xpath("//textarea[@placeholder='Current Address']")).sendKeys("Dhaka Bangladesh");
    await driver.sleep(3000);

    await driver.findElement(By.id("permanentAddress")).click();
    await driver.sleep(3000);

    await driver.findElement(By.id("permanentAddress")).sendKeys("Sherpur Bogura");
    await driver.sleep(3000);



    // Close the browser
     await driver.sleep(5000);
    await driver.quit();
}

testRun();
