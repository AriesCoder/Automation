const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()
let movieElement;
let movieText;
let deleteBtn;
let message;

beforeAll(async ()=>{
    await driver.get('http://127.0.0.1:5501/movieList/index.html');

    const movieField = await driver.findElement(By.xpath('//input'))
    await movieField.sendKeys('Tenet/n')
    movieElement = await driver.findElement(By.xpath("//ul/li"))
    movieText = await driver.findElement(By.xpath("//ul/li/span"))
    deleteBtn = await driver.findElement(By.xpath("//ul/li/button"))
    messgae = await driver.findElement(By.xpath("//aside"))
    await driver.sleep(3000)
}) 




afterAll(async ()=>{
    await driver.quit()
})

test(" cross off a movie", async ()=>{

    await movieText.click();
    expect(await movieText.getAttribute("class")).toBe("checked")
    await movieText.click()
});

test("deleting a movie", async()=>{
    const preLength = await(await driver.findElements(By.xpath("//ul/*"))).length
    await deleteBtn.click()
    await driver.sleep(2000)
    expect(await driver.findElement(By.xpath("//ul/*"))).toHaveLength(preLength-1)
});

describe('notifications are displayed',()=>{
    test('crossing off notification', async()=>{
        const movieField = await driver.findElement(By.xpath('//input'))
        await movieField.sendKeys('Tenet/n')
        movieText = await driver.findElement(By.xpath("//ul/li/span"))

        await movieText.click();
        expect(await message.getText()).toBe("Movie watched!")
    });
    test('adding movie notification', async()=>{
        const movieField = await driver.findElement(By.xpath('//input'))
        await movieField.sendKeys('Tenet/n')
        movieText = await driver.findElement(By.xpath("//ul/li/span"))

        await movieText.click();
        expect(await message.getText()).toBe("Movie added back!")
    });
    test('deleting movie notification', async()=>{
        expect(await message.getText()).toBe("Movie deleted!")
    })
})