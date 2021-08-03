# Creating and Deploying Functions

You use CLI commands to create and deploy functions

 **Tip**

 If you aren't able to successfully complete one of the steps in this topic, review the solutions for common problems (see [Troubleshooting Oracle Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionstroubleshooting.htm#Troubleshooting_Oracle_Functions)).

## Using CLI Commands

To create and deploy a function to Oracle                                        Functions using CLI commands:

1. Confirm that you have completed the steps in the [Functions QuickStart Guides](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsquickstartguidestop.htm#functionsquickstartguidestop).

2. If the application to which you want to add the function doesn't yet exist in Oracle                                        Functions, create it now using the CLI or the Console. For example, you might create a new application called acmeapp. See [Creating Applications](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatingapps.htm#Creating_Applications). 

3. Log in to your development environment as a functions developer.

4. In a terminal window, change directory to the directory containing the function code.

5. Initialize the function by entering:

   Command

```
fn init --runtime <runtime-language> <function-name>
```

where:

- `<runtime-language>` is one of the supported runtime languages (currently go, java, node, python, and ruby are supported)
- `<function-name>` is  the name to use as the function name. If you don't specify a function  name, the name of the current directory (in lower case) is used. Avoid entering confidential information.

For example:

Command

```
fn init --runtime java acme-func
```

A directory is created with the function name you specified, containing:

-  A function definition file called func.yaml, containing  the minimum amount of information required to build and run the  function. See the [Fn Project documentation](https://github.com/fnproject/docs/blob/master/fn/develop/func-file.md) to find out about the additional parameters you can include in a func.yaml file. 
- A /src directory containing source files and directories.
- A Maven configuration file called pom.xml that specifies  the project artifacts and dependencies required to compile the function  from the source files.

Note that depending on the runtime language you specify, the `fn init` command might create an /example directory containing code for a  helloworld application. As a matter of good practice, you'll probably  want to delete the /example directory.

Change directory to the newly created directory. 

 Enter the following single Fn Project command to build the function and its dependencies as a Docker image,  push the image to the specified Docker registry, and deploy the function to Oracle                                        Functions:

Command

```
fn -v deploy --app <app-name>
```

where `<app-name>` is the name of the application in Oracle                                        Functions to which you want to add the function. For example:

Command

```
fn -v deploy --app acmeapp
```

The `-v` option simply shows more detail about what Fn Project commands are doing (see [Using the CLI with Oracle Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsusingwithfncli.htm#Using_the_Fn_Project_CLI_with_Oracle_Functions)). 

Note that you can build, push, and deploy the function using separate Fn Project commands, instead of the single `fn deploy` command.

(Optional)  Assuming the specified Docker registry is Oracle Cloud Infrastructure                                                Registry, use the Console to confirm that the image has been pushed to Oracle Cloud Infrastructure                                                Registry successfully:

1. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Containers**, click **Container Registry**.

2. Choose the registry's region.

   You see all the repositories in the registry to which you have access. The  image you pushed is in a new private repository with a name constructed  from:

   - the repository name in the address of the Docker registry in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure))
   - the name of the  image you pushed

   For example, the new repository might be called `acme-repo/acme-func`.

3. Click the name of the new repository. You see details of the  image that's been pushed to Oracle Cloud Infrastructure                                                Registry

(Optional) Use the Console to confirm that the function has been deployed to Oracle                                        Functions successfully: 

1. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

2. Select the compartment specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)).

   The **Applications** page shows the applications in the compartment, including the one you specified in the `fn deploy` command.

3. Click the name of the application you specified in the `fn deploy` command to see the functions within it.

   The **Functions** page shows that the  function has been deployed to Oracle                                        Functions.