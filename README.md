pomodoro-timer
===

## Assignment

Create a Pomodoro timer and a task list to use for completing
work. The pomodoro timer will follow the classic pattern of 4 rounds
of 25 minutes with a 3-5 minute break and then after 4 rounds a break
of 15-30 minutes. Additionally a task list will also be available for
tracking the work that needs to be completed.

### Assumptions

* The Application is a single-user application and information does not need to be shared with anyone else.
* The Developer has full discretion on the user experience and interface.
* The code must be checked in to a public GitHub repository.

### User Story

1. As a user, I must be able to easily start the timer.
2. As a user, I must be alerted when there is no more time left on the timer.
3. As a user, I must be able to view the remaining time of the timer.
4. As a user, I must be able to add an item to a todo list.
5. As a user, I must be able to complete an item on a todo list.

### User interaction and design

It is up the discretion of the developer how the user will interact with this application. Potential types of user experiences could be an Alexa Skill, Web Page, Mobile Application, API, or Console Application.


## Getting Started

After cloning the repository...

```
  % cd pomodoro-timer
  % npm i
  % npm start
```

## Build

```
  % npm run build
```

This will drop build artifacts into the `dist/` directory.

## Tests

Testing is not complete, but there are a couple of unit and integration tests which may all be run with:

```
$ npm test
```

## CAVEATS

* This application plays sound.
* If you background your browser (e.g. by switching to another desktop on a Mac), the timer will stop. The only way to get reliable timing is to leave the browser in the foreground or at least work on the same desktop. This is a fundamental problem with running apps in browsers--when the browser is backgrounded, all JavaScript code grinds to a halt.
* The timer is greatly accelerated (1 minute = 1 second of real time) so that it's not so painful to verify that the application meets the task requirements.
* It's not really clear what should happen when a task is marked as complete before the work timer runs out. It seems like maybe the work timer should stop and the break should start immediately, but I'm not sure...so I just let the work timer run out before taking a break. Think of it as a reward for getting stuff done quickly.

## TODO

Things I'd love to do but just don't have the time to tackle right now:

* Add jsdoc
* Complete unit & integration testing
* Add some UI testing via Cypress
* Add the ability to add, edit, delete, and rearrange tasks
* Add a control for setting the speed of the clock for testing purposes (a fast rate is currently hard-coded into the app)
* Pretty-up the UI (add progress bar, colors would be nice)
* Make UI responsive to browser size

## Author

Dan Kreft <dan@kreft.net>
