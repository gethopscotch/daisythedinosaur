require 'sinatra'
require 'haml'
set :public_folder, File.dirname(__FILE__) + '/static'


get '/' do
  haml :landing
end


get '/app' do
  haml :index
end

get '/chiara' do
<<END
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="javascripts/vendor/raphael.js"></script>
    <script src="javascripts/vendor/jquery.js"></script>
    <script src="javascripts/vendor/underscore.js"></script>
    <script src="javascripts/methods.js"></script>
    <script src="javascripts/hopscotch.js"></script>
    <script src="javascripts/on_load.js"></script>
    <link href="hopscotch.css" rel="stylesheet" type="text/css">
    <title>Hopscotch</title>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26590397-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script type="text/javascript">var _sf_startpt=(new Date()).getTime()</script>
  </head>
<body style="
    background: #4E9CB5;
"><div class="username" style="
    text-align: center;
    color: white;
    font-family: sans-serif;
    text-transform: uppercase;
    margin-left: 440px;
"><h1>Chiara's Alice Animation</h1></div>
<iframe width="920" height="760" src="http://www.youtube.com/embed/V5CPZm5tf1o?rel=0" frameborder="0" allowfullscreen="" style="
    border: 6px solid white;
    margin-left: 220px;
"></iframe>

<script type="text/javascript">
var _sf_async_config={uid:30625,domain:"gethopscotch.com"};
(function(){
  function loadChartbeat() {
    window._sf_endpt=(new Date()).getTime();
    var e = document.createElement('script');
    e.setAttribute('language', 'javascript');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('src',
       (("https:" == document.location.protocol) ? "https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/" : "http://static.chartbeat.com/") +
       "js/chartbeat.js");
    document.body.appendChild(e);
  }
  var oldonload = window.onload;
  window.onload = (typeof window.onload != 'function') ?
     loadChartbeat : function() { oldonload(); loadChartbeat(); };
})();

</script>

</body>
</html>
END
end

get '/jocelyn' do
<<END
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="javascripts/vendor/raphael.js"></script>
    <script src="javascripts/vendor/jquery.js"></script>
    <script src="javascripts/vendor/underscore.js"></script>
    <script src="javascripts/methods.js"></script>
    <script src="javascripts/hopscotch.js"></script>
    <script src="javascripts/on_load.js"></script>
    <link href="hopscotch.css" rel="stylesheet" type="text/css">
    <title>Hopscotch</title>
  </head>
<body style="
    background: transparent url(/images/bg-image.png) no-repeat 0 0;
"><div class="username" style="
    text-align: center;
    color: white;
    font-family: sans-serif;
    text-transform: uppercase;
"><h1>Jocelyn's Alice Animation</h1></div><iframe width="420" height="315" src="http://www.youtube.com/embed/hRiXaMM6Dvs" frameborder="0" allowfullscreen="" style="
    border: 6px solid white;
    margin-top: 130px;
    margin-left: 450px;
"></iframe>

</body>
</html>
END
end
