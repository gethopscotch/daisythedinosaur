require 'sinatra'
require 'haml'
set :public_folder, File.dirname(__FILE__) + '/static'


get '/' do
  haml :landing
end


get '/app' do
  haml :index
end

get '/jocelyn' do
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
"></iframe></body>
end
