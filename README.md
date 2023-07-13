## Smart and Secured Online Voting System using Blockchain  
# Installing necessary softwares:  
Step 1 : Download and install Visual Studio Code  
Step 2 : Download and install Ganache.  
Step 3 : Download, install and setup Node.js.  
Step 3 : Open the command prompt and select any one directory amd run the following command to install truffle suite.  
      npm install -g truffle  
Step 4 :  Open Visual Studio Code and install the following extensions.  
						1. Dart  
						2. Solidity  
# Running the Project:  
Step 1 : Download the source code.  
Step 2 : Go to the MongoDB’s official wesite by clickcing https://www.mongodb.com/ and then click start free. You can either sign up by filling out your details or you can choose sign up with google or sign in if you already have an account. After signing in, click on ‘Build a Database’ and choose M0(FREE) configuration and then enter the name for your cluster and then hit on create.  
Step 3 : Then, the Security Quickstart page will appear. Choose Username and Password as the authenticate method and then enter the username and password for creating  a new user, note down these username and password and then hit on create user.  
Step 4 : Choose My Local Environment and then enter the IP address 0.0.0.0 and then click on Add Entry and then hit on Finish and Close.  
Step 5 : Go to the Database page from the Deployment tab. Find out the database which we have created just now. Click on connect and choose Drivers(Connect to your application) and then Choose Node.js for Driver and choose 2.2.12 or later for its version and then copy the connection string.   
Step 6 : Open Ganache -> Click New Workspace -> Enter the workspace name and then click on Add Project -> Navigate to the folder '/evoting/truffleSuite' and select the file 'truffle-config.js' and select open and then click start to start the blockchain network. This workspace should be kept open during the execution of the project.  
Step 7 : Open Visual Studio Code and open the source code folder by selecting File -> Open Folder -> Navigate to the folder where  the eVoting folder of source code is located -> select eVoting -> click open folder and the folder will be opened in Visual Studio Code.  
Step 8 : Go to ‘../evoting/truffleSuite’ and open the file ‘truffle-config.js’ and edit the following part of the code according to the instructions given.  
						module.exports = {  
							networks: {  
								development: {  
									from: "",//Copy the first account address from the Ganache blockchain network which we have created and paste it within the double quotes  
									host: "127.0.0.1", // Localhost  
									port: 7545, // The Port number should be taken from the RPC server address which is available in the home page of Ganache.  
									network_id: "*",  
								},  
								deployment: {  
									from: "",// Copy the first account address from the Ganache blockchain network which we have created and paste it within the double quotes  
									host: "127.0.0.1", // Localhost  
									port: 7545, // The Port number should be taken from the RPC server address which is available in the home page of Ganache.  
									network_id: "*",  
									websockets: true,  
								},  
							},  
							},  
							compilers: {  
								solc: {  
									version: "0.7.6", // Fetch exact version from solc-bin and put it within the double quotes  
								},  
							},  
						};  
Step  9 : Select Terminal->New Terminal and change directory to ‘../evoting/truffleSuite’ and run the following commands.  
1.	truffle compile  
2.	truffle migrate  
If the above commands don’t work, then try the following commands.  
1.	truffle.cmd compile  
2.	truffle.cmd migrate  
Step 10 : Open the file ‘keys.js’ from the path ‘../evoting/Middleware/src/config/keys.js’ and edit the code by following given instructions.  
const config = {  
    mongoURI : '',//Paste the connection string within the quotes which you have copied in step 5 and delete <password> in the string and in that place give the password which you have used in Step 3.  
    secretOrKey :  '',//Type any string value with single word in it.  
}    
Step 11 : Go to the following path ‘../evoting/lib/src/repository’ and open the file ‘network_config.dart’ and edit the baseURL by following given instructions.  
		const String baseURL = "http://<IP address>:<Port number>/api/v1";  
	<IP address> : Find your network IPv4 address by giving ‘ipconfig’ command in the command prompt and put it here.  
	<Port number> : Put the port number on which your backend server is running.  
Step 12 : Open the command prompt and change its directory to the folder containing the source code and change its directory as ‘../evoting/Middleware’ and run the following command.  
		npm run start  
Step 13 : Open Terminal in VS Code and change the directory to ‘../evoting’ and run the following command.  
		flutter pub get  
Step 14 : Then run the following command.  
		flutter run  
Step 15 : Choose any device ( Chrome is preferred) and the application will be executed successfully.  
Step 16 : To run the application in the emulator, set up an emulator and start the emulator in VS Code and run the following command.  
		flutter run  
And the application will be executed in the emulator.  
    
