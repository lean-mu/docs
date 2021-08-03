
# Concepts

## Functions

This is the actual piece of code thar runs your logic and gets executed.

Functions provide:

- small but powerful blocks of code that generally do one simple thing well
- invoked in response to a trigger, typically a CLI command or HTTP request
- grouped into applications

When you deploy a function they are packaged as an image and pushed to a specified Docker registry.
The function definition is stored in the Mu platform, this metadata describes how the function is to be executed and includes:

- the Docker image to pull when the function is invoked
- the maximum length of time the function is allowed to execute for
- the maximum amount of memory/cpu the function is allowed to consume

## Applications

Apps are a way to logically group functions and triggers under the same name.

An application is

- a way to allocate and configure resources for all functions in the application
- a common context to store configuration variables that are available to all functions in the application
- a way to ensure function runtime isolation

When you define an application, you specify whether to enable logging and observability for the functions in the application.

When functions from different applications are invoked simultaneously, the Mu platform ensures these function executions are isolated from each other.

## Invocations

A function's  code is executed when the function is called (or invoked). There are different ways to invoke a deployed function:

- From the command line using the CLI.
- From code using the function's SDKs.
- From a signed HTTP requests to the function's invoke endpoint. Every function has an invoke endpoint.
- From a signed event typically origination from an internal queue (for example, triggered by the scheduler or by the async workers)

When a function is invoked for the first time, the Mu platform pulls the function's Docker image from the specified Docker registry, runs it as a Docker container, and executes the function. If there are subsequent  requests to the same function,  requests are directed to the same container. The docker container is removed once the function reaches some predefined idle timeouts.

## Triggers

A Trigger represents an entry point for function invocations. There are different ways to invoque a function, each  requires specific configuration. Tigger configuration is defined within the func.yaml file, as specified in [the func file](../deepdive/reference/funcfile.md).

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

Configures a time scheduler for function invocation. The format follows the crontab format.
TODO: explain the format

```
name: myTimeTrigger
type: scheduled
format: * * 12 45
```

## Context

The Fn context is a client side term used to reference a set of environment configurations. A context is identified by a name (typically the environment name: development, testing, prod), a URL pointing to the referenced Mu cluster and the location of the docker registry.

The client can configure multiple contexts, however only one can be used at any given time.

## Extensions

Extensions offer the preferred way to enrich the core platform. There are basically 3 types of extensions:

1. **Listeners** — listen to API lifecycle events such as a route update and allows to implement an action.
2. **Middleware** — a chain of middleware is executed before a function (or API) is called.
3. **Control plane APIs** — allows to extend the default API with new endpoints.

## FDK

Function Development Kits (FDKs) are images bundling a set of helper libraries that handle the system internals
automatically and make function development easier. Mu has FDKs for popular languages - Java, Node.js, Python, Go, and Ruby.

