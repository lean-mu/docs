# Passing Custom Configuration Parameters

It is common for function to be parametrized. Some pre-defined parameters are available to your functions as
environment variables. But you'll often want your functions to use parameters that you've defined yourself.
For example, you might create a function that reads from and writes to a database. The function will require a
database connection string (typically composed of a username, password, and hostname). You'll probably want to
define username, password, and hostname as parameters that are passed to the function when it's invoked.

To pass user-defined parameters to a function deployed in Mu, you create key-value pairs known as custom configuration
parameters. You can create custom configuration parameters that are:

- **application-wide**, meaning they are passed to every function in an application
- **function-specific**, meaning they are passed to the particular function for which they are defined (function-specific parameters override application-wide parameters with the same name)

To create custom configuration parameters, you can use:

- the `config:` section of a function's func.yaml file, to define function-specific custom configuration parameters
- the CLI, to define both application-wide and function-specific custom configuration parameters

Mu combines all the custom configuration parameters (both application-wide and function-specific) in the application
into a single, serially-encoded configuration object with a **maximum allowable size of 4Kb**. 

## Using func.yaml

## Using the CLI

To specify one or more custom configuration parameters using the CLI, enter:

```shell
fn config app <app-name> <key> <value>
```

where:

- `<app-name>` is the name of the application containing the functions to which you want to pass the custom configuration parameter.
- `<key>` is the name of the custom configuration parameter. The name must only contain  alphanumeric characters and underscores, and must not start with a number. 
- `<value>` is the value to give to the custom configuration parameter. The value must only contain printable unicode characters.

For example:

```shell
fn config app myapp username jdoe
```

To specify one or more custom configuration parameters to pass to a particular function, enter:

```shell
fn config function <app-name> <function-name> <key> <value>
```

where:

- `<app-name>` is the name of the application containing the function to which you want to pass the custom configuration parameter.
- `<function-name>` is the name of the function to which to pass the custom configuration parameter.
- `<key>` is the name of the custom configuration parameter. The name must only contain  alphanumeric characters and underscores, and must not start with a  number. 
- `<value>` is the value to give to the custom configuration parameter. The value must only contain printable unicode characters.

For example:

```shell
fn config function myapp acme-func username jdoe
```
