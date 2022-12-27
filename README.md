## About Me

Hello! My name is Adam Hiatt and I am very excited to be interviewing with Tozny. I am a 3rd year computer science student at Portland State who has a passion for solving problems with technology. I have been interning at Intel as a front end javascript developer the last year and have learned a ton! I have helped develop our analytics framework supports data analytics across all of Intel's websites and millions of users. I am ready to explore other parts of the stack and Tozny looks like an excellent place to do so.

I'm excited to walk through my code in person, but I wanted to give a high level overview of how everything works in this readme.

### Inventory

The inventory program was fairly straightforward. One prerequisit to running the program is you need to have python installed. In order to run it make sure you have the inventory.json and inventory.py files downloaded and run the following command:

```
python3 inventory.py
```

One note is that I put python3 here but whatever command you use to run python on your machine should be fine.

If you have other test cases you would like to run it through just update the inventory.json file with the test data and run the command again.

### Rock, paper, scissors

For this app I wanted to highlight that I have a skillset that is not limited to front end development. I created a a node/express app and deployed it using render. I did use the free tier so apologies for the slow loading times. I utilized the ToznySDK to handle the encryption and storing the round results. In order to play do the following:

1. go to https://tozny-rps.onrender.com/
2. Select either Bruce or Alicia
3. Play a round
4. Select the other user in the top right
5. Play a round
6. Select clarence in the top right
7. Enter a round to judge

After judging a round you can check the winner from any of the user profiles. I'd like to note here that I didn't add extensive error messages on the front end due to time constraints, but I would be happy to dive deeper into this in our discussion.

Also, I spent most of my time building out the server and client side logic and not a whole lot on UI design. I used tailwind css and daisy ui for some generic pluggable components just to have a presentable site to test the functionality.

Thanks for reading and I look forward to speaking with you!
