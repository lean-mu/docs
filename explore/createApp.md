# Creating Applications

You can create applications in Oracle                                        Functions in readiness for deploying functions. An application need not contain any functions.

You can create applications using the Console, the CLI, and the  API.

 For more information about applications, see [Applications](https://docs.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications).

## Using the Console

To  create a new application using the Console:

1. Confirm that you have completed the steps in the [Functions QuickStart Guides](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsquickstartguidestop.htm#functionsquickstartguidestop).

2. Sign in to the Console as a functions developer.

3. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

4. Select the region you are using with Oracle                                        Functions. Oracle recommends that you use the same region as the Docker registry that's specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)). 

5. Select the compartment specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)).

   The **Applications** page shows the applications already defined in the compartment.

6. Click **Create Application** and specify:

   - A name for the new application (for example, acmeapp). Avoid entering confidential information.
   - The VCN and  subnet (or subnets, up to a maximum of three)  in which to run functions. For example, a VCN called acme-vcn-01 and a  public subnet called Public Subnet IHsY:US-PHOENIX-AD-1). If a regional  subnet has been defined, best practice is to select that subnet to make  failover across availability domains simpler to implement. If a regional subnet has not been defined and you need to meet high availability  requirements, select multiple subnets. Oracle recommends that the   subnets are in the same region as the Docker registry that's specified  in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)).

7. Click **Create**.

   The new application appears in the list of applications.

## Using CLI Commands

To  create a new application in  Oracle                                        Functions using the CLI:

1. Log in to your development environment as a functions developer.

2. In a terminal window, create a new application by entering:

   Command

```
fn create app <app-name> --annotation oracle.com/oci/subnetIds='["<subnet-ocid>"]'
```

where:

- `<app-name>` is the name of the new application. Avoid entering confidential information.
- `<subnet-ocid>` is the OCID of the  subnet (or subnets, up to a maximum of three) in which to  run functions.  If a regional subnet has been defined, best practice is  to select that subnet to make failover across availability domains  simpler to implement. If a regional subnet has not been defined and you  need to meet high availability requirements, specify multiple subnets  (enclose each OCID in double quotes separated by commas, in the format `'["<subnet-ocid>","<subnet-ocid>"]'`). Oracle recommends that the  subnets are in the same region as the Docker registry that's specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)). 

For example:

Command

```
fn create app acmeapp --annotation oracle.com/oci/subnetIds='["ocid1.subnet.oc1.phx.aaaaaaaacnh..."]'
```

An application is created in Oracle                                        Functions, in the tenancy and region implied by the subnet OCID and belonging to the compartment specified in the CLI context file.

Verify that the new application has been created by entering:

Command

1. ```
   fn list apps
   ```

   For example:

   ```
   $ fn list apps
   
   acmeapp
   ```
