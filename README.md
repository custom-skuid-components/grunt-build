# grunt-build
Streamlined Skuid component deployment using grunt.js.

##Initial Setup (Mac/OSX)

###1) Install ant and grunt

```
brew install ant
brew install -g grunt
```

###2) Set environment variables
__NOTE:__ This will only work on 'login.salesforce.com' instances without some manipulation of the `gruntfile.js`

``vim ~/.bashrc``

add to the bottom

```
# Salesforce Credentials
export SFUSER="<SALESFORCE USERNAME>"
export SFPASS="<SALESFORCE PASSWORD>"
export SFTOKEN="<SALESFORCE TOKEN>"
```

and refresh the env variables

``source ~/.bashrc``

###3) install node modules

``npm install``

###4) push to salesforce

``grunt``

###5) add to skuid configure

<img width="1268" alt="skuid_settings" src="https://cloud.githubusercontent.com/assets/4411118/21775876/d9e573a8-d665-11e6-8191-14b6c32af700.png">