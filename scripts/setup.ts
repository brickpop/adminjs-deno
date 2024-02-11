// Run Deno cache

async function setup() {
  await setup1();
  await setup2();
}

async function setup1() {
  const targetFile =
    Deno.cwd() + '/node_modules/.deno/adminjs@7.5.10/node_modules/adminjs/lib/frontend/utils/api-client.js';
  const cmd = new Deno.Command('sed', {
    args: ['-i', '', '13s/^\}$/}finally{if(!globalAny){globalAny={isOnServer:true};}}/', targetFile],
  });

  console.log('Patching', targetFile);
  await cmd.output();
}

async function setup2() {
  const targetFile =
    Deno.cwd() +
    '/node_modules/.deno/adminjs@7.5.10/node_modules/adminjs/lib/backend/utils/view-helpers/view-helpers.js';
  const cmd = new Deno.Command('sed', {
    args: ['-i', '', '8s/^\}$/}finally{if(!globalAny){globalAny={};}}/', targetFile],
  });

  console.log('Patching', targetFile);
  await cmd.output();
}

setup();
