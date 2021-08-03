
#DEBUG HEADERS
# Debug HTTP Headers with the Fn CLI
# Use DEBUG=1 for Client Commands

If you're interacting with functions via the `fn` CLI, you can enable debug
mode to see the full details of the HTTP requests going to the Fn server and
the responses. The `fn` CLI simply wraps the Fn API to make it easier to
manage your applications and functions. You can always use `curl` but the CLI
is much more convenient!

You enable debug mode by adding `DEBUG=1` before `fn` on each command.  For
example try the following:

>```sh
> DEBUG=1 fn ls apps
>```

Which, with debugging turn on, returns the following:

```sh
GET /v2/apps HTTP/1.1
Host: localhost:8080
User-Agent: Go-http-client/1.1
Accept: application/json
Accept-Encoding: gzip


HTTP/1.1 200 OK
Content-Length: 977
Content-Type: application/json; charset=utf-8
Date: Sun, 13 Oct 2019 16:45:56 GMT


{"items":[{"id":"01DQ2STN6KNG8G00GZJ000001Q","name":"tutorial","syslog_url":"tcp://logs3.papertrailapp.com:NNNN","created_at":"2019-10-13T14:54:45.459Z","updated_at":"2019-10-13T15:55:50.628Z"}]}
NAME		ID
tutorial	01DQ2STN6KNG8G00GZJ000001Q
```

All debug output is written to stderr while the normal response is written
to stdout so it's easy to capture or pipe either for processing.



##DEBUG-LOGLEVEL
# Enable DEBUG log-level on the Fn Server

# Log to Fn Server Terminal Window with DEBUG
When working with Fn locally, you have the option to turn on the DEBUG log-level using the `fn start` command. This causes detailed information about functions to be output to the terminal after Fn server is started.

To enable DEBUG logging for Fn server, restart the server with the following command:

>```sh
> fn start --log-level DEBUG
>```

```sh
2019/12/19 09:26:27 ¡¡¡ 'fn start' should NOT be used for PRODUCTION !!! see https://github.com/fnproject/fn-helm/
time="2019-12-19T16:26:28Z" level=info msg="Setting log level to" fields.level=DEBUG
...
```
Notice in the first couple of messages state that the log level is set to DEBUG.

Here is an example of the kind of output generated when a Runtime Exception is encountered with Java.
```sh
time="2019-12-19T16:27:55Z" level=debug msg="Caused by: java.lang.RuntimeException: Something went horribly wrong! ...\n" action="server.handleFnInvokeCall)-fm" app_id=01DWFFR290NG8G00GZJ0000001 call_id=01DWFFS7QZNG8G00GZJ0000003 fn_id=01DWFFRQVQNG8G00GZJ0000002 image="fndemouser/trouble:0.0.2" user_log=true
time="2019-12-19T16:27:55Z" level=debug msg="    at com.example.fn.HelloFunction.handleRequest(HelloFunction.java:7)\n" action="server.handleFnInvokeCall)-fm" app_id=01DWFFR290NG8G00GZJ0000001 call_id=01DWFFS7QZNG8G00GZJ0000003 fn_id=01DWFFRQVQNG8G00GZJ0000002 image="fndemouser/trouble:0.0.2" user_log=true
```
A Runtime Exception was thrown on line 7 of the HelloFunction.

Running the Fn server with the DEBUG log level is a great way to track down any issues you are having with your functions.

