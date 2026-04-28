Problem Statement

In normal clinics, small hospitals. Patients who come for check up waste thier time in queue. first, they line up for testing thier bp and other checks, which was given to them by the main receptionist (?). then they go back with the results. and they have to wait in new queue in line with those that have the reports ready. once called, they will enter. the doctor will assign the tests and then they have to come back with new results. receptionist checks if they have all the reports (?) and then they enter and get checkup.

what is the receptionist role? -
do they get the recieve the patient first in line ?
do they guide them which tests are needed for thier problem ?
does the patient explain the problem to her first and then she guides him ?
does what the doctor told the patient to recieve, she checks if the patient got the required reports ?
as it is for small clinics, does the reports need to be from the same clinic ?
does receptionist checks the date of the reports or other things ?

Receptionist's role is to assign to them to doctors by queue.

How can I save patient's time and make receptionist work less ?

---

the waiting time for patient:

- Receptionist gives him turn number and asks him to wait till the just previous turn numbered patient goes to doctor, then receptionist calls
- Patient goes to get those reports. In getting those reports, he had to sign up for the test, then wait for his turn and then after testing, wait for the results.
- After getting the reports, will have to wait according to the hospital policy for going for returning patients

the extra work for receptionist:

- Asking for patient to come forward as the previous turn numbered patient enters the doctor room
- Asking for returning patient to come forward as the previous turn numbered patient enters the doctor room

---

Ideas :

QR scanner

- Patient flow

- Shows QR to the reception, reception accepts if recieved fields are okay, then tells when he will be called.
- On patient's phone, there will be a time shown. if he is in the next 4 candidates, it will be shown "Your will called shortly"
- Patient goes when reception calls thier name
- Doctor requires some tests, so patient doesn't check out, and the reception also knows
- Patient take tests and returns, shows the QR again, reception scans and a new timer will be shown to the patient when his turn will come
- Reception calls for him
- The doctor resolves his problem
- Reception doesn't let him go without checking out, that is paying the fees
- Checks if checked out successfull

- Reception flow

- Scans the qr
- Reads the name of the first person in the queue
- Push on next button if the current person gets outside the doctor office, and read that name
- If resolved, then make a person check out
- If returning, scan their qr code, and then go about the day

There are actually five steps to the process: registration, queueing, name calling and moving to next queue, cutting in line by returning users, checking out of the user, flagging system

---

Flow

1. Registration:

- Patient comes for himself
- Patient comes for someone else (like his child, or wife, or only he has phone)
- Patient with above condition but doesn't have phone
- Receptionist uses manual paper forms to entry the users, instead of application digital form
- Patient comes with 2 kids and others, and wants to check all of them together

2. Getting the token number and assign in queue

- Patient fills form, pays, gets min. tests done (opt), and gets assigned in queue
- Patient fills form, but payment is stuck
- Receptionist goes out and new receptionist takes over

3. Waiting in line

- Patient waits till reception calls him
- Patient doesn't wait and nowhere to be found

4. Patient's turn comes

- Patient comes on call from reception
- Patient is nowhere to be found and reception moves forward
- Patient comes after sometime the queue is moved forward

5. Patient comes out of doctor office

- Patient paid in doctor's office
- Patient is resolved by doctor
- Doctor requires some testing to be done before further discussion

6. Patient comes back with test reports

- Patient comes back with test reports
- Patient doesn't come back with test reports
- Patient doesn't come back
- Patient comes back with partial or no test reports

7. Getting assigned in queue

- Asks reception he has to meet again with reports, gets asked to wait and assigned in queue

8. Repeat from [3.]

The thing is that I have to ensure the process is backward compatible. and reception doesn't have to manage more than what they were dping previously.

Questions I have:

- Does patient pay upfront charges and then gets assigned a number ?
  Patient has to pay upfront and gets assigned there
  sometimes, doctor takes money
- Does reception checks if the current turn user is going, or whoever is going after the name calling ?
  they only just call for names, nothing much about authentication
- Does reception know if a patient's problem is resolved by doctor, or further tests are required ?
  When patient comes, a receipt is seen or asked if coming for more tests
- How does, traditionally, missed patient turn gets handled ?
  block that patient, restart him as new patient
- Does reception checks bp, height, weight, sugar during the registration phase ?
  Patient will be made sided and then checks for bp and other happens
  doesn't matter till bp checks, they are already in that queue

---

My idea is to create a qr code scanner that receptionist just have to scan the qr and tap on the system for some time. The areas she would have to touch the system when one person exits the doctor's office, when to add new patient to the queue, when getting the print out of the form.
When the patient installs the application, the thing is they can enter thier medical details. Now on registration, he just has to show him qr code, and receptionist when scan that using 'Add new' button, she will get the patient's details, on each column that is relevant to medical, a 'last updated' thing is above each number of something, like for bp, last updated 32 days ago. if receptionist is ok with those numbers, or if there is no numbers, receptionist could just mark the user for those tests when his turn will come, or will chech right now on the side after registering him. No time wasted on same details over and over. The receptionist will give him a receipt with a qr code.
The patient has a app installed, on that app, a relatime time can be seen, when the user's turn will come, like 11:42 AM or somthing like that, this will be calculated by avg time per person _ how many person are there before him. like the patient gets turn number 32, and current patient in the queue in doctor's office is 12, then his turn will after (32 - 12 - 1)_(5 min. let's assume that), so 95 mins.. now when there are only 20 mins. remaining or there are only 3-4 people before him, a new message will also be shown "you'll be called shortly".
Recptionist will call him when the person before him enters the office. she will check the bp or sugar if not checked previously and only if marked for update. if not, she will just call him. when the prev person exits from doctor's office, the receptionist just have to ask that patient or see doctor's receipt to get answer about if he or she is going for tests or is it resolved. she will have two options on patient's profile, 'resolve and call next' and 'call next'. if 'call next' he will not be removed from queue. If he is going for test, there will be option for receptionist to add what tests are required to be added on the patient profile (not necessary but can do). Now when he comes back, he will tell that he was gone for test and receptionist can check if all tests are ok (or not). She will tap on 'Add returning' button, and scan his qr again using auto feature, or she will get a list of user who have had thier turn and not resovled and select this user for assign again in queue. his timer will update again. previously after docto office exit, his phone will show, 'meet the doctor again after required formalities/ test required'.
After this the queue will be updated to have alternate returning and new patient and other's time will be updated with more 5 mins depening on where he ends on the queue. let's say 12th new person is in the doctor's office. 3 returning people comes, then queue order will be : 12th (doctor), 1st return, 13th new, 2nd return, 14th new, 3rd return, 15th new. so for user 13th, a 5min more will be added, for 14th 10 mins more will be added, and for after and including 15th, 15 mins will be added. the timer on theier app will show realtime fluctuations. like when someone gets out of doctor's office fast, then also it will be updated, if someone comes late, then also it will show fluctuations.
One can pay up whenever, let's say receptionist takes the money on the spot. or maybe doctor will take inside, so when he comes out, it means he has given the money. when creating a reception account, they can set the checkout policy for user: check out manually on exitting doctor office, check out auto when registering approved. so when patient comes out, check out button has to be tapped by receptionist. At the end of the day they can see who paid, who never came, who returned, how many times, etc. so much info for them.
This is the general idea of the application. let's look at how it solves the edge cases.
let's say the patient has not installed application, there will be option to create a patient profile manually (with name or with full details), receptionist can ask for details, or can ask him to fill the form. she will enter the name or full dtails in the app. generate a receipt and go on the day. the user can still check his turn on basis of that qr code. same for users not having phones.
let's say someone comes with thier child, child doesn't have account, the user wants the realtime feature. so there are option to create limited amount of profile on the same account. at least, one profile has to be created on an account. the user can switch for that profile, scan qr and wait.
Now what if when receptionist calls for a person, and he doesn't comes on this turn, then there will be option for the reception to drop that person (after however much time she thinks is ok). the person dropped will have to restart the process (I don't know how money is handled here ? Does reception gives back the money ? Does he demands money to be given back ?) as a new patient. this applies to returning patient too.

Why this design and other features ?

The realtime application is necessary to update the time on user's screen and send notification if let's say the time dropped by 15 mins rapidly due to 3 people not coming on thier turn. or time increased by 30 mins because 6 returning people came. when time changes drastically then a notication could be sent. Else app is not necessary but they wouldn't have to give the same medical details again and agaion or name details. they would just get the qr receipt from which they can check time too, but it wouldn't be realtime, they would have to check again and agian to know the estimated time. one can also ask receptionist how much time is remaining for the patient. she can see the app, or guide user to scan that qr receipt given. ofcourse if qr recepit is gone, then new can be generated. the app can log how many receipt this user generated (so that receptionist knows if to give or not, 40 receipts lost should mean the patient is screwing up, right? but still should be given).
The receptionist can see whole queue, or just new queue and returnign queue, update any patient if required by patient later. But she cannot change the ordering of any. she can delete the patient from the queue if needed, but that will be 2 or 3 taps so maybe she gets time to think about her decision.
The receptionist system can be a webpage handling for one doctor, can be a mobile app on all receptionist's phone realtime synced. one receptionist can update the bp and sugar and other can continue registering.
When user doesn't have app installed or no phone, the receptionist gives him form to fill, on app she can just enters the name of the patient (or soem other info to identify him later), and select draft add and make him fill form on the side (his position is same when he comes, but details will be updated later). when form given, the same receptionist can see the whole list or just draft adds, can search the name and add that this person as real add, and can check manual form given, or update the fields in that app itself after form filled. So no patient waits in line, very easy to register. the recepit to such persons will be given after real add. for draft adds deletion usually requires 2 or 1 taps.

---

new updates:

Alright, so there will be option for application. Either the person installs it or not. It is just going to help the patient not wait in line to fill the form or whatever. it's easier for other patient's waiting time to lower. The patient doesn't need to install app, it is not compulsory. what will happen is that either on whatsapp/message, a link will be send (if whatsapp/phone number taken during registration), and given a receipt with qr. using that qr, one will be gone to a webpage. that webpage will show live estimated time and will update as in app.
Application is not necessary, just an idea or future implementation.
When new patient is added in the queue, the receptionist get a check box for seeing if vitals is needed, that's all. if it's an app, she can still check that checkbox even if she has the medical info of the user via app profile system. now in that case either she can skip it, take the vital check, or check for indiviual box (its flexible as per where the lcoation is and how users there are).
no draft adding policy, only after form submission and money given (or not if doctor takes inside), then only adds in queue.
The receptionist system (webpage or app), can be set for time blocked registration (only new registratino in that time interval) or a hard registration limit. it can also be set for queue reset on new day or same queue saved.

---

new updates:

1. How do you handle the physical inventory of forms when approaching the system's hard cap to prevent over-promising?
   On the reception's interface, they will be able to see that how many patients can come and already in a queue, what time is it and other things (she would have to make the decision though.)

2. Does the receptionist have the authority to bypass the queue and push a "glance-only" returning patient straight through, and if so, how does the system account for that bypassed state without breaking the ETA math?
   let's say she does have the authority. she can make a person go up or down the queue. but it takes 3-4 taps on the interface. so when a queue changes, the ETA also changes for all persons.

3. How does your ETA algorithm handle extreme outliers? Does it use a rolling average of the last 3 patients, or a static historical average? Does it trigger an "unusual delay" warning if the current patient exceeds the average by 300%?
   Now for this, what it does is, attach each user with 5 mins. lets say someone didn't come out after 5 mins, so new 5 mins are also added in eta till he gets out. so like after each avg time, avg time is added in each person's eta. the each person's eta isn't in memory it's just a mathematical formulat that changes like ((position his - position current -1 ) \* avg time) + avg time ... (will add as per more happens). when he comes back or exits the formula changes again to remvoe those extra times and calculates the new eta for all.
   and yes, as the time stretches by one person, the 'unusual delay' can be seen.
   The avg time will be updated after some days historic average or we can keep it as 5 mins. as more data comes, it can be improved. but that's for future, current we can assume each user to spend 5 minutes in there.

4. What is the reconciliation protocol? Can the receptionist do a "bulk drop" or manually fast-forward the digital queue to match the physical room without triggering 20 "Call Next" notifications to people who have already left?
   The question isn't protocol, but that I missed that not evevrybody has internet system. But that is a requirement that receptionist has a system (some sort of for our system to run).
   This can be done if we make the app offline. So registration can happen offline, alright. a qr code will be given on receipt. patient can scan but it shows offline reception. If let's say receptionist makes the system connect online, the users that are in the queue and not checked out will be send to backend and then qr can be scanned as realtime can be seen. whenever system is offline, it works nice, just the qr is not sent. when system comes online, the state on receptionist system gets synced with backend. if state is not synacble that is recpetionist system is offline, the qr code scanned will show reception offline, nothing more.

5. If the clinic refuses to pay for WhatsApp API integration, are you entirely reliant on the physical QR code receipt? If so, what happens when a patient loses the tiny piece of paper? Can the receptionist easily query and reprint a specific QR without messing up the queue order?
   I already addressed this, if a patient is not checked out and in the queue, a receipt can be generated many times by the receptionist. the interfae can be updated for how many recepits are given to which person (but not necessary if don't want to)

---

new updates:

For quota and other checks, A soft lock can be added, but the receptionist MUST tap that, right? that makes is hard for receptionist. so what is it that receptionist can sometime remove restriction, let's say she just passed the paper, didn't tap the soft lock, she can still save herself, by removing the lock today for one person. the override addition is done again by 3-4 taps, which makes it necessary for her to soft lock. the override addition runs for 1 person each time. even if override time blocked or number blocked constraint.
Step eta function can reduce user experience, so we can add dynamic timings on user side, so user will have to fetch the current position, time elatpsed by current position and avg time. using the formula, user can calcuatlate themselv. and backend doens't have to calculate anything, jut keep realtime sync with reception system.

---

More updates:

1. Does your state machine have a global PAUSE state independent of the patient nodes? How do you broadcast a "Doctor on Break" status to the clients so the ETA math suspends instead of infinitely inflating?
   there can be a pause button on receptionist interface.

2. How does the receptionist resync the system after the fact? If they manually insert the returning patient into the "currently serving" slot, does the system automatically push Patient B back without breaking B's app state?
   There will be an undo button, that uses 2-3 taps to back out of the previous actoin (but can only be done for let's say 5 previous actions, like remveo a user as currently serving). she undoes first from the 'resolve and call next'/'call next' button tap. this doesn't make the previous user take the currently serving block. it just sits empty that's all. during that time, she can add the currenlty serving above.

3. What is your exact data-delivery mechanism to the stateless client? Are you using Server-Sent Events (SSE)? Exponential backoff polling? You need a technical answer for how the server talks to the phones efficiently.
   Http polling is ok right now, the server can just say that no chnage or something. we don't need to create the heavy tech right now.

4. Is your database schema designed with a Queue_ID or Doctor_ID foreign key from day one? Even if the assignment says "one doctor," a competent engineer builds a data model that allows for multi-tenant scaling.
   yes from the get go it will have one receptionist serving for different doctors. doctors can be added in the system too. that's all

---

new updates:

The patient delivery mech is http polling with etag.
The pause button sends a signal that doctor is busy or queue interrupted by recption
the queueid id different from doctorid but linked, more queue on basis of doctor can be generated
for resync as patient barges in, there is no undo button, but rather a force insert, and a new notification on patients side for emergency notification.

---

new updates:

When user scans qr and gets the result, the server never sends people's information, just the token number and other details. The token number for the person who scanned can be get by qr, so that is enough.

---

new updates:

what about different sections : like testing area, report generation area, etc.
How the app distinguish between different users
She shouldn't have to type every detail, right? assign a token number on the form and in the interface with user's name, that's it.
Whenever new/returning user comes, they will be assign an incrementing unique token number. the queue doesn't depend on token number, but depends on position of the user in the queue and the new and returning queues, token number will be used to distiguish, act as an id to distinguish two users. if report lost, what was your token number?. if token number not known, check the forms, if there is that person report, then from that token number, generate another receipt for that user.

Now what I was thinking for testing area, is same like the doctor's queue. queueid can be linked with resourceId, resouce could be doctor or other. lab report generation would have no software. it will be a different application, linked iwth testing queue application. when person exits testign area, reception calls next with sample given. then when report is generated, the reception can update the person's status with retrive report.if they both are different counter. then same application connected via lan or wan and synced with cloud. we can do the lab generate counter update the person's status. nothing more. in testing area, it will be that there are two application, testing queue, and lab report generationg application, in which the lab report generationn application takes the same person and assign to the person and generate recipt for this lab generation. testing and report generation is atomic.

so let's go with the flow. testing counter. patient comes and register for the testing line. reception gives one receipt with testing wating line. when person exits, reception has two options : 'report generated and call next' or 'call next'. when report generated, nothing is happened, and person is dropped. for call next, a new call is made to lab generation software/applciation/api in which the same pareson data is given, and a receipt is generated for that person to show/scan qr when looking for status at lab generation counter.

But what if she accidently pushed call next, so whenever call next is made, reception can make a new report generation or delete one on previous patients directly too. or lab generation system handled via lab counter directly. ofcourse 3-4 taps.

how is lab and other queue connected via? either wan for passing patient data, or the testing queue filled form is passed to lab genration counter, and then lab generation counter creates a new receipt with that person's name/details and toekn number.
so they are both unlinked software, and can be run fully offline too. if two different counters.

so tsting queue is same as doctor's queue and lab report status checking is different software but creates receipt same as other queue system but handles status update rather than waiting time. and it can be fully offline too. and testing form is used here.

the queue are totally decoupled

What has remained is how the testing area (can take multiple patients at the same time) concurrency issue is handled?

---

