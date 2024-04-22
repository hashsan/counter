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

## short cut : counter(name,targetquery)

```html
<label id="mycounter" data-counter></label>
<script src="https://hashsan.github.io/counter/counter.js"
 onload ="counter('mycounter1','#mycounter')"
></script>
```
