import { Browser,Builder,By,Key } from "selenium-webdriver";

const driver = new Builder().forBrowser(Browser.CHROME).build();
const gender ="Male";
async function testRun(){

    await driver.get("https://demoqa.com/");
    await driver.manage().window().maximize();
    await driver.sleep(1000);
    await driver.findElement(By.xpath("//h5[text()='Forms']")).click();
    await driver.sleep(1000);
    await driver.findElement(By.xpath("//span[text()='Practice Form']")).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("firstName")).sendKeys("Fahim Faisal");
    await driver.sleep(1000);
    await driver.findElement(By.id("lastName")).sendKeys("Talha");
    await driver.sleep(1000);
    await driver.findElement(By.id("userEmail")).sendKeys("FahimFaisal@gmail.com");
    await driver.sleep(1000);
    await driver.findElement(By.xpath(`//input[@id='gender-radio-1' and @value ='${gender}']`)).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("userNumber")).sendKeys("01777777777");
    await driver.sleep(1000);

    await driver.quit();

}
testRun();
