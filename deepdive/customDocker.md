# Using a Custom Dockerfiles

When you build or deploy a function with Oracle                                        Functions, a Docker image is created and            pushed to a Docker registry. As with any Docker image, the instructions to build the            image are contained in a Dockerfile. 

If the function is written in one of the languages supported by an Fn Project FDK (Functions Development Kit),
Mu uses the `runtime:`, `build_image:` and `run_image:` settings in a func.yaml file to determine the language 
(and therefore the build-time and run-time dependencies) to include in the Docker image. If you use the `fn init`
command to initialize the function, a func.yaml file is created for you.  

For example, a func.yaml might look like:

```yaml
schema_version: 20180708
name: hello-java
version: 0.0.1
runtime: java
build_image: fnproject/fn-java-fdk-build:jdk11-1.0.116
run_image: fnproject/fn-java-fdk:jre11-1.0.116
cmd: com.example.fn.HelloFunction::handleRequest
```

When you build or deploy the function, Mu uses the settings in the func.yaml file to create a temporary Dockerfile
containing the instructions from which to build the Docker image. For example, a temporary Dockerfile is shown below.

```dockerfile
FROM fnproject/fn-java-fdk-build:jdk11-1.0.116 as build-stage
WORKDIR /function
ENV MAVEN_OPTS -Dhttp.proxyHost= -Dhttp.proxyPort= -Dhttps.proxyHost= -Dhttps.proxyPort= -Dhttp.nonProxyHosts= -Dmaven.repo.local=/usr/share/maven/ref/repository
ADD pom.xml /function/pom.xml
RUN ["mvn", "package", "dependency:copy-dependencies", "-DincludeScope=runtime", "-DskipTests=true", "-Dmdep.prependGroupId=true", "-DoutputDirectory=target", "--fail-never"]
ADD src /function/src
RUN ["mvn", "package"]
FROM fnproject/fn-java-fdk:jre11-1.0.116
WORKDIR /function
COPY --from=build-stage /function/target/*.jar /function/app/
CMD ["com.example.fn.HelloFunction::handleRequest"]
```

Having created the Docker image, Mu deletes the temporary Dockerfile.

If you want more control over the Docker image that is created, you can modify the created Dockerfile.
Alternatively, you can create your own Dockerfile entirely from scratch. In both cases, the Dockerfile is referred as
a 'custom Dockerfile'.

When you build or deploy the function, Mu uses the instructions in the custom Dockerfile to build the Docker image.
To have Mu use a custom Dockerfile when building a Docker image:

1. Make a copy of the Dockerfile you want to use as a custom Dockerfile.
2. Save the new file to the directory containing the func.yaml file.
3. Give the new file the name `Dockerfile`. Note that you must name the file `Dockerfile`.
4. Open the file named `Dockerfile` in an editor of your choice.

   For example, the `Dockerfile` file might contain the following lines to install the Oracle Instant Client from an oraclelinux:7-slim base image:

   ```dockerfile
   FROM oraclelinux:7-slim
   
   RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
        yum-config-manager --disable ol7_developer_EPEL && \
        yum -y install oracle-instantclient19.3-basiclite nodejs && \
        rm -rf /var/cache/yum
   
   WORKDIR /function
   ADD . /function/
   RUN npm install
   
   CMD exec node func.js
   ```

5. Include the following lines in the file named `Dockerfile` (as described in [Permissions Granted to Containers Running Functions](https://docs.oracle.com/en-us/iaas/Content/Functions/Tasks/functionsrunningasunprivileged.htm#Permissions_Granted_to_Containers_Running_Functions)):

1. ```shell
   groupadd --gid 1000 fn && \
   adduser --uid 1000 --gid fn fn
   ```

   For example:

   ```dockerfile
   FROM oraclelinux:7-slim
   
   RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
        yum-config-manager --disable ol7_developer_EPEL && \
        yum -y install oracle-instantclient19.3-basiclite nodejs && \
        rm -rf /var/cache/yum && \
        groupadd --gid 1000 fn && \
        adduser --uid 1000 --gid fn fn
   
   WORKDIR /function
   ADD . /function/
   RUN npm install
   
   CMD exec node func.js
   ```

2. Save the file named `Dockerfile`. You can now use the                        `Dockerfile` file as a custom Dockerfile.

3. In the func.yaml file, change the value of the `runtime:`                    parameter to `runtime: docker`.

   For example, if the func.yaml file contains `runtime: java`,                    change it to `runtime: docker`.

4. Use the `fn build` or `fn deploy` commands to build                    or deploy the function.

Oracle                                        Functions uses the instructions in the custom            Dockerfile (the file named `Dockerfile`) to build the Docker image for            the function, and push it to the Docker registry. 