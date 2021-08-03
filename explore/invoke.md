# Invoking Functions

You can invoke a function that you've deployed  to Oracle                                        Functions in different ways:

- Using the CLI.
- Making a HTTP request to the function's invoke endpoint. Every function has an invoke endpoint.

Each of the above invokes the function via requests to the  API.  Any request to the  API must be authenticated by including a  signature and the OCID of the compartment to which the function belongs  in the request header. Such a request is referred to as a 'signed'  request. The signature includes Oracle Cloud                                        Infrastructure credentials in an encrypted form.

 If you use the CLI or the Oracle Cloud                                        Infrastructure CLI to invoke a function, authentication is handled for you. See [Using the CLI to Invoke Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsinvokingfunctions.htm#usingfncli) and [Using the Oracle Cloud Infrastructure CLI to Invoke Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsinvokingfunctions.htm#usingocicli).

If you use an Oracle Cloud                                        Infrastructure SDK to invoke a function, you can  use the SDK to handle authentication. See [Using SDKs to Invoke Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsinvokingfunctions.htm#usingsdks).

If you make a signed HTTP request to a function's invoke  endpoint, you'll have to handle authentication yourself by including a  signature and the OCID of the compartment to which the function belongs  in the request header. You can do this in different ways:

- Using the Oracle Cloud                                        Infrastructure CLI `raw-request` command. See [Sending a Signed Request to a Function's Invoke Endpoint (using the Oracle Cloud Infrastructure CLI raw-request command)](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsinvokingfunctions.htm#rawrequestinvoke).
- Writing code to programmatically sign requests. For  information about the required credentials and how to sign the requests, see [Request Signatures](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/signingrequests.htm#Request_Signatures). 



 **Tip**

 If you aren't able to successfully complete one of the steps in this topic, review the solutions for common problems (see [Troubleshooting Oracle Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionstroubleshooting.htm#Troubleshooting_Oracle_Functions)).

## Using the CLI to Invoke Functions

To invoke a function deployed to Oracle                                        Functions using the CLI:

1. Log in to your development environment as a functions developer.

2. In a terminal window, enter:

   Command

```
fn invoke <app-name> <function-name>
```

where:

- `<app-name>` is the name of the application containing the function you want to invoke                    
- `<function-name>` is the name of the function you want to invoke                    

For example:

Command

```
fn invoke helloworld-app helloworld-func
```

Output:

```
Hello World !
```



 **Tip**



If you want to pass arguments and values to a function, prefix the `fn invoke` command with `echo -n '<argument>=<value>' |`

 If the function is expecting the argument and value as JSON, use a valid JSON format. For example:

Command

1. ```
   echo -n '{"name":"John"}' | fn invoke helloworld-app helloworld-func
   ```

   Output:

   ```
   Hello John !
   ```

## Using the Oracle Cloud Infrastructure CLI to Invoke Functions

If you have installed the Oracle Cloud                                        Infrastructure CLI, you can use it to send API requests to invoke functions. Among other things, the Oracle Cloud                                        Infrastructure CLI will facilitate Oracle Cloud                                        Infrastructure authentication. For information about using the Oracle Cloud                                        Infrastructure CLI, see [Command Line Interface (CLI)](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm#Command_Line_Interface_CLI).

These instructions assume:

- you have already installed and configured the Oracle Cloud                                        Infrastructure CLI
- you want to invoke a function as the functions developer that's configured for your development environment

To invoke a function using the Oracle Cloud                                        Infrastructure CLI:

1. Log in to your development environment as a functions developer.

2. In a terminal window, enter:

   Command

```
oci fn function invoke <function-ocid> --file "<output-filepath>" --body "<request-parameters>"
```

where:

- `<function-ocid>` is the OCID of the function you want to invoke. To find out a function's OCID, use the `fn inspect` command to see the value of the function's `id` property (see [Viewing Functions and Applications](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsviewingfunctionsapps.htm#Viewing_Functions_and_Applications)).                        
- `<output-filepath>` is the path and name of a file to write the response to. To write the response to stdout, specify `--file "-"`
- `<request-parameters>`    are optionally arguments and values to pass to the function. If the  function is expecting arguments and values as JSON, use a valid JSON  format. For example, `--body '{"name":"John"}'`. Note that you must include ` --body ""` in the request, even if there are no request parameters to pass.

For example:

- Command

```
oci fn function invoke --function-id ocid1.fnfunc.oc1.phx.aaaa____uxoa --file "-" --body ""
```

Output:

```
Hello World !
```

Command

1. - ```
     oci fn function invoke --function-id ocid1.fnfunc.oc1.phx.aaaa____uxoa --file "-" --body '{"name":"John"}'
     ```

     Output:

     ```
     Hello John !
     ```

## Using SDKs to Invoke Functions

If you're writing a program to invoke a function in a language for which an Oracle Cloud                                        Infrastructure  SDK exists, Oracle recommends you use that SDK to send API requests to  invoke the function. Among other things, the SDK will facilitate Oracle Cloud                                        Infrastructure authentication.

For information about using the API and signing requests, see [REST APIs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/usingapi.htm#REST_APIs) and [Security Credentials](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/credentials.htm#Security_Credentials). For information about SDKs, see [Software Development Kits and Command Line Interface](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdks.htm#Software_Development_Kits_and_Command_Line_Interface).

Use the [InvokeFunction](https://docs.oracle.com/iaas/api/#/en/functions/latest/Function/InvokeFunction) API operation to invoke functions.

## Obtaining a Function's Invoke Endpoint

When invoking a function using the Oracle Cloud                                        Infrastructure CLI                `raw-request` command, you have to specify the function's invoke            endpoint.

To obtain a function's invoke endpoint:

1. Log in to your development environment as a functions developer.

2.  In a terminal window, enter:

   Command

```
fn inspect function <app-name> <function-name>
```

where:

- `<app-name>` is the name of the application containing the function for which you want to obtain the invoke endpoint                    
- `<function-name>` is the name of the function for which you want to obtain the invoke endpoint                    

For example:

Command

1. ```
   fn inspect function helloworld-app helloworld-func
   ```

   Output:

   ```
   {
      "annotations": {
   		"fnproject.io/fn/invokeEndpoint": "https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke",
   
   ...
   }
   ```

   The function's invoke endpoint is the value of `"fnproject.io/fn/invokeEndpoint"` . For example, `"https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke"` (abbreviated for readability).

## Sending a Signed Request to a Function's Invoke Endpoint (using the Oracle Cloud Infrastructure CLI raw-request command)

If you have installed the Oracle Cloud                                        Infrastructure CLI, you can use it to send API requests to invoke functions. Among other things, the CLI will facilitate Oracle Cloud                                        Infrastructure authentication. For more information about using the Oracle Cloud                                        Infrastructure CLI, see [Command Line Interface (CLI)](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm#Command_Line_Interface_CLI).

These instructions assume:

- you have already installed and configured the Oracle Cloud                                        Infrastructure CLI
- you want to invoke a function as the functions developer that's configured for your development environment

To invoke a function deployed to Oracle                                        Functions by sending a signed request to the function's invoke endpoint using the Oracle Cloud                                        Infrastructure CLI `raw-request` command:

1. Log in to your development environment as a functions developer.

2. Obtain the function's invoke endpoint (see [Obtaining a Function's Invoke Endpoint](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsinvokingfunctions.htm#obtainingendpoint)).

   For example, `"fnproject.io/fn/invokeEndpoint":  "https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke"` (abbreviated for readability).

3. Use the Oracle Cloud                                        Infrastructure CLI `raw-request` command to invoke the function by sending a signed POST request to the function's invoke endpoint by entering:

   Command

```
oci raw-request --http-method POST --target-uri <invoke-endpoint> --request-body "<request-parameters>"
```

where:

- `<invoke-endpoint>` is the endpoint you obtained in the earlier step.
- `<request-parameters>`  are optionally arguments and values to pass to the function.  If the  function is expecting arguments and values as JSON, use a valid JSON  format.  Note that you must include ` --request-body ""` in the request, even if there are no request parameters to pass.

For example:

- Command

```
oci raw-request --http-method POST --target-uri https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke --request-body ""
```

Output:

```
Hello World !
```

Command

- ```
  oci raw-request --http-method POST --target-uri https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke --request-body '{"name":"John"}'
  ```

  Output:

  ```
  Hello John !
  ```

Assuming a passphrase was provided to encrypt the API  signing key (as recommended by Oracle), enter the passphrase when  prompted.