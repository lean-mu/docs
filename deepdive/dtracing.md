# Distributed Tracing for Functions

When a function is invoked but doesn't run or perform as expected, you need to            investigate the issue at a detailed level. The distributed tracing feature observes the            function's execution as it moves through the different components of the system. You can            trace and instrument standalone functions to debug execution and performance issues. You            can also use function tracing to debug issues with complete serverless applications            comprising multiple functions and services, such as:

- a function calling another function
- a function calling other services such as the Object Storage service
- a function that serves as a backend for an API gateway deployed in the API Gateway service
- a function triggered in response to an event by the Events service, Notifications service, or Service Connector Hub

The Oracle                                        Functions tracing capabilities are            provided by the Oracle Cloud                                        Infrastructure Application Performance Monitoring service. Features in                Application Performance Monitoring (APM) enable you            to identify and troubleshoot failures and latency issues in the functions you create and            deploy.

In the Application Performance Monitoring service:

- An APM domain contains the systems monitored by Application Performance Monitoring. An APM domain is                an instance of a collector of trace and span data which stores, aggregates,                displays, and visualizes the data.
- A trace is the complete flow of a request as it passes through all the components of                a distributed system in a given time period. It consists of an entire tree of spans                all related to the same single overall request flow.
- A span is an operation or a logical unit of work with a name, start time, and                duration, within a trace. A span is a time segment associated with the duration of a                unit of work within the overall request flow.

The Application Performance Monitoring Trace Explorer            enables you to visualize the entire request flow and explore trace and span details for            diagnostics. You can view and monitor slow traces and traces with errors. To isolate and            identify trace issues, you can drill down into specific spans, such as page loads, AJAX            calls, and service requests. For more information about the Application Performance Monitoring service, see [Application Performance                 Monitoring](https://docs.oracle.com/iaas/application-performance-monitoring/index.html).

To enable tracing for a function, you must:

1. Set up a policy to give the Oracle                                        Functions                service permission to access APM domains, if the policy does not exist already (see                    [Policy Statements to Give Oracle Functions Users and the Oracle Functions Service Access to Tracing Resources](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatingpolicies.htm#usertracingpolicy)). 
2. Set up an APM domain.
3. Enable tracing for the Functions application and select the APM domain you                created.
4. Enable tracing for one or more functions.

When you enable tracing for a function, Oracle                                        Functions automatically generates a "default            function invocation span." The default span captures information about the function's            execution context including the overall time taken to process the request and return a            response to the caller. In addition to the default function invocation span, you can add            code to functions to define custom spans. Use custom spans to capture more            function-specific information to help with debugging. For example, you might define            custom spans to capture the start and end of specific units of work. For example, units            of work could include getting the database password from the Vault, opening a database            connection, and retrieving records from the database.

Four variables have been added to the Oracle                                        Functions context that provide helpful tracing information. These variables include:

- `FN_APP_NAME:` The function application name.

- `FN_FN_NAME:` The function name.

- `OCI_TRACE_COLLECTOR_URL`: The APM domain URL with data key.

- ```
  OCI_TRACING_ENABLED:
  ```

   Is tracing enabled?

  - When retrieved from environment variables, returns 0 or 1.
  - When retrieved from the function context, returns `true` or                            `false` as appropriate for the language used.

## Required IAM Policy for Enabling Tracing

Before you can enable tracing, the group to which you belong must have permission to                access existing APM domains or to create APM domains. In addition, Oracle                                        Functions must have permission to access                APM domains. See [Policy Statements to Give Oracle Functions Users and the Oracle Functions Service Access to Tracing Resources](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatingpolicies.htm#usertracingpolicy).

## Using the Console to Enable Tracing and View Function Traces

A couple of steps are required to enable tracing and to view function traces for the Oracle Cloud                                        Infrastructure Application Performance Monitoring (APM) service. First,            enable tracing for the application containing the function. Then, enable tracing for one            or more functions. You can then view function traces in the APM Trace Explorer.

### Using the Console to Enable Tracing

To enable tracing, follow these steps.

1. Sign in to the Console as a functions developer.

2. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

3. Select the region and compartment containing the Functions application. 

   The                            **Applications** page shows all the applications in the compartment                        you selected.

4. Select the Functions application for which you want to enable tracing.

5. To enable tracing for the application:

   1. Under **Resources**, click **Traces**.

   2. Select the 

      Trace Enabled

       option and specify:

      - **Compartment:** The compartment in which to create the                                    trace. By default, the current compartment.

      - APM Domain:

         The APM domain (defined in the 

        Application Performance Monitoring

         service) in which to create the trace. To use an existing APM                                    Domain, select an existing APM domain from the list. Or, to                                    create a new APM domain, click 

        APM Domain

        . For more                                    information about APM domains, see 

        Getting Started with Application Performance                                        Monitoring

        . 

        

1. 1. -  **Note**

         The APM Domain **needs to have                                            both public** and **private data keys** for                                        function tracing to work. If the keys do not exist, you can                                        create them through the console interface.

   2. Click **Enable Trace** to enable tracing for the application.

   Having enabled tracing for the Functions application, you can now enable                        tracing for one or more functions in the application.

2. To enable tracing for specific functions in the application:

   1. Under **Resources**, click **Functions**.

   2. Select the **Enable Trace** option beside one or more function(s)                                for which you want to enable tracing. 

      The **Enable Trace** option is only shown if you have previously                                enabled tracing for the application. Note the following:

      - If the **Enable Trace** option is not shown, you must enable                                    tracing for the application. If you haven't already enabled                                    tracing for the application, see the previous step.
      - If you previously enabled tracing for the application but later                                    disabled it, an **Enable application tracing** link is shown.                                    Click the **Enable application tracing** link to re-enable                                    tracing for the application (see the previous step). Having                                    re-enabled tracing for the application, you can then enable                                    tracing for specific functions.

When you have enabled tracing for the application and one or more functions, you can                view function traces.

### Using the Console to View Function Traces

To view the traces for functions that have tracing enabled:

1. Sign in to the Console as a functions developer.

2. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

3. Select the region and compartment containing the Functions application with                    functions for which you want to view function traces. 

   The **Applications**                        page shows all the applications in the compartment you selected.

4. Select the application containing the functions for which you want to view                    traces.

5. To see traces for functions:

   1. To see traces for all the functions that have tracing enabled in the                                application:

      1. Under **Resources**, click **Traces**.

      2. Click the name of the trace. 

         

1.  **Note**

    A trace name is only shown if                                        you have already enabled tracing for the                                    application.

To see the trace for a specific function that has tracing enabled: 

1. Under **Resources**, click **Functions**.

2. Click the Actions icon (three dots) beside the function, and                                    then click 

   View Trace

   .

   

1. 1. 1.  **Note**

          The **View Trace** option                                        is only shown if you have already enabled tracing for the                                        function.

   The traces for the functions you selected are shown in the APM Trace                        Explorer. By default, a trace is shown for the default function invocation                        span, and any custom spans defined for the function.

2. In the APM Trace Explorer:

   1. Click a trace to see the spans for that trace.
   2. Click a span to see the details captured for that span.

   For more information about using the APM Trace Explorer, see [Use Trace                             Explorer](https://docs.oracle.com/iaas/application-performance-monitoring/doc/use-trace-explorer.html).

## Tracing a Chain of Functions

By default, function tracing provides a trace for an entire function invocation. However,            often with modern cloud applications, you need to chain function invocations. OCI            Functions tracing provides the ability trace the execution of a function invoked by            another function. This ability means you can examine the execution of each function in a            chain of calls in a single tree of spans in APM trace explorer.

To trace a chain of functions, you need to propagate the X-B3 headers `X-B3-TraceId`, `X-B3-SpanId`, `X-B3-ParentSpanId`, and `X-B3-Sampled` in the function invocation request from your function code.

After the function has run, the trace data from your functions is collected and available            in APM Trace Explorer. For more information about using the APM Trace Explorer, see                [Use Trace                 Explorer](https://docs.oracle.com/iaas/application-performance-monitoring/doc/use-trace-explorer.html).



[Tracing a Chain of Functions with Python](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionstracing.htm#)

## Adding Custom Spans to Functions

With function tracing enabled, the default function invocation span provides a trace for            the entire function invocation. The default span can provide good information, but when            investigating your code you might want to dig deeper. Custom spans are added directly to            your code and allow you to define spans for a method or a block of code. The resulting            data provides a better picture of your function as it runs.

Before you can use custom spans, you must enable tracing for your application and            functions using the Oracle Cloud                                        Infrastructure Application Performance Monitoring (APM) service. To set            up tracing, you must: 

1. Set up a policy to give the Oracle                                        Functions                service permission to access APM domains, if the policy does not exist already (see                    [Policy Statements to Give Oracle Functions Users and the Oracle Functions Service Access to Tracing Resources](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatingpolicies.htm#usertracingpolicy)). 
2. Set up an APM domain.
3. Enable tracing for the Functions application and select the APM domain you created.
4. Enable tracing for one or more functions.

These steps have already been covered. However, a couple more things are required            for custom spans:

- Select a distributed tracing client library, for example Zipkin.
- Add client libraries to your function dependencies.
- In your function code, use the `OCI_TRACING_ENABLED` function context variable to check if tracing is enabled.
- In your function code, use the `OCI_TRACE_COLLECTOR_URL` function context variable to send your custom spans to your APM domain.
- Add instrumentation to your function code.



 **Note**



To use custom spans, you must have the following minimum versions of the Fn Project FDKs:

- Java FDK: 1.0.129
- Python FDK: 0.1.22
- Node FDK: 0.0.20

[Adding Custom Spans to Java Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionstracing.htm#)

[Adding Custom Spans to Python Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionstracing.htm#)

[Adding Custom Spans to Node Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionstracing.htm#)

## Using the API

For information about using the API and signing requests, see [REST APIs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/usingapi.htm#REST_APIs) and [Security Credentials](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/credentials.htm#Security_Credentials). For information about SDKs, see [Software Development Kits and Command Line Interface](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdks.htm#Software_Development_Kits_and_Command_Line_Interface).

Use these API operations to enable and disable tracing for applications and the functions            they contain:

- [CreateApplication](https://docs.oracle.com/iaas/api/#/en/functions/latest/Application/CreateApplication)
- [UpdateApplication](https://docs.oracle.com/iaas/api/#/en/functions/latest/Application/UpdateApplication)
- [CreateFunction](https://docs.oracle.com/iaas/api/#/en/functions/latest/Function/CreateFunction)
- [UpdateFunction](https://docs.oracle.com/iaas/api/#/en/functions/latest/Function/UpdateFunction)