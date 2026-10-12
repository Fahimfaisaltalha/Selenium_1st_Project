import { Browser, Builder, By, until } from "selenium-webdriver";
import { faker } from "@faker-js/faker";
import assert from "assert";

const RUNS = 5; // <-- change this to 10, 20, etc.

describe("DemoQA Text Box", function () {
    this.timeout(120000);
    let driver;

    async function scrollClick(element) {
        await driver.executeScript(
            "arguments[0].scrollIntoView({block: 'center'});",
            element
        );
        await driver.sleep(500);
        await element.click();
    }

    async function type(id, text) {
        const el = await driver.findElement(By.id(id));
        await el.clear();
        await el.sendKeys(text);
    }

    // Only creates the browser. Navigation is done in the tests below.
    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    after(async () => {
        await driver.quit();
    });

    // ---------- Navigation steps (each one shows in the report) ----------
    describe("Navigation", function () {
        it("opens the DemoQA home page", async () => {
            await driver.get("https://demoqa.com/");
            await driver.manage().window().maximize();
            assert.ok((await driver.getTitle()).length > 0);
        });

        it("clicks Elements", async () => {
            const elements = await driver.wait(
                until.elementLocated(By.linkText("Elements")),
                10000
            );
            await scrollClick(elements);
            await driver.wait(until.urlContains("/elements"), 10000);
        });

        it("opens the Text Box page", async () => {
            const textBox = await driver.wait(
                until.elementLocated(By.css('a[href="/text-box"]')),
                10000
            );
            await scrollClick(textBox);
            await driver.wait(until.urlContains("/text-box"), 10000);
            await driver.wait(until.elementLocated(By.id("userName")), 10000);
        });
    });

    // ---------- Form tests with random data ----------
    describe("Form submission", function () {
        for (let i = 1; i <= RUNS; i++) {
            it(`submits random data - run ${i}`, async () => {
                const data = {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    current: faker.location.streetAddress(),
                    permanent: faker.location.city(),
                };
                console.log(`Run ${i}:`, data);

                await type("userName", data.name);
                await type("userEmail", data.email);
                await type("currentAddress", data.current);
                await type("permanentAddress", data.permanent);

                await scrollClick(await driver.findElement(By.id("submit")));

                const getOutput = async (id) => {
                    const el = await driver.wait(
                        until.elementLocated(By.css(`#output #${id}`)),
                        5000
                    );
                    return el.getText();
                };

                assert.ok((await getOutput("name")).includes(data.name), "Name mismatch");
                assert.ok((await getOutput("email")).includes(data.email), "Email mismatch");
                assert.ok((await getOutput("currentAddress")).includes(data.current), "Current address mismatch");
                assert.ok((await getOutput("permanentAddress")).includes(data.permanent), "Permanent address mismatch");
            });
        }
    });
});