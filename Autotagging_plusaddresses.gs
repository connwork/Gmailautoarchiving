function gmailAutoTag() {

  // gmailAutoTag - A Google Script that automatically tags emails based on their plus address aliases. To be used in tandem with a script that auto-archives items older than x days.
  //
  //

  const DEBUG = true;              // Debugging Output

  //Modifiable variables

  var autolabelingvar = ".Automated Labeling"
  var archivetimervar = ".autoarchive"
  var filteringemail = "firstname.lastname.filter@gmail.com"
  var tagtiming = "2" //days

  
  
  
  
  
  
  //DO NOT MODIFY

  var autolabels = GmailApp.getUserLabels(); // Get all user labels
  var autolabel = autolabels.find(function(label) {
  return label.getName() === autolabelingvar;
  });

  //var autolabels = GmailApp.getUserLabels(); // Get all user labels
  //var autolabel = GmailApp.getUserLabelByName(autolabelingvar); // Get the '.Automated Labeling' label

  if (!autolabel) {
    GmailApp.createLabel(autolabelingvar);
    console.log(autolabelingvar + " creation complete");
  }
  
  var labelPrefix = autolabel.getName() + "/"; // Add a forward slash to the label name to use as a prefix for subtags
  var autolabels = GmailApp.getUserLabels(); // Get all user labels
  var existingplusaliases = []; // Initialize an array to store subtags
  var plusaliases = [];
  var tagcounts = 0;

  //Utilities.sleep(500);

  // Loop through each user label
  for (var i = 0; i < autolabels.length; i++) {
    var userLabel = autolabels[i];
    //var autolabel = GmailApp.getUserLabelByName(autolabelingvar); // Get the '.Automated Labeling' label
    // Check if the label is a subtag under the '.Automated Labeling' tag group
    if (userLabel.getName().startsWith(labelPrefix) && userLabel.getName() !== autolabel.getName()) {
      // Extract the subtag name by removing the label name and prefix
      var subtagName = userLabel.getName().substr(labelPrefix.length);
      existingplusaliases.push(subtagName); // Add the subtag name to the array
    }
  }
  console.log(existingplusaliases.length-2 + " existing aliases found");
  
  var plusthreads = GmailApp.search("to:" + filteringemail + " newer_than:" + tagtiming + "d");
  var plusthreadslen = plusthreads.length;
  console.log(plusthreads.length + " new conversations found");
  plusaliases = plusaliases.concat(existingplusaliases);

  for (var i=0; i<plusthreadslen; i++)
  {
    var plusthread = plusthreads[i];
    if (!plusthread.getLabels().includes(autolabelingvar + "/" + archivetimervar)) {
      plusthread.addLabel(GmailApp.getUserLabelByName(autolabelingvar + "/" + archivetimervar));
    }

    var plusmessages=plusthread.getMessages();
    for (var j=0; j<plusmessages.length; j++)
    {
      var plusmessage=plusmessages[j];
      var plusgetto = plusmessage.getTo();
      try {
        // Use RegEx to extract just email address
        var plusemail_address = plusgetto.match(/(?<=\.filter\+)(.+?)(?=@gmail\.com)/)[1];

        // Skip addresses already collected
        var index = plusaliases.indexOf(plusemail_address);
        if (!plusaliases.includes(plusemail_address)) {
          GmailApp.createLabel(autolabelingvar +"/" + plusemail_address);
          plusaliases.push(plusemail_address);
        }
        if (!plusthread.getLabels().includes(plusemail_address)) {
          plusthread.addLabel(GmailApp.getUserLabelByName(autolabelingvar + "/" + plusemail_address));
          tagcounts = tagcounts + 1;
        }
      }
      catch(e) {
      }
    }
  }

  console.log(plusaliases.length + " new aliases found");
  console.log(tagcounts + " emails tagged");

}
