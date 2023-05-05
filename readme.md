# Visualization of Kinship Terms

By Kevin Chen and Muqeeth Mohammed as part of COMP 590 Visualization Final Project.

See the site in action here!: https://kekevi.github.io/kinship-terms-viz/

Proposal, presentation, papers can be found in this shared Google Drive: https://drive.google.com/drive/folders/1nZQrv0dvzl2laAdOR_KCTCzbOwLu_RIP?usp=sharing

NOTE: Final paper is also in this repo titled [`Interactive_visualization_of_kinships_terms.pdf`](Interactive_visualization_of_kinships_terms.pdf).

## Acknowledgements

This project is based off of Balkan's FamilyTreeJS library.

Data/algorithms for English and Chinese is given by Steve Morse (https://stevemorse.org/relation/calculator.html) and mumuy/passer-by's Chinese relationship calculator (https://github.com/mumuy/relationship/).

## Adding Languages

You can add more languages by creating a new class that extends `Kinship` and creating a function `getName` that takes in a string path as input.

Then add an `<option>` to the `<select>` element for that language.

Paths have the following grammar:

```
[path] := _[sex].([node].)*
[node] := [gen][sex]
[gen] := + | - | < | > | = | ~
[sex] := m | f | _
```

For example, maternal uncle has the path: `__.+f.=m`. 

In summary:
* nodes are made up of a generation `[gen]` followed by a sex
* `.` separate nodes
* `+` indicates a parent 
* `-` indicates a child
* `=`, `>`, `<` indicates a sibling, elder sibling, and younger sibling respectively
* `~` indicates a spousal/conjugal relationship
* `m`, `f` represent male and female respectively
* `_` as sex represents any sex

The `id` field of Balkan FamilyTreeJS nodes are the path of the node.

## To-dos:
* fix bugs with step relationships / make it more explicit
* add sibling buttons rather than going parent to child (w/ support for elder/younger)
* add 2-language mode (each node shows two terms at once)
* add step-X-in-law relationships to English algorithm
* add cross tree name (e.g. what does relative A call relative B)
* add search bar that will automatically build the tree to get to a specific term
* add reset and save/load buttons
* add ability to swap sex of root node (You/user)
