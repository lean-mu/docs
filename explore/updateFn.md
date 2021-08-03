# Updating Functions

Having previously created a function definition, you can change some, but not all, of the function's properties. For example, you can change the maximum length of time a function is allowed to  execute for, but you cannot change the function's name.

You can change the Docker image on which a function is  based. If you do want to change the image, the replacement image must be suitable for use with Oracle                                        Functions, and must have  already been pushed to the Docker registry. With the replacement image  in the Docker registry, you can then update a function's definition so  that it is based on the replacement image, as described in this topic.   If the replacement image has the same name and tag as the image on which the function was originally based, see [Notes About Image Digests](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsupdatingfunctions.htm#notesdigest).

You can update functions using the Console, the CLI, and the API.

## Using the Console to update an existing function

To use the Console to update an existing function in the Oracle                                        Functions server:

1. Sign in to the Console as a functions developer.

2. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

3. Select the region you are using with Oracle                                        Functions. Oracle recommends that you use the same region as the Docker registry that's specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)). 

4. Select the compartment specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)).

   The **Applications** page shows the applications defined in the compartment.

5. Click the name of the application containing the existing function that you want to update.

6. Click the name of the function that you want to update.

7. Click 

   Edit

    and update some or all of the following properties:

   - **Image:** The existing image in the Oracle Cloud Infrastructure                                                Registry in your  currently selected region. You first select the image repository, and  then the image version. If the image has the same name and tag as the  image on which the function was originally based, see [Notes About Image Digests](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsupdatingfunctions.htm#notesdigest).
   - **Memory:** The maximum amount of memory the function can use during execution.
   - **Timeout:** The maximum amount of time the function will be allowed to run for.

8. Click **Save** to update the function in the Oracle                                        Functions server.

The function's updated properties are shown in the Console.

## Using CLI Commands

To  use the CLI to update an existing function in the Oracle Functions server:

1. Log in to your development environment as a functions developer.

2. In a terminal window, update properties of an existing function by entering:

   Command

```
fn update function <app-name> <function-name> --image <image-name> --<property> <value>
```

where:

- `<app-name>` is the name of an existing application containing the existing function.
- `<function-name>` is the name of the existing function you want to update. 
- `--image <image-name>` (optionally) is the name of an                        existing image in the Docker registry that you now want to base the function                        on, instead of the previously specified image. If the image has the same                        name and tag as the image on which the function was originally based, see                            [Notes About Image Digests](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsupdatingfunctions.htm#notesdigest).
- `--<property> <value>` (optionally) is the                        property you want to update, and the new value you want it to have. Enter                            `fn update function --help` to see a list of properties                        and valid values.

For example:

Command

```
fn update function acmeapp acme-func --image phx.ocir.io/ansh81vru1zp/acme-repo/acme-func:0.0.4 --timeout 60
```

Command

```
fn update function acmeapp acme-func --memory 256
```

The properties of the existing function are updated with the values you specified.

Verify that the function has been updated by entering:

Command

```
fn inspect function <app-name> <function-name>
```

For example:

Command

1. ```
   fn inspect function acme-app acme-func
   ```

   Output:

   ```
   {
       "annotations": {
           "fnproject.io/fn/invokeEndpoint": "https://fht7ns4mn2q.us-phoenix-1.functions.oci.oraclecloud.com/20181201/functions/ocid1.fnfunc.oc1.phx.aaaa____uxoa/actions/invoke",							
           "oracle.com/oci/compartmentId": "ocid1.compartment.oc1..aaaaaaaaw______nyq"
       },
       "app_id": "ocid1.fnapp.oc1.phx.aaaaaaaaaf______r3ca",
       "created_at": "2018-07-26T12:50:53.000Z",
       "format": "default",
       "id": "ocid1.fnfunc.oc1.phx.aaaa____uxoa",
       "image": "phx.ocir.io/ansh81vru1zp/acme-repo/acme-func:0.0.4",
       "memory": 256,
       "name": "acme-func",
       "timeout": 60,
       "updated_at": "2018-07-26T13:59:18.000Z"
   }
   ```

## Using the API

For information about using the API and signing requests, see [REST APIs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/usingapi.htm#REST_APIs) and [Security Credentials](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/credentials.htm#Security_Credentials). For information about SDKs, see [Software Development Kits and Command Line Interface](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdks.htm#Software_Development_Kits_and_Command_Line_Interface).

Use the [UpdateFunction](https://docs.oracle.com/iaas/api/#/en/functions/latest/Function/UpdateFunction) API operation to update functions.

## Notes About Image Digests

Images in a Docker registry are identified by repository,  name, and a tag. In addition, Docker gives each version of an image a  unique alphanumeric digest. When pushing an updated Docker image, it's  recommended best practice to give the updated image a new tag to  identify it, rather than reusing an existing tag. However, even if you  push an updated image and give it the same name and tag as an earlier  version, the newly pushed version will have a different digest to the  earlier version. 

When you create a function with Oracle                                        Functions, you specify  the name and tag of a particular version of an image on which to base  the function. To avoid later inconsistencies, Oracle                                        Functions also records the unique digest of that particular version of the image.

By default, if you push an updated version of an image  to  the Docker registry with the same name and tag as the original version  of the image on which a function is based, Oracle                                        Functions continues to  use the original digest to pull the original version of the image. This  might be the behavior you require. However, if you want Oracle                                        Functions to pull the later version of the image, you can explicitly change the digest that Oracle                                        Functions uses to identify which version of the image to pull in one of the following ways:

- Use the `fn update function`  command and specify the original name and tag of the version of the  image on which you want the function to be based. For example:

  Command

```
fn update function acmeapp acme-func --image phx.ocir.io/ansh81vru1zp/acme-repo/acme-func:0.0.4 --annotation oracle.com/oci/imageDigest=\"\" 
```

Oracle                                        Functions will update the digest recorded for the image on which the function is based to be the  digest of the image in the Docker registry that has the name and tag you specify.

Use the `fn update function` command and specify the digest of the version of the image on which you want the function to be based.  For example:

Command

```
fn update function acmeapp acme-func –-annotation oracle.com/oci/imageDigest='"sha256:8af7cb8d7______c498c0"' 
```

Oracle                                        Functions will update the digest recorded for the image on which the function is based to be the digest  you specify. 

Use the Console and click **Edit Function** on the **Function Information** tab, re-select the original name and tag of the version of the image on which the function is currently based, and click **Save Changes**. Oracle                                        Functions will update the digest recorded for the image on which the function is based.

Use the Oracle Cloud                                        Infrastructure API or an Oracle Cloud                                        Infrastructure SDK (for more information, see [REST APIs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/usingapi.htm#REST_APIs) and [Software Development Kits and Command Line Interface](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdks.htm#Software_Development_Kits_and_Command_Line_Interface)).