task :default => [:test]

task :test do
  ruby "test/smoke_test.rb"
end

task :build do
  `cp -r static/ ../iOS/HopscotchV3/www/`
  `cp views/index.html ../iOS/HopscotchV3/www/index.html`
end
