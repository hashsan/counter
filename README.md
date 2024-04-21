# counter

```
import "https://hashsan.github.io/counter/gitCounter.js"

const counter = gitCounter('https://hashsan.github.io/counter') //set the stock repo
{
  var filename = 'test.jpg'
  var n = await counter.get(filename)  //make test.txt;// .jpg -----> .txt
  console.log(n)
  await counter.add(filename)
  n = await counter.get(filename)
  console.log(n)
}

```
