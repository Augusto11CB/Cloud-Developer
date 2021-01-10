## Deploying The Server to the Cloud - EB CLI
After running the `eb init` command and following the guided setup will create a new directory in the project named `.elasticbeanstalk`. Within this configuration file, there is a configuration file named `config.yml`. This is the set of instructions Elastic Beanstalk will follow when provisioning your AWS infrastructure and deploying the code.

### Udagram Build and Deploy - EB CLI
After running  `npm run build`  to transpile and package our code into a zip, we need to configure Elastic Beanstalk to use this build archive. This is accomplished with the following addition to the .easticbeanstalk/config.yml configuration file:

```
deploy:
    artifact: ./www/Archive.zip
```