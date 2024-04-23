import "https://hashsan.github.io/counter/getUUID.js"
import { Octokit } from "https://esm.sh/@octokit/rest";

function fromBase64(base64){
  //return atob(base64)
  return decodeURIComponent(atob(base64));
}
function toBase64(text) {
  //return btoa(text);
  return btoa(encodeURIComponent(text));    
}

function getRepoInfo(url) {
  const repoUrlParts = url.replace("https://", "").split("/");
  const repoOwner = repoUrlParts[0].split(".")[0];
  const repoName = repoUrlParts[1];
  return { repoOwner, repoName };
}


function gitWrite(githubPagesUrl,token) {
  const { repoOwner, repoName } = getRepoInfo(githubPagesUrl);
  token = token || getUUID();
  const octokit = new Octokit({ auth: token });

  async function list(name){
    return get(name)
  }

//ファイルコンテンツか、ディレクトリなら取得データそのもの  
async function get(name) {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: repoOwner,
      repo: repoName,
      path: name
    });

    // ファイルかディレクトリかを判別する
    if (Array.isArray(response.data)) {
      // ディレクトリの場合
      return response.data 
    } else {
      // ファイルの場合
      const content = fromBase64(response.data.content);
      return content
    }
  } catch (error) {
    console.error("Failed to get file or directory:", error.message);
    return null;
  }
}

  
  // カウントを追加する関数
  async function write(name,data) {
    try {
      //name = parseName(name)      
      //let count = await get(name)||0;
      let sha = await getSha(name)
      //count++;
      await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: repoOwner,
        repo: repoName,
        path: name,
        message: "Increment count",
        content: toBase64(data),
        sha : sha
      });
    } catch (error) {
      throw new Error("Failed to update data: " + error.message);
    }
  }

  async function getSha(filePath) {
    try {
      const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: repoOwner,
        repo: repoName,
        path: filePath
      });
      return response.data.sha;
    } catch (error) {
      //console.error("Failed to get SHA for file:", error.message);
      return null;
    }
  }

  return { get, write, list, getSha };
}

window.gitWrite = gitWrite

/*
////////////////
var git = gitWrite('https://hashsan.github.io/counter')

document.querySelector('#write').onclick =async()=>{
  var name ='sample.txt'
  var text = document.querySelector('#input').value
  await git.write(name,text)
  var _text = await git.get(name)
  document.querySelector('#result').textContent = _text
  console.log(_text)
  
  var list = await git.list()
  console.log(list)
  
}
*/
