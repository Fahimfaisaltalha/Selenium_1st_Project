
import { Browser, Builder, By, until } from "selenium-webdriver";
import { faker } from "@faker-js/faker";

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

    // Click Text Box
    await textBox.click();
    await driver.sleep(2000);


//-------- Static Way to write the Test------------//


//     await driver.findElement(By.id("userName")).click();
//     await driver.sleep(2000);

//     await driver.findElement(By.xpath("//input[@placeholder='Full Name']")).sendKeys("Fahim Faisal Talha");
//     await driver.sleep(2000);

//     await driver.findElement(By.id("userEmail")).click();
//     await driver.sleep(2000);

//     await driver.findElement(By.xpath("//input[@placeholder='name@example.com']")).sendKeys("Fahim@email.com");
//     await driver.sleep(2000);

//     await driver.findElement(By.id("currentAddress")).click();
//     await driver.sleep(2000);

//     await driver.findElement(By.xpath("//textarea[@placeholder='Current Address']")).sendKeys("Dhaka Bangladesh");
//     await driver.sleep(2000);

//     await driver.findElement(By.id("permanentAddress")).click();
//     await driver.sleep(2000);

//     await driver.findElement(By.id("permanentAddress")).sendKeys("Sherpur Bogura");
//     await driver.sleep(2000);

// // Submit button
// const submitBtn = await driver.findElement(By.id("submit"));
// await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", submitBtn);
// await driver.sleep(1000);
// await submitBtn.click();

//-------------------- Dynamic Way to Write the Test -----------------------//

const RUNS = 5; // change this to 10, 20, etc.

// Clear the field, then type
async function type(id, text) {
    const el = await driver.findElement(By.id(id));
    await el.clear();
    await el.sendKeys(text);
}

for (let i = 1; i <= RUNS; i++) {
    const data = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        current: faker.location.streetAddress(),
        permanent: faker.location.city(),
    };

    await type("userName", data.name);
    await type("userEmail", data.email);
    await type("currentAddress", data.current);
    await type("permanentAddress", data.permanent);

    const submitBtn = await driver.findElement(By.id("submit"));
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", submitBtn);
    await driver.sleep(500);
    await submitBtn.click();

    // Verify: the output box should show what we typed
    const output = await driver.wait(until.elementLocated(By.css("#output #name")), 5000);
    const text = await output.getText();
    console.log(`Run ${i}:`, text.includes(data.name) ? "PASS" : "FAIL", data.name);
}

    // Close the browser
     await driver.sleep(5000);
    await driver.quit();
}

testRun();
