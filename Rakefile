task :default => [:test]

task :test do
  ruby "test/smoke_test.rb"
end

task :build do
  `cp -r static/ ../iOS/HopscotchV3/www/`
  `cp views/index.html ../iOS/HopscotchV3/www/index.html`
end

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
