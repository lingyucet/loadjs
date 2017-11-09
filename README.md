# loadjs
Loading javascript when the Dom loaded

You can execute code after the Script has loaded:

How to use:

``` html
<head>
...
<script>
    
    jsLoader({
        jsUrls       : ['http://www.example.com/example.js','./example.js'], //url
        jsIndex      : 0,  //set default
        sequenceSync : true  //false is async  true is sync;
    })
</script>
...
</head>
```
 
