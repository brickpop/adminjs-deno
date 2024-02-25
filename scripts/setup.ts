// Force loading the NPM modules
import _express from 'npm:express';
import _AdminJS from 'npm:adminjs';
import _AdminJsExpress from 'npm:@adminjs/express';

// Run Deno cache

async function setup() {
  await setup1();
  await setup2();
}

async function setup1() {
  const prefix = await getLastVersionPath("adminjs")
  const targetFile = prefix + '/node_modules/adminjs/lib/frontend/utils/api-client.js';
  const cmd = new Deno.Command('sed', {
    args: ['-i', '', '13s/^\}$/}finally{if(!globalAny){globalAny={isOnServer:true};}}/', targetFile],
  });

  console.log('Patching', targetFile);
  await cmd.output();
}

async function setup2() {
  const prefix = await getLastVersionPath("adminjs")
  const targetFile = prefix + '/node_modules/adminjs/lib/backend/utils/view-helpers/view-helpers.js';
  const cmd = new Deno.Command('sed', {
    args: ['-i', '', '8s/^\}$/}finally{if(!globalAny){globalAny={};}}/', targetFile],
  });

  console.log('Patching', targetFile);
  await cmd.output();
}

async function getLastVersionPath(packageName: string) {
  const targetPath = Deno.cwd() + '/node_modules/.deno/'

  const items: string[] = []
  for await(const item of Deno.readDir(targetPath)) {
    if(!item.name.startsWith(packageName + "@")) continue
    else if(!item.isDirectory) continue

    items.push(item.name)
    break
  }
  if(!items.length) return null;

  items.sort((a, b) => {
    if(a < b) return 1;
    return -1
  })
  return targetPath + items[0]
}

setup();
