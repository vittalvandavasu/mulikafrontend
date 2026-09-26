// Install Playwright, or point PLAYWRIGHT_MODULE at an existing installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../dist');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css'};
const server = http.createServer((req,res) => {
  if(req.url.startsWith('/api/')) { res.writeHead(404); return res.end('No API on static hosting'); }
  const pathname = new URL(req.url,'http://localhost').pathname;
  const file = path.join(root, pathname === '/' ? 'index.html' : pathname);
  if(!file.startsWith(root)) {res.writeHead(403); return res.end();}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end();}else{res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');res.end(data);}});
});
(async()=>{
  await new Promise(resolve=>server.listen(4178,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath:process.env.BROWSER_EXECUTABLE } : {})});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const go=async(hash)=>{await page.goto('http://127.0.0.1:4178/'+hash);await page.locator('h1').first().waitFor();};
  const captureHome = async (name) => {
    for (const element of await page.locator('.codex-masthead,.landscape-object,.index-editorial').all()) {
      await element.scrollIntoViewIfNeeded();
      await page.waitForFunction(el => getComputedStyle(el).opacity === '1', await element.elementHandle());
    }
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({path:path.resolve(__dirname,'../'+name),fullPage:true});
  };
  try {
    await go('');
    assert.equal(await page.locator('.landscape-object').count(),7);
    await page.waitForFunction(() => [...document.querySelectorAll('.landscape-object')].filter(el => el.getBoundingClientRect().top < innerHeight).every(el => getComputedStyle(el).opacity === '1'));
    await page.getByRole('button',{name:'I have a question',exact:true}).click();
    await page.getByRole('heading',{name:'Search the collection.',exact:true}).waitFor();
    await page.getByRole('button',{name:'Search the Codex',exact:true}).click();
    await page.locator('#ask-input').waitFor();
    await page.goBack();
    await page.getByRole('button',{name:'I want to read',exact:true}).click();
    await page.getByRole('button',{name:'Open the reader',exact:true}).click();
    await page.locator('.archive-shell').waitFor();
    await go('#home');
    await captureHome('codex-desktop.png');
    await page.locator('.landscape-object').filter({hasText:'A–Z & names'}).click();
    await page.getByRole('navigation',{name:'Choose initial letter'}).waitFor();
    await page.getByRole('button',{name:'Scientific',exact:true}).click();
    await page.locator('.alphabet-rail').getByRole('button',{name:'A',exact:true}).click();
    const scientific=await page.locator('.catalogue-list strong').allTextContents();
    assert(scientific.length>0 && scientific.every(name=>name.toUpperCase().startsWith('A')));
    await page.locator('.catalogue-list>button').first().click();
    await page.getByRole('dialog',{name:'Herb profile'}).waitFor();
    await page.getByRole('link',{name:'Traditional uses',exact:true}).click();
    assert.equal(new URL(page.url()).hash,'#az');
    await page.keyboard.press('Escape');
    await page.goBack();
    await page.locator('.knowledge-landscape').waitFor();
    await page.keyboard.press('Control+k');
    await page.getByRole('textbox',{name:'Find a destination'}).fill('families');
    await page.getByRole('textbox',{name:'Find a destination'}).press('Enter');
    await page.locator('.family-select select').waitFor();
    await page.locator('.family-select select').selectOption({index:1});
    assert(await page.locator('.catalogue-list>button').count()>0);
    await go('#compare');
    await page.locator('.comparison-editorial').waitFor();
    await page.keyboard.press('Control+k');
    await page.getByRole('textbox',{name:'Find a destination'}).fill('Manuscripts');
    await page.getByRole('textbox',{name:'Find a destination'}).press('Enter');
    await page.locator('.archive-shell').waitFor();
    assert.equal(await page.locator('.comparison-editorial').count(),0);
    await go('#codex?book=mulika&page=8&entry=mulika-p8-1');
    await page.locator('.archive-shell').waitFor();
    await go('#search');
    await page.locator('#ask-input').fill('Sleep');
    await page.getByRole('button',{name:'Find sources',exact:true}).click();
    await page.locator('.results-layout,.abstention').waitFor();
    assert(await page.locator('.formulation-card').count()>0);
    for(const width of [360,390,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      for(const hash of ['#home','#az','#taxonomy','#search','#sources','#compare']) {
        await go(hash);
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
        assert(!overflow,'Horizontal overflow: '+width+' '+hash);
      }
    }
    await page.setViewportSize({width:390,height:844});
    await go('#home');
    await captureHome('codex-mobile.png');
    await page.keyboard.press('Control+k');
    await page.locator('.theme-control select').selectOption('dark');
    await page.getByRole('button',{name:'Close panel',exact:true}).click();
    await captureHome('codex-dark.png');
    await page.emulateMedia({reducedMotion:'reduce'});
    await go('#home');
    await page.getByRole('button',{name:'I have a question',exact:true}).click();
    assert.equal(await page.locator('.guide-answer h2').textContent(),'Search the collection.');
    assert.equal(await page.locator('.landscape-object').first().evaluate(el=>getComputedStyle(el).opacity),'1');
    assert.deepEqual(errors,[]);
    console.log('PASS: visual index, A–Z language/letter filters, dossier anchors, Back, keyboard destination finder, family filtering, comparison, folio route, static search, 30 responsive checks, dark mode, no page errors.');
  } finally { await browser.close(); server.close(); }
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
