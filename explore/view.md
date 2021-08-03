# Viewing Functions and Applications

Having deployed functions to Oracle                                        Functions, you'll  typically want to view the functions you've deployed, along with other  functions in the same application and different applications. For  example, you might want to see:

- all the applications in a compartment
- details of the image for a given function

You can view applications and functions using the Console, the CLI, and the  API.

## Using the Console

To  view details of applications and functions deployed to Oracle                                        Functions using the Console:

1. Sign in to the Console as a functions developer.

2. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

3. Select the region you are using with Oracle                                        Functions. Oracle recommends that you use the same region as the Docker registry that's specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)). 

4. Select the compartment containing the applications and functions that you want to see information about.

   The **Applications** page shows all the applications in the compartment you selected.

5. Click the name of an application to see the functions within it.

   The **Functions** page shows details for all the functions within the application you selected, including:

   - the Docker image created for each function
   - when the function was last updated

6. Click the name of a function on the **Functions** page to see additional information about that function, including the values of timeout and memory configuration parameters.

## Using CLI Commands

To  view details of applications and functions deployed to Oracle                                        Functions using the CLI:

1. Log in to your development environment as a functions developer.

2. If you want to see details about applications, in a terminal window:

   - Enter the following command to see a simple list of applications:

     Command

```
fn list apps
```

For example:

```
$ fn list apps
			
acme-app
```

Enter the following command to see more detail about a particular application:

Command

- ```
  fn inspect app <app-name>
  ```

  For example:

  ```
  $ fn inspect app acme-app
  			
  {
      "annotations": {
          "oracle.com/oci/appCode": "fht7ns4mn2q",
          "oracle.com/oci/compartmentId": "ocid1.compartment.oc1..aaaaaaaaw______nyq",
          "oracle.com/oci/subnetIds": [
                  "ocid1.subnet.oc1.phx.aaaaaaaao..."
          ],
          "oracle.com/oci/tenantId": "ocid1.tenancy.oc1..aaaaaaaap...keq"
      },
      "created_at": "2018-07-13T17:54:34.000Z",
      "id": "ocid1.fnapp.oc1.phx.aaaaaaaaaf______r3ca",
      "name": "acme-app",
      "updated_at": "2018-07-13T17:54:34.000Z"
  }
  ```

If you want to see details about functions, in a terminal window:

- Enter the following command to see a simple list of functions in a particular application:

  Command

```
fn list functions <app-name>
```

For example:

```
$ fn list functions acme-app
			
NAME            IMAGE
acme-func       phx.ocir.io/ansh81vru1zp/acme-repo/acme-func:0.0.3
acme-func-dev   phx.ocir.io/ansh81vru1zp/acme-repo/acme-func-dev:0.0.7
acme-func-test  phx.ocir.io/ansh81vru1zp/acme-repo/acme-func-test:0.0.6
```

Enter the following command to see more detail about a particular function:

Command

1. - ```
     fn inspect function <app-name> <function-name>
     ```

     For example:

     ```
     $ fn inspect function acme-app acme-func
     
     {
         "annotations": {
             "fnproject.io/fn/invokeEndpoint": "https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke",							
             "oracle.com/oci/compartmentId": "ocid1.compartment.oc1..aaaaaaaaw______nyq"
         },
         "app_id": "ocid1.fnapp.oc1.phx.aaaaaaaaaf______r3ca",
         "created_at": "2018-07-26T12:50:53.000Z",
         "format": "default",
         "id": "ocid1.fnfunc.oc1.phx.aaaa____uxoa",
         "image": "phx.ocir.io/ansh81vru1zp/acme-repo/acme-func:0.0.3",
         "memory": 128,
         "name": "acme-func",
         "timeout": 30,
         "updated_at": "2018-07-26T13:59:18.000Z"
     }
     ```

## Using the API

For information about using the API and signing requests, see [REST APIs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/usingapi.htm#REST_APIs) and [Security Credentials](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/credentials.htm#Security_Credentials). For information about SDKs, see [Software Development Kits and Command Line Interface](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdks.htm#Software_Development_Kits_and_Command_Line_Interface).

Use these API operations to see details about applications and functions:

- [ListApplications](https://docs.oracle.com/iaas/api/#/en/functions/latest/ApplicationSummary/ListApplications)
- [ListFunctions](https://docs.oracle.com/iaas/api/#/en/functions/latest/FunctionSummary/ListFunctions)