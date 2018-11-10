# lambda-bin-perf

## Running the Example

Follow these steps to run this example:

1. Install all dependencies with:

`npm install`

2. Prepare the bin folder with:

`gulp`

3. Deploy it all to AWS with (make sure to [setup AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) first):

`npm run serverless`

4. Edit `script.yml` and replace `My_StackOutputs_ServiceEndpoint` with the `serverless` `Stack Outputs` for your `ServiceEndpoint`.

5. Run tests

`npm run perf-original`

`npm run perf-lambdaBin`

6. Compare results.


## Customize for Your Needs

Follow these steps to customize this example:

1. Replace dependencies in `package.json` to include your own dependencies.

2. Change `gulpfile.js` to prepare your `bin` folder.

3. Change `test-original.js` to invoke your own code (added to `package.json` on step 1).

4. Change `index.js` to invoke your code using `lambda-bin` instead or your current binary deployment approach.

5. Follow the steps under section `Running the Example`.

## Cleanup AWS Account

Once you are done testing clean up your AWS account by running:

`npm run cleanup`
