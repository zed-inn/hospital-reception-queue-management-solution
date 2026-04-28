Cases that will be discussed:

**Doctor's office**

1. Patient comes for registration / Reception registers patient:
   Patient goes for registration and receptionist gives them a form(s) to fill, She "soft locks" for this patient position which gives them space for "10 minutes". After filling the form, receptionist checks if vitals are needed. If the policy is to enter vital on registration, their registration is halted and vitals are recorded on the side. If policy is to enter vitals on thier turn, the form is marked vitals necessary. Then the reception asks the patient to pay, if policy is to take money upfront. Till the user is paying, she is handing other forms, and also guiding other patients to pay too. After payment is done, she "add a new patient" and enters a name in the system portal, the system generates a token number and (receptionist enters that token number on form filled?) and the system generates a receipt with a qr-scannable code on it.

- Patient is alone:
  The process is same as above

- Patient is not alone and wants to discuss 2 children at once:
  When patient asks for form, they ask for 1+ forms and then when all payment related steps are done, the receptionist "add a new patient group" and creates patient profiles there, system generates a single token that contain the patient profile. The system generates only one receipt.

- Patient is to be tested for vitals:
  When "add a new patient [group]", if policy is to get vitals on turn, then she can select a checkbox "vitals needed" and when that patient's turn is come, she can measure the vitals of the patient.
- Patient is a returning patient
  She adds him as "returning patient"

2. Patient is waiting:
   While patient is waiting, Patient can scan the qr code on the receipt given to them/him. The qr code after scanning will take them to a webpage showing when thier turn will come approximately. The waiting time is calculated on the data received by server. If the reception is offline, then the qr code with show "Reception offline" and the last estimated time, if possible.

- Patient turn is in next (c \* 4) turns:
  Patient's screen will also show a message "You'll be called shortly" and color of screen changes

- Patient turn is not in next (c \* 4) turns:
  Patient's screen will only show the time they are going to be called when.

- Patient is first:
  Patient doesn't have to wait, the receptionist asks them to go meet the doctor. On the receptionist interface, the queue has started.

- Patient is next:
  Receptionist calls the next person in line before thier turn (as for vitals and other details) by seeing the next person in line to current patient. The patient knows they are next.

3. Patient gets called from reception:
   Receptionist calls the next-in-line person after the current one. She asks for taking vitals if policy.

- Patient appears on call:
  Patient appears and they go in after the current patient exits the room. Before letting them go in, she asks the current patient if thier problem is resolved by checking doctor's reciept or something, and then mark the patient as either "Resolve" or "Not resolved" and "call next". On the reception interface, she will be able to see "concurrency" patients with current patient. On the reception interface, when clicking "resolve", the current is empty till she clicks "call next". there will be a option for "resolve and call next" and "not resolved and call next" too if the next patient is present.

- Patient does not appear on call:
  Receptionist waits till the current exits and then "resolve"s or "not resolved", if they exits and patient is not here, she drops the next patient, a new patient is shown on queue, she calls for them until someone shows up, and then "call next" on them

4. Patient enters the doctor's office:

- Before the next patient can go, a returning patient was waiting for gate to open, asks doctor and enters:
  When the next person has to enter, and the receptionist has pressed the "call next" button, and some patient who has returned hoards the gate and asks doctor to come and they say ok, receptionist has to "force insert" a returning/new patient at that time. This will make the current(call-next-ed) patient to be on the same position again. If she has not pressed "call next", the system will not touch the call-next-ed patient.

5. Patient exits the doctor's office:
   When patient exits, the receptionist checks if problem is resolved or doctor asked for some tests.

- Patient's problem is resolved:
  If problem is resolved, the receptionist clicks on "resolve" or "resolve and call next"

- Patient's problem is not resolved and some tests are required for further dicussion:
  if not resolved, she clicks on "not resolved" or "not resolved and call next". She can add a description as to what tests are required in the patient's profile, so she doesn't have to remember them, or she registers for those checks.

- Next patient cannot go due to the returning patient waiting and going in and doctor approving for this:
  She has to "force insert" that user after asking for a receipt from him. He doesn't have receipt or he doesn't give and enters, then she only "force top empty/temp user" making the current active as "none" until he comes back and she updates it. The "temp user" function creates a temporary user for the current if "force insert" cannot be done.

- Next patient cannot go due to a new patient waiting and emergency situation:
  Same as above, but for new user.

- Patient's problem is not resolved but receptionist clicks on resolve button:
  Receptionist can override this and change it back, it just uses more clicks to do it.

- Patient's problem is resolved but receptionist clicks on not resolved button:
  Again same

- Patient's problem is not resolved, receptionist adds him immediately as returning patient:
  When turn has to come and he doesn't show up, he will be "drop"ped from the queue. It doesn't mean that his previous information that he was registered new and/but not resolved, so when he comes back, and actually want to be added as returning patient, she can do it.

6. Patient returns after testing:
   After testing, patient can ask receptionist that he was asked for test reports, and that he has acquired it. After checking the reports if got all or not, receptionist can decide if wants to send or not, after that she can "add a returning patient"

- Patient is in returning patient list, how? due to receptionist adding him immediately and doctor taking so much time handling the first patient:
  When "add a returning patient", the system shows that he is in the queue already. This happened due to receptionist adding him as returning patient immediately after exitting and doctor has not solved the current case from then. This can be solved by giving receptionist a "delete entry" button from the queue, such that the entry can be re-added.

- Patient asks reception that he has got reports:
  Already described

- Patient is waiting near doctor's door and he enters:
  Receptionist asks him to give the receipt before going in, or asks for his name, if not possible, she creates a "temp user" account and marks as current.

- Patient never returns:
  Receptionist "drop"s them

- Patient comes back before the next new person can enter:
  Receptionist adds them in returning list and now he can now enter before the _new_ person and the remaining returning list users. after all , priority will be given to returning users.

**Testing Center**

1. Patient comes for registration:
   Same as in doctor's office, no returning nonsense. When registering, The receipt from main office is used for checking is the user paid or not or if user is a returning user and he is ok for these tests. From the receipt, patient information can be taken, such as token number and name, using those, a new token number receipt with qr code is generated.

- Patient is alone:
- Patient is not alone and have 2 children at once:
  Does not create a group, entry happens one per person

2. Patient is waiting:
   Same as in doctor's office

- Patient turn is in next (c \* 4) turns:
- Patient turn is not in next (c \* 4) turns:
- Patient is first:
- Patient is next:

3. Patient gets called from reception:
   Same as in doctor's office

- Patient appears on call:
- Patient does not appear on call:
  Patient is "drop"ped:

4. Patient enters testing area:

5. Patient exits testing area:
   When patient exits, the testing receptionist can check if report was generated on the spot and then she "done"s it. if report was not generated, a receipt is assigned to the patient for report pickup.

- Patient has a report with them:
  Receptionist "done"s it and "call next"

- Patient does not have a report with them:
  Receptionist logs in the lab report system and "adds them" as "SAMPLE GIVEN"

- Patient's testing could not be done:
  Receptionist "done"s it and "call next"

- Patient's testing is done:
  Saem as above

**Lab Report Generation**

1. Patient registration:
   Registration happens from the testing counter, after seeing that report was not generated on the spot.

2. Patient Status Update:
   As the report is generated, the reception system/lab system (logged in to same system) can mark the report of that user as "RETRIVE REPORT"

3. Patient takes report:
   Till "RETRIEVE REPORT", patient is free, after which he can take the report using the receipt given by the testing counter afterwards.

---

Cases that are handled by system/server:

1. Patient getting QR-scannable Receipt:
   Using QR, patient checks waiting time. Testing area checks if user is registered for test and paid for it and returning user. how does testing area does it? They have their own scanner, which polls the reception area system and gets user data. After testing, a new receipt is given using same user data, for retrieving and checking lab report status.

2. Handling multiple queues and concurrent handling of multiple users on same system:
   The system is set for concurrent resources handling. The system can set how many resources at any time.

3. Decoupled systems:
   Systems are not synced, if network connectivity lost, then using paper forms for information transfer is done.

4. Waiting time calculation on User Interface:
   Waiting time is calculated by extending the current doctor's time with avg time and avg time + ((users before - remaing doctors) - avg time)

5. Offline-first approach:
   Before anything is sent to server, offline is saved everything. As new data comes, it is polled to server. If cannot be polled, saved till network appears.

6. Physical forms can be used instead of digital tokens for extracting patient information:
   As mentioned above/below

---

Miscellaneous cases:

- if a receipt is lost, receipt can be created anytime if the user is not "drop"ped, "delete"d or "resolve"d or "retrieve"d.

- When no network conenctivity, testing area goes to reception office, takes the form on which token number and name is written, and then registers the user for testing

- A reception can "PAUSE" the queue when doctors take break

- A reception can "PAUSE" only one doctor/resource if only one is taking break
