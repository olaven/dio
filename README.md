# dio [![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/olaven/dio/master/mod.ts)
Minimal file io library for Deno.

See [the documentation](https://doc.deno.land/https/raw.githubusercontent.com/olaven/dio/master/mod.ts) (it's far from overwhelming)


```ts 
import { read_file } from "https://denopkg.com/olaven/dio";

const content = await read_file("./README.md");
console.log(content);       
```

