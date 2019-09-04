# Capstone

"You will build a website that is used to create and manage teams, including registering members for a team. The theme of the organization is up to you: a soccer league? a volleyball league? a scavenger hunt? a cooking contest? ... etc. Your website will NOT be concerned with scheduling matches or scoring or keeping track of your team activities.


# Leagues

Teams are organized into "leagues", "divisions", or "groups". The properties for a League must minimally include:

 - League Name
 - League Code or Abbreviation
 - Description

# Teams
Team properties must minimally include the following:

 - Team Id (assigned by the REST API and not shown to the users).
 - Team Name
 - Manager Name
 - Manager Phone
 - Manager Email
 - Minimum Age for Team Members (an integer).
 - Maximum Age for Team Member (an integer).
 - Gender of Team Members (options are: Male, Female, Any).
 - Maximum Number of Team Members (an integer).
 
 A team can have 0 or more Team Members signed up at any time. Team member properties must minimally include: 
 
 - Member Id (assigned by the REST API and not shown to users).
 - Member Name
 - Age (an integer).
 - Gender (Male or Female).
 - Contact Name (may or may not be member Name).
 - Phone
 - Email Address

# Pages
The following pages are in this project:

### Home
Includes a banner, a description of your leagues and navigation links.
### Team Search
Allows the user to view a listing of teams with reasonable search features built in.
### Team Details Page
The ability to view a particular team's roster.
Also allows the ability to edit a team's details.
### Add a Player
The ability to register a player for a specific team.
### Add a Team
The ability to register a team for a league.
### About US
Information about the different leagues, with video links.

# Server
Make sure you have node downloaded. To launch the server, type into the command prompt - node server.js. The website will then be http://localhost:8081/. To see the different pages, use the navigaiton link / buttons.

# Page Highlights
### Home Page
![HomePage](public/images/homepage.jpg?raw=true "Home Page")

### Add Team Page
![Add Team](public/images/addTeam.jpg?raw=true "Add Team Page")

### Team Details Page
![Team Details](public/images/teamdetails.jpg?raw=true "Team Details Page")
