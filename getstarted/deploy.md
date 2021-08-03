# Deploying your first function

## Configuring the Fn Context

Before we start using Fn, we need to configure it. Typically, two key attributes are required: first the API endpoint (provided above), second the function's docker registry.

::: tip
For simplicity, we will assume you registered an account on dockerhub under the username 'myregistry'. But you could also point to your own repository URL.
When using a private repository, you will need to generate an access token and use it as follows (change key & username as required)
echo TOKEN | docker login --username myregistry --password-stdin
:::


```shell
$ fn create context mu --api-url=http://fn.mu.local/api --registry myregistry
$ fn us ctx mu
```

## Testing the installation

Let's verify everything is up and running correctly.
Open a new terminal, run the following command, it should give an output similar to:

```shell
$ fn version
Client version: X.X.XXX
Server version: X.X.XXX
```

The `Server version` is key - if it doesn't show a version nummber, you most likely have a connectivity issue.


## Deploying your first function

With Fn, functions can be written in a multitude of computer languages. In this quick start we will create a go function.

Functions are grouped by applications: let's create our first application.

```shell
$ fn create app first-app
Successfully created app: first-app
$ fn list apps
NAME        ID
first-app   01F8FHA4Z6NG8G00GZJ0000001
```

Next, create the function:

```shell
$ fn init --runtime go --trigger http first-fn
Creating function at: ./first-fn
Function boilerplate generated.
func.yaml created.
$ cd first-fn
$ ls
func.go
func.yaml
go.mod
```

## Deploy & invoke the function

Reviewing the code and structure will take a deeper dive, let us focus on deployment and invocation.
We will deploy the function with the following command, note how docker is liveraged behind the scene to build the function - the complexity is abstracted leaving the developer with easy to use environment.

```shell
$ fn --verbose deploy --app first-app
Deploying first-fn to app: first-app
Bumped to version 0.0.2
Building image first-fn:0.0.2
FN_REGISTRY: FN_REGISTRY is not set.
Current Context: default
....
=> exporting to image 0.0s
=> => exporting layers 0.0s
=> => writing image sha256:906e042d82f76af3790f5f67697109627d32a9935d56dcb4538687dda8e239ac 0.0s
=> => naming to docker.io/library/first-fn:0.0.2
```

Our function is now built and was uploaded to the registry.

At this point, you may have had an error - typically you will need to ensure proper write access to your registry.
With dockerhub, it's relatively simple. generate an access token and use it as follows (change key & username as required)
echo TOKEN | docker login --username myregistry --password-stdin

Next, let's invoke out function!

```shell
$ fn invoke first-app first-fn
{"message":"Hello World"}
$ echo -n '{"name":"John"}' |  fn invoke first-app first-fn
{"message":"Hello John"}
```

## Invoking functions from endpoints

Invoking function from the command line is great for testing and development.
Usually you will call a function from its URL.

```shell
$ fn inspect fn first-app first-fn
{
"annotations": {
"fnproject.io/fn/invokeEndpoint": "http://localhost:8080/invoke/01F8FTRA5BNG8G00GZJ0000001"
},
"app_id": "01F8FHA4Z6NG8G00GZJ0000001",
"created_at": "2021-06-18T15:10:14.187Z",
"id": "01F8FTRA5BNG8G00GZJ0000001",
"idle_timeout": 30,
"image": "myregistry/first-fn:0.0.6",
"memory": 128,
"name": "first-fn",
"timeout": 30,
"updated_at": "2021-06-18T15:10:14.187Z"
}
```

Now let's invoke the same function via http this time:

<CodeGroup>
<CodeGroupItem title="Curl">
  
```shell
$ curl -X "POST" -H "Content-Type: application/json" -d '{"name":"Bob"}' http://localhost:8080/invoke/01F8FTRA5BNG8G00GZJ0000001
{"message":"Hello Bob"}
```
  
</CodeGroupItem>
  
<CodeGroupItem title="Httpie" active>
  
```shell
$ http POST http://localhost:8080/invoke/01F8FTRA5BNG8G00GZJ0000001 name=Bob 
{"message":"Hello Bob"}
```
  
</CodeGroupItem>
</CodeGroup>
