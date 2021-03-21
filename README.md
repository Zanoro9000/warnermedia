# warnermedia

Warner Media Coding Challenge for Tyler Kennedy

------------------- Setup to Run ------------------------

The stack used:
Next.js
.NET Core WebApi
EF Core ORM
SQL Express

Next.js because I was currently learning it for my personal resume site and wanted more experience with it.
.Net Core and EF Core 5.0 because that is what I am most comfortable with (and 5.0 has many to many joins without explicit join tables which are sweet).
SQL Express becuause that is what was defined in the prompt.

------------------- Tutorials for serverless ------------------------

- This was done previously and re-used for this project

https://github.com/serverless-nextjs/serverless-next.js

https://js.plainenglish.io/deploy-serverless-app-with-next-js-8-aws-lambda-and-circleci-part-1-a0c9c6ea7c57

https://www.serverless.com/blog/serverless-nextjs

npx serverless --state prod
npx serverless remove

aws s3 rb s3://warnermedia-assets-dev --force --devProfile
