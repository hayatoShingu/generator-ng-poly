'use strict';
var path = require('path')
  , yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , Generator;

Generator = module.exports = yeoman.generators.Base.extend();

/*Generator.prototype.intitialize = function intitialize() {
  // this overwrites the default the .yo-rc.json file
  // a default is provided so that the module subgen will run
  // by being able to find the .yo-rc file
  this.options.force = true;
};*/

Generator.prototype.prompting = function prompting() {
  var done = this.async();

  this.log(yosay('Welcome to ngPoly!'));

  // ask for app name
  // get preferred langugaes
  this.prompt([{
    name: 'appName',
    message: 'What is the app\'s name?'
  },
  {
    type: 'list',
    name: 'markup',
    message: 'What is the preferred markup language?',
    choices: [
      {
        name: 'HAML',
        value: 'haml'
      },
      {
        name: 'HTML',
        value: 'html'
      },
      {
        name: 'Jade',
        value: 'jade',
        checked: true
      }
    ]
  },
  {
    type: 'list',
    name: 'appScript',
    message: 'What is the preferred application scripting language?',
    choices: [
      {
        name: 'JavaScript',
        value: 'js',
        checked: true
      }
    ]
  },
  {
    type: 'confirm',
    name: 'controllerAs',
    message: 'Want to use Controller As syntax?',
    default: true
  },
  {
    type: 'confirm',
    name: 'passFunc',
    message: 'Should functions be defined and passed instead of defined inline (in callbacks)?',
    default: true
  },
  {
    type: 'confirm',
    name: 'namedFunc',
    message: 'Want to use named functions instead of anonymous?',
    default: true
  },
  {
    type: 'list',
    name: 'testScript',
    message: 'What is the preferred test scripting language?',
    choices: [
      {
        name: 'CoffeeScript',
        value: 'coffee'
      },
      {
        name: 'JavaScript',
        value: 'js',
        checked: true
      }
    ]
  },
  {
    type: 'list',
    name: 'testDir',
    message: 'Where should tests be saved?',
    choices: [
      {
        name: 'app/',
        value: 'app',
        checked: true
      },
      {
        name: 'test/',
        value: 'test'
      }
    ]
  },
  {
    type: 'list',
    name: 'style',
    message: 'What is the preferred style language?',
    choices: [
      {
        name: 'CSS',
        value: 'css'
      },
      {
        name: 'LESS',
        value: 'less',
        checked: true
      },
      {
        name: 'SCSS',
        value: 'scss'
      },
      {
        name: 'Stylus',
        value: 'styl'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'polymer',
    message: 'Should Polymer support be enabled?',
    default: true
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Should a framework be setup?',
    choices: [
      {
        name: 'none',
        value: 'none'
      },
      {
        name: 'Bootstrap with AngularStrap',
        value: 'angularstrap'
      },
      {
        name: 'Bootstrap with UI Bootstrap',
        value: 'uibootstrap'
      },
      {
        name: 'Foundation with Angular Foundation',
        value: 'foundation'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'ngRoute',
    message: 'Should ngRoute be used instead of UI Router?',
    default: false
  },
  {
    type: 'checkbox',
    name: 'bower',
    message: 'Which additonal Bower components should be installed?',
    choices: [
      {
        name: 'Angular Animate',
        value: 'animate'
      },
      {
        name: 'Angular Cookies',
        value: 'cookies'
      },
      {
        name: 'Angular Resource',
        value: 'resource'
      },
      {
        name: 'Angular Sanitize',
        value: 'sanitize'
      },
      {
        name: 'Angular Touch',
        value: 'touch'
      },
      {
        name: 'Font Awesome',
        value: 'fontawesome'
      },
      {
        name: 'Lo-Dash',
        value: 'lodash'
      },
      {
        name: 'Restangular (installs Lo-Dash)',
        value: 'restangular'
      }
    ]
  }], function (props) {
    this.appName = props.appName;
    this.markup = props.markup;
    this.appScript = props.appScript;
    this.controllerAs = props.controllerAs;
    this.passFunc = props.passFunc;
    this.namedFunc = props.namedFunc;
    this.testScript = props.testScript;
    this.testDir = props.testDir;
    this.style = props.style;
    this.polymer = props.polymer;
    this.ngRoute = props.ngRoute;
    this.framework = props.framework;
    this.bower = props.bower.join(',');

    done();
  }.bind(this));

};

Generator.prototype.configuring = function configuring() {
  // create a directory with appName, unless user is in a directory named appName
  if (this.appName !== this._.last(this.destinationRoot().split(path.sep))) {
    this.destinationRoot(this.appName);
  }

  // save config info
  this.config.set('markup', this.markup);
  this.config.set('appScript', this.appScript);
  this.config.set('controllerAs', this.controllerAs);
  this.config.set('passFunc', this.passFunc);
  this.config.set('namedFunc', this.namedFunc);
  this.config.set('testScript', this.testScript);
  this.config.set('testDir', this.testDir);
  this.config.set('style', this.style);
  this.config.set('ngRoute', this.ngRoute);
  this.config.set('lastUsedModule', 'home');

  // force save to guarantee config exists for controller
  // tests randomly fail without this
  this.config.forceSave();

  this.context = {
    appName: this.appName,
    moduleName: this.appName,
    passFunc: this.passFunc,
    namedFunc: this.namedFunc,
    polymer: this.polymer,
    framework: this.framework,
    ngRoute: this.ngRoute,
    bower: this.bower
  };

  // copy over common files
  this.copy('.editorconfig', '.editorconfig');
  this.copy('.jshintrc', '.jshintrc');
  this.template('_bower.json', 'bower.json', this.context);
  this.template('_gulpfile.js', 'Gulpfile.js', this.context);
  this.copy('karma.config.js', 'karma.config.js');
  this.template('_package.json', 'package.json', this.context);
  this.copy('protractor.config.js', 'protractor.config.js');
  this.template('_readme.md', 'README.md');
};

Generator.prototype.writing = function writing() {
  var markup = this.markup;

  this.mkdir('app');

  // create main module and index.html
  this.template('_app.js',
    path.join('app', 'app.js'), this.context);
  this.template('_index.' + markup,
    path.join('app', 'index.' + markup), this.context);

  this.mkdir(path.join('app', 'fonts'));
  this.mkdir(path.join('app', 'images'));
};

Generator.prototype.install = function install() {
  if (!this.options['skip-install']) {
    this.installDependencies();
  }
};

Generator.prototype.end = function end() {
  this.composeWith('ng-poly:module', {
    args: ['home'],
    options: {
      module: 'home',
      markup: this.markup,
      style: this.style,
      'test-dir': this.testDir,
      'test-script': this.testScript,
      'controller-as': this.controllerAs,
      'pass-func': this.passFunc,
      'named-func': this.namedFunc,
      'ng-route': this.ngRoute
    }
  }, {
    local: require.resolve('../module'),
    link: 'strong'
  });
};
