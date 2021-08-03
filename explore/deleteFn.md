# Deleting Applications and Functions

Before deleting an application or function please note the following:
- Ensure you have proper permissions
- Deleting a function does not delete the Docker image on which the function is based.
- Deleting applications and functions is permanent. You cannot undelete an application or function that you've deleted. You can however redeploy the image.
- Deleting a function does not necessarily enable you to  immediately delete the subnet and VCN in which the function runs. Expect to wait up to five minutes after the function was last invoked before  you can delete the associated network resources.

You can delete applications and functions using the Console, the CLI, and the API.

## Using CLI Commands

When using the CLI to delete applications and functions, note that you cannot delete an application if it contains functions (you must delete the functions first).

To delete applications and functions, in a terminal window, enter:


```shell
$ fn delete app <app-name>
```

where `<app-name>` is the name of the application to delete.

For example:

```shell
$ fn delete app acmeapp
```

Verify that the application has been deleted by entering:

```shell
$ fn list apps
```

To delete a function, in a terminal window, enter:

```shell
$ fn delete function <app-name> <function-name>
```

where:

- `<app-name>` is the name of the application containing the function you want to delete.
- `<function-name>` is the name of the function you want to delete.

For example:

```shell
$ fn delete function acmeapp acme-func
```

Verify that the function has been deleted by entering:


```shell
$ fn list functions <app-name>
```

For example:

```shell
$ fn list functions acmeapp			
```
