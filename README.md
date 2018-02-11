# LIFE DASHBOARD

[Electron README](./electron/README.md)

## Getting started
#### Install rabbitmq
Install rabbitmq with
```
brew update
brew install rabbitmq
```
Then start the server with
```
rabbitmq-server
```
**NOTE:** You may need to add  ```export PATH="/usr/local/sbin:$PATH"``` to your .bash_profile in order to run this command

#### Run the API scripts
For electron:
```
./electron/api.js
```
For python *(from /services/)*:
```
source venv/bin/activate
./index.py
```

## Project Structure
```
- app       # the electron project - hosts the webpack app
- auth      # the main auth scripts for accounts
- config    # various config files and constants
- react     # the react app
- services  # python scripts for data analysis
- static    # where the webpack bundle is generated
- venv      # the python virtualenv
```

## Architecture
There are two parts to the app the electron app (frontend) and the python end (backend). These two entities communicate via rabbitmq which can is initialised and channel name 'main is declared'.

A request from electron is represented:
```
ch.sendToQueue(
    name,
    message,
    {
        correlationId:
        replyTo: q.queue
    }
)
```
