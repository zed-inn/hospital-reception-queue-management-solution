# Use cases - detailed

Assumption - Queue Account already created

## Add queue details to queue

Requirements - id, name, type (doctor | test | lab), offline support

- Get the requirements
- Check account exists with id
- Create a queue domain with these requirements
- Save queue info
- Save in repository

## Add new patient to queue

Requirements - name, mobile number

- Get the requirements
- Create new patient profile id
- Add to patient profiles
- Add in the queue at last position
- save both

## Add returning patient to queue

Requirements - token number

- Get the requirements
- Get the patient with the token number
- Check the status and see if eligible for returning queue
- Get the last returning postition
- Add at the last returning position after one new
- save both

## Resolve and next patient

Requirements - token number

- Get the requirements
- Check if token number is the current
- update patient profile as done
- remove from queue
- make the top psoititon in queue as current
- save all

## Next patient

Requirements - token number

- Get the requirements
- Check if token number is the current
- remove from queue
- make the top position in queue as current
- save all

## Get current patient details

Requirements - token number

- Get the requirements
- Check if token number is current
- Get patient profile
- Get the create time
- Get the entry time
- Return all

## Get upcoming patient & details

Requirements - limit

- Get all patients profiles till limit from queue
- Get the est. wait time for each of these profiles
- Get create time for each profile
- Return all

## Get est. wait time for patient

Requirements - token number

- Get the requirements
- See if status ok for checking wait time
- Get est. wait time for that patient
- Return it

## Search patients

Requirements - name, limit

- Get the requirements
- break the name and lower case it
- Match in the profile list for that day
- return what is found

## Pause queue

- See the queue status
- pause queue
- save

## Stop queue

- See the queue status
- stop queue
- empty queue
- update patient profile status
- save all

## Start queue

- See the queue status
- start queue
- save
