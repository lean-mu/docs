# Changing Resources Limits

You can change several aspects of Oracle                                        Functions default behavior using            configuration parameters and environment variables.

Depending on the parameter, you can override a default value by specifying an alternative value in the following ways  (note the order of precedence):

- by adding an entry to the func.yaml file (which overrides default values)
- by explicitly setting an environment variable (which overrides values set in the func.yaml file)
- by including a command option when you invoke the function using the CLI (which overrides values set in environment variables or in the func.yaml file)

The following table indicates the parameters you can set, the default value, and where the default value can be overridden.

| Parameter Description                              | Default Value | Units   | func.yaml Parameter | Environment Variable | Fn CLI option | Notes                                                        |
| -------------------------------------------------- | ------------- | ------- | ------------------- | -------------------- | ------------- | ------------------------------------------------------------ |
| **Maximum time a function will be allowed to run** | 30            | Seconds | timeout             | n/a                  | n/a           | Maximum value: 300. Best practice is to specify a timeout that is close to that likely to be required, rather than significantly more. |
| **Maximum memory threshold for a function**        | 128           | MB      | memory              | FN_MEMORY            | n/a           | One of: 128 256 512 1024 If this limit is exceeded during execution, the function is stopped and an error message is logged. |
