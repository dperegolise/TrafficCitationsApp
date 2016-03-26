# Angular Project Template 

This is a basic UI-only template that provides a quick start-up for an opinionated Angular project.

It assumes you are running a REST service at any known location, but lets the UI developer run completely alone with his/her own node Express server.

##Set Up

These setup instructions are for Windows.  However, this stack will run on UNIX, Mac OS, etc,
We also assume you have open access to the web for node and git code.

1. Clone the repository.
2. Make sure you have the following applications installed:
	1. node.js  https://nodejs.org/
	
	2. Once installed, install the following global node modules:
	``` 
	npm install -g bower
	npm install -g gulp
	npm install -g karma
	npm install -g jasmine-node
	```	
	3. Now open a terminal at the project root.
	```
	npm install

	bower install
	```
3. Now you can test the project by typing gulp at a command prompt.
```
gulp
``` 
Open your browser and point at http://localhost:3444   Your app will appear!
			
4. Now fill in the project details in **package.json** and **bower.json**.  The project ***name*** in package.json will be used to cache-bust the app, so it has to be file system friendly.


## What You Get
This template is an industrial strength project set-up, with lots of tooling to create a high quality, tested application.

We follow the guidelines in https://github.com/agilethought/angularjs-styleguide

Here is a run-down of the project parts, by major directory:

### Config : Instructions for building and testing the app
buildConfig.js is used by the gulp process to determine what files to process which way.
It is reasonably documented.  **Vendor libraries are explicitly added here**.  The process does not add all libraries in the vendor library.

### Data: Mock Data for the back-end REST endpoints

Check out he [readme.md](https://github.com/agilethought/AngularProjectTemplate/tree/master/data) file there.

### E2E: End to end tests

We'd house our protractor tests here.  See [https://github.com/mbcooper/ProtractorExample](https://github.com/mbcooper/ProtractorExample)

### Fixtures: Angular mock data modules for unit tests

Since we're dealing primarily with API endpoints that could constantly be changing, we want a flexible way of managing test data for our Karma unit tests.  Drop JSON files and directories of JSON samples into this folder, and then run the gulp task:
```
gulp fixtures
```
This will create a .js file alongside the .json file that can be referenced in unit tests.  This way, we get re-use and, as objects and data evolves, we just drop in new JSON, run the task and our tests can be re-run with the updated fixtures.

To use the fixture in a test:
```javascript
	beforeEach(module('agile.fixtures'));
```
 ... and then inject (in the sample case of /featureA/featureA.json): 
```
fixturefeatureAfeatureA
```
as a value object.  (OK - so the names are sort of funky.  They are created from the directory structure and need to be proper JavaScript variables.)  You can then reference the injected item as the original JSON object. 

### Karma
Leave this folder alone.  It is configuration to run unit tests and unit test coverage.

### Server
Leave this folder alone until you're comfortable with node and node Express.
It provides a static web server on port 3444.   This is configurable in /server/config.js.

It allows us to control the behavior of GET and POST (not set up yet for PUT, etc).


### Src
Source code for the app.

### Vendor
Vendor libraries that have the option of being included in the build.
This is completely managed by **bower**, and should not normally be checked into source control.

### Other files @ root
	
- .bowercc - bower settings
- .gitignore
- .jscsrc - JSCS settings.  We use a very slightly modified Google standard for style.  Each IDE will have a set-up that will allow code to comply with the JSCS settings.
- .jshintrc
- bower.json - external libraries that we will load into **vendor** directory
- gulpfile.js - our Gulp tasks.
- package.json - needed by our build tasks for anti-caching and app name.  Set those up.   It also identifies all the node modules we use in our Gulp work flow.
- README.md - this file
- TODO.md - picks up todo, hacks keywords in code.

## Source File Organization
This project uses a **modified feature** organization.  Features (usually corresponding to major UI views or portions) are organized by folder.  Within the folder, we expect 1 module that lists all dependencies.  This trick means we have to ensure *.module.js* files are built before files that share the same module name.

We have a common folder for shared elements that might be used in many features: domain models, services, filters, common directives, etc.

We follow the style guide at [https://github.com/agilethought/angularjs-styleguide](https://github.com/agilethought/angularjs-styleguide)

We're always looking to learn from past projects, so issue a pull request!


## Gulp Tasks
The engine that automates the developer workflow is a fluid set of tasks found in the gulpfile.js.
Once you're comfortable with node and gulp, you can add to the stack.

Here are a few notable tasks:
### gulp (default)
This is the task you should run while you are writing code.  This task
- injects an environment constant,
- converts all templates to .js,
- converts LESS (or SASS) to CSS, 
- organizes all files,
- builds the index.html file (cloning the directory structure, so debugging is easy in the browser), 
- does style checking and linting, 
- sets up an Express server in node to serve up your site, and mock api calls (if desired),
- and sets **a watch** on any changes to .js, .less or .html files.

When **a watch** is triggered, appropriate parts of the application are re-built (from the list above), and the Express server is told to do a live-reload (with debouncing).  Live reload is fantastic, as changes to styles instantly appear, and changes to markup get an auto-refresh.

Whew!  That's a ton of automation!!!

### gulp fixtures
This is the short task that converts JSON files into .js fixtures for testing.

### gulp karma-coverage
I can't guarantee this is fully functioning, but its supposed to produce a code coverage report for unit tests.

### gulp build-dev
This builds a deploy-able version of the application, dropping the package in /dev.  It uses the "dev" ngConstants to build in an API base route, and creates the files with a version number to ensure cache is busted.  All code is concatenated, annotated, wrapped in IIFE, and then minified and uglifed.  Debug and compile information is typically turned off.

### gulp bump
This bumps the version number (in your bower.json and package.json files).  Do this before each deploy so the version is baked into the deployment, and forces cache-busting for css and js files.

You might want to add a task for other target deployments.

## Testing
We love tests, don't we?  We like to have unit tests covering near 100% of all models in the app.
You can find patterns and practices for writing tests in the [Yammer Angular Patterns and Practices](https://www.yammer.com/agilethought.com/#/threads/inGroup?type=in_group&feedId=4015918).

Place test files in the same folder as the file you are testing, and call it the same, except with a **.spec.js** suffix.  The build process will remove .spec files from the list of files that get run by Express.
