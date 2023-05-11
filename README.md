# Part 1: Mass Autotagging (Complete)
## Set up autoarchive filter/tag

Setting up this filter will help automatically tag emails that are fit for auto-archiving. It includes common words that I am using to filter.

### First Filter

1. From:
2. To: 
3. Subject: 
4. Has the words:"unsubscribe" OR "do not reply" OR "noreply" OR "Unsubscribe" OR "no-reply" OR "©" OR "©" OR "©" OR "notification settings" OR "All rights reserved" OR "®" OR "Order #" OR "Order summary"
5. Doesn't have:
6. Size: 

### Second Filter

1. From:"calendar-notification@*" OR "accounts@*" OR "mail@*" OR "notifications@*" OR "marketing@*" OR "sales@*" OR "support@*" OR "orders@*" OR "donotreply@*" OR "noreply@*"
2. To: 
3. Subject: 
4. Has the words:
5. Doesn't have:
6. Size: 

## Set up Archiving Script

Google script to automatically archive or trash old emails based on defined search terms.
Supports multiple rules, with custom actions for each rule.
Uses Gmail search syntax to find matching threads.

### To use:

1. Go to https://script.google.com
2. Go to the Editor and create a .gs file, paste in the contents
3. Set up the rules and configuration to suit your requirements
4. Give it a test run to ensure it is working OK
5. Go to Triggers > Add Trigger. Suggest a daily trigger at any time which suits
6. The script will run automatically and keep your gmail box squeaky clean!

# Part 2: Automatic Label Creation and Assignment Based on Plus Addresses (Beta)
1. Create an alternate email based on your primary email (firstname.lastname@gmail.com) with the word "filter" at the end (firstname.lastname.filter@gmail.com)
2. In your filter email address: In settings, see all settings, Forwarding and POP/IMAP, add your primary email as a forwarding address. 
3. In your filter email address: Create a filter with Has the words: {(to:firstname.lastname@gmail.com) (deliveredto:firstname.lastname@gmail.com)} and assign it to apply the label "alias not respected: autospam"
4. In your filter email address: Create a filter with Doesn't have the words: {(to:firstname.lastname@gmail.com) (deliveredto:firstname.lastname@gmail.com)} and assign it to apply the label "alias respected: forwarding"
5. In your primary email, use the same process as Part 1 to create a new google script with the Autotagging_plusaddresses.gs file. 
6. Configure the variables to reflect your filtering email, desired top level tag, and auto tagging tag for Part 1.
7. Begin signing up for services with firstname.lastname.filter+servicename@gmail.com. If the alias is respected, if will be forwarded to your primary email and the script will automatically build out the tag named "servicename" if it does not already exist. It will also tag any emails from the service to this tag. 

**Unfortunately poor and not liable should something go wrong, no guarantees made with this code, use at your own risk
