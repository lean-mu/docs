# Accessing File Systems from Running Functions

A function you've deployed can access the file system of the container in which it's running as follows:

- the function can read files from all directories
- the function can write files to the /tmp directory

For example, you might want a function to download an Excel file and then read its contents.
To meet this requirement, you might create a function that writes the file to the /tmp directory in the
container's filesystem, and then subsequently reads the file.

When writing files to the /tmp directory, the /tmp  directory is generally always writable.
However, the maximum allowable size of the /tmp directory depends on the maximum memory threshold
specified for the function:

| Maximum memory threshold for the function (MB) | Maximum allowed size of /tmp (MB) | Maximum allowed number of files (inodes) in /tmp |
| ---------------------------------------------- | --------------------------------- | ------------------------------------------------ |
| **128MB**                                      | 32MB                              | 1024                                             |
| **256MB**                                      | 64MB                              | 2048                                             |
| **512MB**                                      | 128MB                             | 4096                                             |
| **1024MB**                                     | 256MB                             | 8192                                             |

Note that the /tmp directory might be shared by successive invocations of the function.
A file written by an earlier invocation of a function could still exist when the function is invoked a second time.
It is the developer responsibility to manage the lifecycle of these files to avoid unexpected behavior.