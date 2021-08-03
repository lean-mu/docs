From the beginning, we’ve had the philosophy to keep the core of [Fn](https://fnproject.io), lean and clean, but enable people to build on top of that foundation.  Fn has an extensive extension system built into it and we recently made  some nice additions to make it really easy to use them. Here’s how it  works.



# Using Third Party Extensions

If you see an Fn extension that you’d like to use, for instance [this authentication one](https://github.com/fnproject/ext-auth), [this DNS one](https://github.com/fnproject/ext-dns), or [this metrics one](https://github.com/fnproject/ext-statsapi), with just a couple of steps you can build a custom Fn server Docker image that includes those extensions.

First, make a file called `ext.yaml`. And in that file, you simply list the Git repository where those extensions live, for example:

```
extensions:
  - name: github.com/fnproject/ext-dns
  - name: github.com/fnproject/ext-auth
```

Then build your custom server:

```
fn build-server -t imageuser/imagename
```

`-t` is the Docker tag for your new Fn server image.

Extension configuration variables are passed in via environment variables so read the extension docs to see what it needs (it should also error during  startup and tell you what config it needs).

Now run your image:

```
docker run --rm --name fnserver -it -v /var/run/docker.sock:/var/run/docker.sock -v $PWD/data:/app/data -p 8080:8080 imageuser/imagename
```

# Writing Extensions

So you want to make your own Fn extension? Well that’s easy too. There are basically three areas your extension can hook into:

1. Listeners — listen to API events such as a route getting updated and react accordingly.
2. Middleware — a chain of middleware is executed before an API handler is called or a function is called.
3. Add API Endpoints — extend the default Fn API.

Your extension can use one or all of these mechanisms. All your extension needs to do to plug itself in is the following:

```
func init() {
    server.RegisterExtension(&fnext.Extension{
        Name:  "github.com/treeder/fn-ext-example/logspam",
        Setup: setup, // Fn will call this during startup
    })
}

func setup(s *fnext.ExtServer) error {
    // Add all the hooks your extension needs here!
    s.AddCallListener(&LogSpam{})
}
```

You can read more about how to implement an extension here: https://github.com/fnproject/fn/blob/master/docs/contributors/extensions.md#writing-extensions

And once you’re done, publish it to GitHub for all to use! Once it’s on  GitHub, anybody can easily use your extension by adding it to their `ext.yaml` like above.



# Building Custom Server with Extensions

You can easily add any number of extensions to Fn and then build your own custom image.

An example of fn w/ extensions may be found [here](https://github.com/fnproject/fn-ext-example).

Simply create an `ext.yaml` file with the extensions you want added:

```yaml
extensions:
  - name: github.com/treeder/fn-ext-example/logspam
  - name: github.com/treeder/fn-ext-example/logspam2
```

Build it:

```sh
fn build-server -t imageuser/imagename
```

`-t` takes the same input as `docker build -t`, tagging your image.

Now run your new server:

```sh
docker run --rm --name fnserver -it -v /var/run/docker.sock:/var/run/docker.sock -v $PWD/data:/app/data -p 8080:8080 imageuser/imagename
```

## datastores / mqs / drivers

Users that construct their own fn `main()` to build with extensions will need
to import any pieces they need to configure a datastore, mq and drivers for
the agent. `github.com/fnproject/fn/api/server/defaultexts` will import
everything in core and allowing configuring them at runtime. To get a smaller
binary, users may import only what they need. See the `defaultexts` file for
import paths to various pieces that may be configured. It's also possible to
use an entirely separate datastore, mq, or driver if a user wishes.
