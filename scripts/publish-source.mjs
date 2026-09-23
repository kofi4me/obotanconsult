import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
if(process.stdin.isTTY)process.stdin.setRawMode(true);
console.log('Ready for publishing credential JSON on stdin (input is hidden).');
const input=await new Promise(resolve=>{let buffer='';process.stdin.on('data',chunk=>{buffer+=chunk.toString();if(/[\r\n]/.test(buffer))resolve(buffer.split(/[\r\n]/)[0])});process.stdin.resume()});
const credential=JSON.parse(input);process.stdin.pause();
const env={...process.env,GIT_TERMINAL_PROMPT:'0',GIT_CONFIG_COUNT:'4',GIT_CONFIG_KEY_0:'http.extraHeader',GIT_CONFIG_VALUE_0:`Authorization: Bearer ${credential.token}`,GIT_CONFIG_KEY_1:'credential.helper',GIT_CONFIG_VALUE_1:'',GIT_CONFIG_KEY_2:'http.sslBackend',GIT_CONFIG_VALUE_2:'schannel',GIT_CONFIG_KEY_3:'safe.directory',GIT_CONFIG_VALUE_3:process.cwd().replaceAll('\\','/')};
for(const key of Object.keys(env))if(key.startsWith('GIT_TRACE'))delete env[key];
function git(args){const result=spawnSync('git',args,{env,encoding:'utf8',windowsHide:true});if(result.status!==0)throw new Error(`Git ${args[0]} failed: ${result.stderr?.replaceAll(credential.token,'[redacted]')}`);return result.stdout.trim()}
try{
 if(!existsSync('.git'))git(['init','-b',credential.branch]);
 const remote=git(['remote']);if(!remote.split('\n').includes('origin'))git(['remote','add','origin',credential.remote_url]);
 if(git(['remote','get-url','origin'])!==credential.remote_url)throw new Error('Unexpected source remote.');
 git(['add','--all','--','.']);
 if(git(['status','--porcelain']))git(['-c','user.name=Codex','-c','user.email=codex@openai.com','commit','-m','Build Obotan Consult client intake and admin workspace']);
 git(['push','origin',`HEAD:refs/heads/${credential.branch}`]);
 console.log(JSON.stringify({commit_sha:git(['rev-parse','HEAD'])}));
}catch(error){console.error(error.message);process.exitCode=1}


