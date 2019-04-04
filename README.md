# directory-tree
Given a list of file paths on a webpage, this script can turn them into a directory tree, giving you the ability to twirl down folders

## Running the test file
I've had issues running the script by just opening the html file in a browser as-is, but when hosted either by a server program on localhost (apache, something you write yourself, or otherwise) or on a live environment somewhere, it seems to work just fine.

## Using in your web app
Feel free, just maybe credit me in the comments of your script, or maybe shoot me a happy email, or some hate mail if it's crappy and buggy and you end up making more work for yourself fixing it than it would have been if you did it yourself in the first place :-) 

In its current state, it parses different files in <a> tags using a trailing <br> tag as a delimiter.  Not a fantastic design choice, but it suited my purpose for my website.

All you need then is something to the effect of:
``` html
  <div id='files'>
    <a href="#" class="file">404.html</a><br>
    <a href="#" class="file">about-me.html</a><br>
    <a href="#" class="file">scripts/carousel.min.js</a><br>
    <a href="#" class="file">scripts/edit.js</a><br>
    <a href="#" class="file">styles/main_style.css</a><br>
  </div>
```

