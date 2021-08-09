
# Concepts

Let's first introduce the basic Mu concepts:

## Functions

This is the actual piece of code thar runs your logic and gets executed.

Functions provide a small but powerful blocks of code that generally do one simple thing well.
They are invoked in response to a trigger, typically a CLI command, HTTP request, event or timer.
Functions are typically bundled into applications to simplify their functional grouping and configuration.

When you deploy a function they are packaged as an image and pushed to a specified Docker registry.
The function metadata is stored in the Mu platform, this definition describes how the function is to be executed and includes:

- the Docker image to pull when the function is invoked
- the maximum length of time the function is allowed to execute for
- the maximum amount of resources (memory/cpu) the function is allowed to consume

## Applications

Apps are a way to logically group functions and triggers under the same name.

An application is

- a way to allocate and configure resources for all functions in the application
- a common context to store configuration variables that are available to all functions in the application
- a way to ensure function runtime isolation

When you define an application, you specify whether to enable logging and observability for the functions in the application.

When functions from different applications are invoked simultaneously, the Mu platform ensures these function executions are isolated from each other.

## Invocations

A function's  code is executed when the function is called (or invoked). There are different ways to invoke a deployed function, for instance:

- From the command line using the CLI.
- From an HTTP requests to the function's invoke endpoint. Every function has an invoke endpoint.
- From code using the function's SDKs.
- From an event typically origination from an internal queue (for example, triggered by the scheduler or by the async workers)

When a function is invoked for the first time, the Mu platform pulls the function's Docker image from the specified Docker registry, runs it as a Docker container, and executes the function. If there are subsequent  requests to the same function,  requests are directed to the same container for optimization. The docker container is first paused and then removed once the function reaches some predefined idle timeouts.

## Triggers

A Trigger represents an entry point for function invocations. There are different ways to invoque a function, each  requires specific configuration. Trigger configuration is defined within the `func.yaml` file, as specified in [the func file format](../deepdive/reference/funcfile.md).

A function might not be associated with any triggers, or it can be associated with one or multiple triggers.

### http

Configures a http endpoint for function invocation.

```
name: myHttpTrigger
type: http
source: /trigger-path
```

This will cause the system to route requests arriving at the fn service at `/trigger-path` to the function specified in the func.yaml file.

### event

Configures an event based endpoint. message are dequeued from the topic and passed to the function.

```
name: myEventTrigger
type: event
topic: asyncProcessor
```

### scheduled

Configures a time scheduler for function invocation.

```
name: myTimeTrigger
type: scheduled
format: * * 12 45 *
```

The format follows the simple but powerfull crontab syntax as described below:

```
*     *     *     *     *        

^     ^     ^     ^     ^
|     |     |     |     |
|     |     |     |     +----- day of week (0-6) (Sunday=0)
|     |     |     +------- month (1-12)
|     |     +--------- day of month (1-31)
|     +----------- hour (0-23)
+------------- min (0-59)
```

#### Examples

`* * * * *` run on every minute  
`10 * * * *` run at 0:10, 1:10 etc  
`10 15 * * *` run at 15:10 every day  
`* * 1 * *` run on every minute on 1st day of month  
`0 0 1 1 *` Happy new year schedule  
`0 0 * * 1` Run at midnight on every Monday  

#### Lists

`* 10,15,19 * * *` run at 10:00, 15:00 and 19:00  
`1-15 * * * *` run at 1, 2, 3...15 minute of each hour  
`0 0-5,10 * * *` run on every hour from 0-5 and in 10 oclock  

#### Steps
`*/2 * * * *` run every two minutes  
`10 */3 * * *` run every 3 hours on 10th min  
`0 12 */2 * *` run at noon on every two days  
`1-59/2 * * * *` run every two minutes, but on odd minutes


## Context

Contexts provides a way to carry meta data to different parts of the systems.

There are two types of contexts in Mu:

* the CLI context - is a client side term used to reference a set of environment configurations. A context is identified by a name (typically the environment name: "development", "testing", "prod"), a URL pointing to the targeted Mu cluster and the location of the docker registry. A client can configure multiple contexts, however only one can be used at any given time.
* the runtime context - is metadata information passed along each function's invocation. It contains information about the runtime environment and suroundings.

## Extensions

Extensions offer a way to enrich the core platform. There are basically 3 types of extensions:

1. **Listeners** — which listen to API lifecycle events such as a route update and allows to implement an action.
2. **Middleware** — which define a chain of middleware executed before the function (or API) invocation.
3. **Control plane APIs** — which allow the extention of the default API with new endpoints.

## Function Development Kits

Function Development Kits (FDKs) are images bundling a set of helper libraries that handle the system internals automatically and make function development easier. Developers use FDKs to implement their own logic in one of the popular languages - Java, Node.js, Python, Go, and Ruby.

FDKs can be extended, or build from scratch to support additional languages.

