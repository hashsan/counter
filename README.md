# counter

```
import "https://hashsan.github.io/counter/gitCounter.js?v2"

const counter = gitCounter('https://hashsan.github.io/counter') //set the stock repo

async function done(){
  var filename = 'test.jpg'
  var n = await counter.get(filename)  //make test.txt;// .jpg -----> .txt
  console.log(n)
  document.querySelector('p').textContent = n
  await counter.add(filename)
  n = await counter.get(filename)
  console.log(n)
  document.querySelector('p').textContent = n  
}

document.querySelector('button').onclick = done;
```

## gitWrite仕様
1. 呼び出しは、const git = gitWrite(url,token)
2. インターフェイスは、新規更新、読み込み、一覧、一覧かファイルかは自動判別
   2-1. await gitWrite.write(name,data)
   2-2. await gitWrite.get(name)
   2-3. await gitWrite.list(name) or await gitWrite.get(name)
   
## textと画像に関して
1. 判定は、const flg = isImage(name) //<-----未実装
2. 拡張子で簡易識別するので、拡張子間違えると大変、基本はテキスト
   1-1. 画像以外はテキスト
   1-2. 画像はurl、gif,jpeg,jpg,png,webp,avif,bmp,icon,svg


```
import "https://hashsan.github.io/counter/gitWrite.js"

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

```
   
