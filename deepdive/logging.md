# Logging

Logging is an important part of any platform.
On the one hand it helps developers build and debug software
On the other it helps operations identify issues and perform root cause analysis
Advanced deployment could use logs to track business interactions, and AI to identify patterns and perform preemptive tasks.


Talk about Loki

## Sending Logs to Syslog


There are a few things to note about what Fn logs.

## Format

All logs are emitted in [logfmt](https://godoc.org/github.com/kr/logfmt) format for easy parsing.

Each line contains timestamp, app id, and function id. Here's a sample:

```txt
2018-11-21T13:50:28-05:00 linuxkit-025000000001 app_id=01CV2SYZ9NNG8G00RZJ0000001,fn_id=01CWVSNBD0NG8G00RZJ00000 Caused by: java.lang.RuntimeException: Something went horribly wrong!
```

## Remote syslog for functions

You may add a syslog url to any function application and all functions that
exist under that application will ship all of their logs to it. You may
provide a comma separated list, if desired. Currently, we support `tcp`,
`udp`, and `tcp+tls`, and this will not work if behind a proxy [yet?] (this is
my life now).

An example syslog url is:

```
tcp+tls://logs.papertrailapp.com:1
```

We log in a syslog format, with some variables added in logfmt format. If you
find logfmt format offensive, please open an issue and we will consider adding
more formats (or open a PR that does it, with tests, and you will receive 1
free cookie along with the feature you want). The logs from the functions
themselves are not formatted, only our pre-amble, thus, if you'd like a fully
logfmt line, you must use a logfmt logger to log from your function.

* All log lines are sent as level error w/ the current time and `fnrunner` as hostname.
* app_id will prefix every log line.

```
<11>2 1982-06-25T12:00:00Z fnrunner - - - - app_id=54321 this is your log line
```


# Storing and Viewing Function Logs

When a function is invoked, you'll typically want to access the function's logs for            troubleshooting. The Oracle Cloud                                        Infrastructure Logging service is the            default and recommended option for accessing, searching, and storing function logs. See                [Using the Console to Enable and View Function Logs in Oracle Cloud Infrastructure Logging](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsexportingfunctionlogfiles.htm#usingconsole). For            more information about the contents of function logs, see [Details for Functions](https://docs.oracle.com/en-us/iaas/Content/Logging/Reference/details_for_functions.htm#details_for_functions). 

Alternatively, there might be occasions when you want to send function logs to an            external logging destination like Papertrail. To send logs to an external logging            destination instead of the Oracle Cloud                                        Infrastructure Logging service,            you use the CLI to specify a syslog URL. See                [Using CLI Commands to Specify a syslog URL](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsexportingfunctionlogfiles.htm#usingfncli).

Note that to store and view logs for a function, the function must include print            statements. For example:

- For node.js: `console.log('Entering Hello Node.js                    function');`
- For java: `System.err.println("Entering Java Hello World                        Function");`
- For go: `fmt.Println("Entering Hello Go function")`

## Using the Console to Enable and View Function Logs in Oracle Cloud                                        Infrastructure Logging

To enable and view function logs in the Oracle Cloud                                        Infrastructure            Logging service:

1. Sign in to the Console as a functions developer.

2. In the Console, open the navigation menu and click **Developer                                        Services**. Under **Functions**, click **Applications**.

3. Select the region and compartment containing the application with functions for                which you want to create, enable, and view logs. 

   The **Applications** page                    shows all the applications in the compartment you selected.

4. Select the application with functions for which you want to create, enable, and view                logs.

5. To create and enable a new function log in the 

   Oracle Cloud                                        Infrastructure

    Logging service:

   1.  Under 

      Resources

      , click 

      Logs

      , click the Actions icon (three                        dots), and then click 

      Enable Log

       and specify:

      - **Compartment:** The compartment in which to create the new log.                                By default, the current compartment.

      - Log Group:

         The log group in which to create the new log.                                Select an existing log group, or select:

        - **Auto-create a default log group** to create a default                                        log group with a default name (DEFAULT_GROUP), if one                                        doesn't exist already.
        - **Create a new log group** to create a new log group with                                        a name and description that you provide.

      - **Log Name:** The name of the new log. 
      By default,                                application-name_invoke .

      - **Log Retention:** The length of time to retain log data.

   2. Click **Enable Log** to create the new log (and the new log group, if you                        specified one).

   For more information, see [Enabling Logging for a Resource](https://docs.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging).

6. To enable an existing function log, under **Resources**, click **Logs**, click                the Actions icon (three dots), and then click **Enable Log**.

7. To view the data in an existing function log, under 

   Resources

   , click                    

   Logs

   , and then click the name of the log you want to view in the 

   Log                    Name

    column. 

   The log opens in the log group's **Log Details** page,                    enabling you to sort and filter log data by time. 

## Using CLI Commands to Specify a syslog URL

The Oracle Cloud                                        Infrastructure Logging service is the default and            recommended option for accessing, searching, and storing function logs.

Alternatively, you can send function logs to an external logging destination like            Papertrail instead by using the CLI to            specify a syslog URL. Note that to use an external logging destination, you must have            set up a VCN with public subnets and an internet gateway (see [Creating the VCN and Subnets to Use with Oracle Functions, if they don't exist already](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatingvcn.htm#Create_the_VCN_and_Subnets_to_Use_with_Oracle_Functions_if_they_dont_exist_already)). 

To send function logs to an external logging destination by            setting the syslog URL:

1. Log in to your development environment as a functions developer.

2. To create a new application and specify that all functions in the application                    send their logs to an external logging destination, enter:

   Command

```
fn create app <app-name> --syslog-url <logging-service-url> --annotation oracle.com/oci/subnetIds='["<subnet-ocid>"]'
```

where:

- `<app-name>` is the name of the new application. Avoid entering confidential information.
- `<logging-service-url>` is the syslog URL to which to                        send logs.
- `<subnet-ocid>` is the OCID of the public subnet (or                        subnets, up to a maximum of six) in which to run functions. If a regional                        subnet has been defined, best practice is to select that subnet to make                        failover across availability domains simpler to implement. If a regional                        subnet has not been defined and you need to meet high availability                        requirements, select multiple subnets (enclose each OCID in double quotes                        separated by commas, in the format                            `'["<subnet-ocid>","<subnet-ocid>"]'`.                        Oracle recommends that the public subnets are in the same region as the                        Docker registry that's specified in the CLI context (see [Creating an CLI Context to Connect to Oracle Cloud Infrastructure](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatefncontext.htm#Create_an_Fn_Project_CLI_Context_to_Connect_to_Oracle_Cloud_Infrastructure)).

For example:

Command

```
fn create app acmeapp --syslog-url tcp://my.papertrail.com:4242 --annotation oracle.com/oci/subnetIds='["ocid1.subnet.oc1.phx.aaaaaaaacnh..."]'
```

Note that if you subsequently set up Oracle Cloud                                        Infrastructure                    Logging to store logs, the existing syslog URL details are retained. So if you                    later decide to resume sending function logs to the external logging                    destination, you simply have to disable Oracle Cloud                                        Infrastructure Logging and logs will be sent to the                    syslog URL again.

To update an existing application and specify that all functions in the                    application send their logs to an external logging destination, enter:

Command

```
fn update app <app-name> --syslog-url <logging-service-url> 
```

where:

- `<app-name>` is the name of the application to                        update
- `<logging-service-url>` is the syslog URL to which to                        send logs

For example:

Command

```
fn update app acmeapp --syslog-url tcp://my.papertrail.com:4242
```

To update an existing application and remove the external logging destination                    specified for the syslog URL, enter:

Command

```
fn update app <app-name> --syslog-url '' 
```

where:

- `<app-name>` is the name of the application to                        update

For example:

Command

1. ```
   fn update app acmeapp --syslog-url ''
   ```

## Previously Supported Logging Options

In earlier Oracle                                        Functions releases (prior to the            release of the Oracle Cloud                                        Infrastructure Logging service), you could            specify where Oracle                                        Functions stores a function's            logs by setting up a 'logging policy' for the application containing the function.            Previously, you could use the Console to set up a            logging policy to:

- Store logs as objects in a storage bucket in Oracle Cloud                                        Infrastructure Object Storage by selecting the **OCI                        Logging** option. 

  To view function logs in a storage bucket, the group to which you belong must                    have been granted access with the following identity policy statements:

  - `Allow group <group-name> to manage object-family in                            compartment <compartment-name>`
  - `Allow group <group-name> to read objectstorage-namespaces in                            compartment <compartment-name>` (Usually created when                        configuring your tenancy for function development. See [Policy Statements to Give Oracle Functions Users Access to Oracle Cloud Infrastructure Registry Repositories](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionscreatingpolicies.htm#userregistrypolicy).)

-  Store logs by sending them to an external logging destination like Papertrail by                selecting the **Syslog URL** option. 

For an existing application where you have previously already set up a logging policy,            the above functionality is still supported and the existing logging policy is applied.            However, note the following:

- You cannot use the Console to set up a new                logging policy or edit an existing logging policy.

- If the existing logging policy specified storing function logs as objects in a                storage bucket in 

  Oracle Cloud                                        Infrastructure

  Object Storage

  :

  - The ability to store logs in Object Storage                        will be deprecated in a future release.
  - Oracle recommends you switch to storing logs using Oracle Cloud                                        Infrastructure Logging.
  - If you do switch to using Oracle Cloud                                        Infrastructure                        Logging to store logs, you cannot revert to storing the logs in Object Storage.
  - Logs stored in Object Storage will continue                        to exist (with each log name including the OCID of the associated function,                        as before).

- If the existing logging policy specified a syslog URL:

  - If you switch to using Oracle Cloud                                        Infrastructure Logging                        to store logs, the existing syslog URL details are retained. So if you later                        decide to resume sending function logs to the external logging destination,                        you simply have to disable Oracle Cloud                                        Infrastructure                        Logging and logs will be sent to the syslog URL again.
  - If you want to change the syslog URL in the existing logging policy, you                        have to use the CLI to change                        it.