<!DOCTYPE html>
<!--
Copyright 2012 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
Author: Eric Bidelman (ericbidelman@chromium.org)
-->
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
<title>xhr.send(FormData) Example</title>
</head>
<body>

<input type="file" name="afile" id="afile" accept="image/*"/>

<script>
document.querySelector('#afile').addEventListener('change', function(e) {
  var file = this.files[0];
  var fd = new FormData();
  fd.append("afile", file);
  // These extra params aren't necessary but show that you can include other data.
  fd.append("username", "Groucho");
  fd.append("accountnum", 123456);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'handle_file_upload.php', true);
  
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100;
      console.log(percentComplete + '% uploaded');
    }
  };
  xhr.onload = function() {
    if (this.status == 200) {
      var resp = JSON.parse(this.response);
      console.log('Server got:', resp);
      var image = document.createElement('img');
      image.src = resp.dataUrl;
      document.body.appendChild(image);
    };
  };
  xhr.send(fd);
}, false);
</script>
<!--[if IE]>
<script src="http://ajax.googleapis.com/ajax/libs/chrome-frame/1/CFInstall.min.js"></script>
<script>CFInstall.check({mode: 'overlay'});</script>
<![endif]-->
</body>
</html>