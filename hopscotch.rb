require 'sinatra'
require 'haml'
set :public_folder, File.dirname(__FILE__) + '/static'


get '/' do
  "Welcome to hopscotch"
end


get '/app' do
  haml = <<END
!!! 5
%html
  %head
    %meta{charset:"utf-8"}
    %script{src: 'raphael.js'}
    %script{src: 'jquery.js'}
    %script{src: 'underscore.js'}
    %script{src: 'hopscotch.js'}
    %link{type: 'text/css', rel: 'stylesheet', href: 'hopscotch.css'}
    %title Hopscotch
  %body
    #controls
      %a{href: "#", id: 'play'} Play
    #print-area
    #command-area
      .title Commands
      #command-list
END
  Haml::Engine.new(haml).render
end
