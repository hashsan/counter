import "https://hashsan.github.io/counter/getUUID.js"
import { Octokit } from "https://esm.sh/@octokit/rest";

function getRepoInfo(url) {
  const repoUrlParts = url.replace("https://", "").split("/");
  const repoOwner = repoUrlParts[0].split(".")[0];
  const repoName = repoUrlParts[1];
  return { repoOwner, repoName };
}

function fromBase64(text){
  return atob(text)
}
function toBase64(text) {
  return btoa(text);
}
function parseName(url){
    return url.split("/").pop().split(".").shift() + ".txt";
}

function gitCounter(githubPagesUrl,token) {
  const { repoOwner, repoName } = getRepoInfo(githubPagesUrl);
  token = token || getUUID();
  const octokit = new Octokit({ auth: token });

  // カウントを取得する関数
  async function get(name) {
    name = parseName(name)
    try {
      const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: repoOwner,
        repo: repoName,
        path: name
      });
      const content = fromBase64(response.data.content)
      return parseInt(content);
    } catch (error) {
      //throw new Error("Failed to get count: " + error.message);
      return null;
    }
  }

  // カウントを追加する関数
  async function add(name) {
    try {
      name = parseName(name)      
      let count = await get(name)||0;
      let sha = await getSha(name)
      count++;
      await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: repoOwner,
        repo: repoName,
        path: name,
        message: "Increment count",
        content: toBase64(count.toString()),
        sha : sha
      });
    } catch (error) {
      throw new Error("Failed to update count: " + error.message);
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
      console.error("Failed to get SHA for file:", error.message);
      return null;
    }
  }

  return { get, add, getSha };
}

/*
async function done(){

  const counter = gitCounter("https://hashsan.github.io/counter");

  // 画像の URL からファイル名を取得し、それを使ってカウントを管理する
  const url = "https://example.com/demo1.jpg";
  document.querySelector('p')
    .textContent = await counter.get(url)

  await counter.add(url); // カウントを追加

  document.querySelector('p')
    .textContent = await counter.get(url)
}

document.querySelector('button').onclick=done;
*/

