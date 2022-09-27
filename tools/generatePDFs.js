// Astro build should be ran before running this script //

import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/** @type {import 'puppeteer'.Browser} */
let browser;

const main = async () => {
    browser = await puppeteer.launch();

    await Promise.all([
        generatePDF(
            `file://${resolve('dist/index.html')}`,
            './dist/Resume Ilya Nikishin.pdf',
        ),
        generatePDF(
            `file://${resolve('dist/ru/index.html')}`,
            './dist/Резюме Илья Никишин.pdf',
        ),
    ]);

    await browser.close();
}

const generatePDF = async (url, savePath) => {
    const page = await browser.newPage();

    page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;

        const [, path] = interceptedRequest.url().split('file:///');
        if (path?.startsWith('assets/')) {
            interceptedRequest.respond({
                body: readFileSync(resolve('dist', path)),
            });
            return;
        }

        interceptedRequest.continue();
    })

    await page.goto(url);

    const pdf = await page.pdf({ format: 'A4' });
    await writeFile(savePath, pdf);
}

main();
