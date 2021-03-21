# warnermedia

Warner Media Coding Challenge for Tyler Kennedy

------------------- Setup to Run ------------------------

The stack used:

Next.js

.NET Core WebApi

EF Core ORM

SQL Express

Next.js because I was currently learning it for my personal resume site and wanted more experience with it.

.Net Core 3.1 and EF Core 5.0 because that is what I am most comfortable with (and 5.0 has many to many joins without explicit join tables which are sweet).

SQL Express becuause that is what was defined in the prompt.

The two github repositories are located here, and both will have the same readme:

https://github.com/Zanoro9000/warnermedia - this one is for the Next.js site

https://github.com/Zanoro9000/WarnerMediaAPI - this one is for the .Net Core API

Setup:

Next.JS

- Tools you need: VS Code (https://code.visualstudio.com/download), Node (>=v10.13) (https://nodejs.org/en/download/)
- Once you have both installed, (and the repository cloned from github - help here if necessary: https://code.visualstudio.com/docs/editor/github)
- Open the terminal and run: npm run dev
- At this point, the terminal should have some kind of 'event - compiled successfully' and eventually stop saying anything
- You can open the browser to localhost:3000 and see the home page
- You will get an error message saying Network Error because your API isn't running. (Unless you do these backwards)

API

- Tools you need: Visual Studio (https://visualstudio.microsoft.com/downloads/), IIS Enabled on your computer (https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?view=aspnetcore-3.1)
- Clone the repository from github (https://docs.microsoft.com/en-us/visualstudio/get-started/tutorial-open-project-from-repo-visual-studio-2019?view=vs-2019&tabs=vs168later)
- If you just installed the new version of visual studio there's a new github interface that can be confusing
- Go to the Package Manager: Tools -> NuGet Package Manager -> Manage NuGet Packages for Solution
- Make sure on the updates tab that everything is installed/updated (not sure if this step is necessary but it might be)
- Go to appsettings.json
- Under ConnectionStrings -> WarnerMediaConnectionString, change that to point to your local instance of SQLExpress or whatever nice database you are using
- If the database is not a SQL Server variant, go to this page and find which one you want to use (https://docs.microsoft.com/en-us/ef/core/providers/?tabs=dotnet-core-cli)
- Install the relevant package through NuGet and once done, change line 30 on Models/Context/TitlesContext.cs to use whichever database provider you want to use
- No guarantees that it will work but good luck
- Once done, run the application from the play button in the top center and if your IIS is enabled properly the application will run and do nothing but be in the running state
- At this point, if you have already set up Next.js, refresh the page and the spinning icon on the search-bar should be gone after a second and you can search for all your titles.
- If this doesn't work, you may have to change the hosted API location in API/APIConfig.ts and make sure that the url you are using is the correct one based on where your API is broadcasting to
