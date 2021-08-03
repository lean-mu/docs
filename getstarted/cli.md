# Starting from the CLI

The instructions down below leverage Project Fn (a sub component of Mu) as a quick rampup.

## Before you begin

Before installing Fn you'll need:
1. A computer running Linux or MacOS.
2. A running local instance Docker 17.10 (or higher)

## Download and Install the CLI

For a MacOS Installation you can use Homebrew:

```shell
$ brew update && brew install fn
```

Or, alternatively for Linux/Unix/MacOS from a terminal type the following:

```shell
$ curl -LSs https://raw.githubusercontent.com/fnproject/cli/master/install | sh
Start the local Fn Server
```

Since Fn runs of Docker, please ensure it is up and running

To start the Fn server we use the command below. This will download the Fn server docker image and start the Fn Server on port 8080 by default. Note that this process runs in the foreground so that it is easy to stop with Ctrl-C:

```shell
$ fn start
```

You may also start fn in the background and with debug logs enabled

```shell
$ fn start --log-level DEBUG &
```
