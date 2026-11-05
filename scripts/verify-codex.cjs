// Install Playwright, or point PLAYWRIGHT_MODULE at an existing installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../dist');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp'};
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
  const go=async(hash)=>{await page.goto('http://127.0.0.1:4178/'+hash);await page.locator('main h1,main h2').first().waitFor();};
  const captureHome = async (name) => {
    for (const element of await page.locator('.codex-masthead,.landscape-object,.index-editorial').all()) {
      await element.scrollIntoViewIfNeeded();
      await page.waitForFunction(el => getComputedStyle(el).opacity === '1', await element.elementHandle());
    }
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({path:path.resolve(__dirname,'../'+name),fullPage:true});
  };
  try {
    await go('#herbs');
    await page.getByRole('button',{name:'Enlarge editorial image'}).click();
    await page.getByRole('dialog',{name:'Botanical imagery'}).waitFor();
    await page.locator('.image-viewer figure img').evaluate(image => image.decode());
    await page.keyboard.press('Escape');
    assert(await page.getByRole('button',{name:'Enlarge editorial image'}).evaluate(el => el === document.activeElement));
    await go('');
    await page.locator('#home-search-input').fill('Ginger');
    await page.getByRole('button',{name:'Search Mulika',exact:true}).click();
    await page.locator('.results-layout,.abstention').waitFor();
    await go('#home');
    await page.getByRole('button',{name:'Start discovering',exact:true}).click();
    await page.locator('#ask-input').waitFor();
    await page.reload();
    await page.locator('.browse-shortcuts').waitFor();
    assert.equal(await page.locator('.browse-shortcuts > div > button').count(),3);
    await page.locator('#ask-input').fill('Draft');
    await page.getByRole('button',{name:'Clear search',exact:true}).click();
    assert.equal(await page.locator('#ask-input').inputValue(),'');
    assert(await page.locator('#ask-input').evaluate(el => el === document.activeElement));
    await go('#home');
    await page.getByRole('button',{name:'Check availability Shop coming soon',exact:true}).click();
    await page.getByRole('heading',{name:'Purchasing is coming soon.',exact:true}).waitFor();
    await go('#home');
    await page.locator('.home-herb button').first().click();
    await page.getByRole('dialog',{name:'Herb profile'}).waitFor();
    await page.keyboard.press('Escape');
    await go('#index');
    assert.equal(await page.locator('.landscape-object').count(),7);
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
    await go('#index');
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
    await go('#sources');
    await page.getByRole('heading',{name:'Epistemological Methodology & Provenance Architecture',exact:true}).waitFor();
    assert.equal(await page.locator('.evidence-tier-grid>li').count(),4);
    assert((await page.locator('.evidence-processing').textContent()).includes('Not treated as source evidence.'));
    await go('#search');
    await page.locator('#ask-input').fill('Sleep');
    await page.locator('.search-composer').getByRole('button',{name:'Discover',exact:true}).click();
    await page.locator('.results-layout,.abstention').waitFor();
    assert(await page.locator('.formulation-card').count()>0);
    assert.equal(await page.locator('.context-summary').count(),0);
    await page.locator('.search-profile summary').click();
    await page.getByLabel('Age group',{exact:true}).selectOption('18–64');
    await page.getByLabel('Gender',{exact:true}).selectOption('Non-binary');
    await page.locator('.search-composer').getByRole('button',{name:'Discover',exact:true}).click();
    await page.locator('.results-layout').waitFor();
    assert((await page.locator('.context-summary').textContent()).includes('Non-binary'));
    assert.equal(await page.locator('.source-summary').getAttribute('open'),null);
    assert.equal(await page.locator('.record-references').first().getAttribute('open'),null);
    const firstRecord = page.locator('.formulation-card').first();
    await firstRecord.getByRole('button',{name:'Make Yourself',exact:true}).click();
    await page.getByRole('heading',{name:'Make Yourself',exact:true}).waitFor();
    assert(await page.locator('.record-preparation').first().textContent());
    const ingredient = page.getByRole('button',{name:/Check availability/}).first();
    if(await ingredient.count()) {
      await ingredient.click();
      await page.getByRole('heading',{name:'Purchasing is coming soon.',exact:true}).waitFor();
      assert((await page.locator('.experience-page').textContent()).includes('Ingredient carried'));
      await page.getByRole('button',{name:'Explore recorded preparations',exact:true}).click();
    }
    await page.locator('.experience-back').click();
    assert.equal(await page.locator('#ask-input').inputValue(),'Sleep');
    await firstRecord.getByRole('button',{name:'Buy',exact:true}).click();
    await page.getByRole('heading',{name:'Purchasing is coming soon.',exact:true}).waitFor();
    assert.equal(await page.locator('.product-grid article').count(),0);
    await page.locator('.experience-back').click();
    await page.locator('#ask-input').fill('Unsubmitted question');
    assert.equal(await page.locator('.discovery-results-heading h2').textContent(),'Sleep');
    await firstRecord.getByRole('button',{name:'Consult a Physician',exact:true}).click();
    await page.getByRole('heading',{name:'Consult a Physician',exact:true}).waitFor();
    assert.equal(await page.getByLabel('Your concern',{exact:true}).inputValue(),'Sleep');
    assert.equal(await page.getByLabel('Age group',{exact:true}).inputValue(),'18–64');
    await page.getByLabel('Your concern',{exact:true}).fill('Sleep question for professional review');
    await page.locator('.consult-context textarea').last().fill('Local private note');
    await page.getByRole('button',{name:'Review context',exact:true}).click();
    assert((await page.getByRole('region',{name:'Consultation context review'}).textContent()).includes('Local private note'));
    assert((await page.locator('.consult-unavailable').textContent()).includes('not connected'));
    assert(await page.locator('.consult-review').evaluate(el => el === document.activeElement));
    assert.equal(await page.locator('.consult-context').count(),0);
    await page.getByRole('button',{name:'Edit context',exact:true}).click();
    assert.equal(await page.getByLabel('Your concern',{exact:true}).inputValue(),'Sleep question for professional review');
    assert.equal(await page.getByLabel('Health context',{exact:true}).inputValue(),'Local private note');
    await page.locator('.experience-back').click();
    assert.equal(await page.locator('#ask-input').inputValue(),'Unsubmitted question');
    await page.locator('#ask-input').fill('Sleep');
    await firstRecord.getByRole('button',{name:'Consult a Physician',exact:true}).click();
    assert.equal(await page.locator('.consult-context textarea').last().inputValue(),'');
    await page.locator('.experience-back').click();
    await page.locator('.source-summary>summary').click();
    await page.getByRole('heading',{name:'What the sources record',exact:true}).waitFor();
    await page.locator('.record-references>summary').first().click();
    await firstRecord.getByRole('button',{name:'View evidence',exact:true}).click();
    await page.getByRole('dialog',{name:'The source behind the claim',exact:true}).waitFor();
    await page.keyboard.press('Escape');
    await page.getByLabel('Gender',{exact:true}).selectOption('Woman');
    assert(!(await page.locator('.context-summary').textContent()).includes('Woman'));
    await page.getByRole('button',{name:'Clear context',exact:true}).click();
    await page.locator('.search-composer').getByRole('button',{name:'Discover',exact:true}).click();
    await page.locator('.results-layout').waitFor();
    assert.equal(await page.locator('.context-summary').count(),0);
    await page.reload();
    assert.equal(await page.getByLabel('Age group',{exact:true}).inputValue(),'');
    for(const width of [360,390,430,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      for(const hash of ['#home','#index','#herbs','#az','#taxonomy','#search','#ailments','#sources','#codex','#compare','#glossary','#community','#make','#buy','#consult']) {
        await go(hash);
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
        if(overflow) console.log(await page.evaluate(() => [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0,12).map(el => ({tag:el.tagName,classes:el.className,text:el.textContent.slice(0,90),right:el.getBoundingClientRect().right}))));
        assert(!overflow,'Horizontal overflow: '+width+' '+hash);
        if(!['#home','#search','#make','#buy','#consult'].includes(hash)) {
          const art = page.locator('.botanical-banner img').first();
          await art.waitFor();
          await art.evaluate(image => image.decode());
          assert(await art.evaluate(image => image.naturalWidth > 0),'Missing editorial image: '+hash);
        }
      }
    }
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:900});
      for (const hash of ['search','herbs','sources','community','home']) {
        await go('#'+hash);
        if(!['home','search'].includes(hash)) await page.locator('.botanical-banner img').evaluate(image => image.decode());
        await page.screenshot({path:path.join(require('os').tmpdir(),'mulika-'+hash+'-'+width+'.png')});
      }
    }
    await go('#search');
    await page.locator('#ask-input').fill('Sleep');
    await page.locator('.search-composer').getByRole('button',{name:'Discover',exact:true}).click();
    await page.locator('.formulation-card').first().waitFor();
    assert.equal(await page.locator('.prompt-chips').count(),0);
    assert.equal(await page.getByRole('navigation',{name:'Mobile primary'}).getByRole('button').count(),4);
    await page.screenshot({path:path.join(require('os').tmpdir(),'mulika-results-minimal-mobile.png')});
    await page.locator('.formulation-card').first().getByRole('button',{name:'Consult a Physician',exact:true}).click();
    await page.getByRole('heading',{name:'Consult a Physician',exact:true}).waitFor();
    assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)));
    await page.screenshot({path:path.join(require('os').tmpdir(),'mulika-consult-mobile.png')});
    await page.locator('.experience-back').click();
    await page.getByRole('navigation',{name:'Mobile primary'}).getByRole('button',{name:'Saved',exact:true}).click();
    await page.locator('[data-scene="saved"] img').evaluate(image => image.decode());
    await page.getByRole('button',{name:'Close panel',exact:true}).click();
    await page.setViewportSize({width:390,height:844});
    await go('#home');
    await captureHome('codex-mobile.png');
    await page.keyboard.press('Control+k');
    await page.locator('.theme-control select').selectOption('dark');
    await page.getByRole('button',{name:'Close panel',exact:true}).click();
    await captureHome('codex-dark.png');
    await page.emulateMedia({reducedMotion:'reduce'});
    await go('#home');
    await go('#index');
    await page.getByRole('button',{name:'I have a question',exact:true}).click();
    await page.getByRole('heading',{name:'Search the collection.',exact:true}).waitFor();
    assert.equal(await page.locator('.guide-answer h2').textContent(),'Search the collection.');
    assert.equal(await page.locator('.landscape-object').first().evaluate(el=>getComputedStyle(el).opacity),'1');
    assert.deepEqual(errors,[]);
    console.log('PASS: visual index, A–Z language/letter filters, dossier anchors, Back, keyboard destination finder, family filtering, comparison, folio route, static search, 90 responsive checks with loaded imagery, dark mode, no page errors.');
  } finally { await browser.close(); server.close(); }
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});
