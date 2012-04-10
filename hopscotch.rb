require 'sinatra'
require 'haml'
set :public_folder, File.dirname(__FILE__) + '/static'

get '/index.html' do
  File.read(File.join('views', 'index.html'))
end
