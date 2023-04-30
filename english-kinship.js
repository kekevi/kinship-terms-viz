// import { Kinship } from "./kinship";



var debugging = 0;

var height = 0;
var width = 1;
var gender = 2;
var sibling = 3; // not used
var selfSpouse = 4;
var parentSpouse = 5;
var siblingSpouse = 6;
var childSpouse = 7;
var otherSpouse = 8;
var valid = 9;

var answers = [];
var genders = [];
var value1  = "";
var value2 = "";
// The genders array prevents us from making the following error:
//    father's father's daughter = aunt & could also be mother
//    the correct answer is simply aunt -- mother is incorrect

function Spouse(sex) {
  var input = value;
  if (input != "") {
    input += "'s ";
  }
  if (sex == 'm') {
    input += "husband";
  } else if (sex == 'f') {
    input += "wife";
  } else { // sex is ''
    input += "spouse";
  }
  value = input;

  var origLength = answers.length
  for (i=0; i<origLength; i++) {
    if (answers[i][childSpouse] || answers[i][siblingSpouse] || answers[i][otherSpouse] ||
        (answers[i][selfSpouse] && answers[i][height] == 0) && answers[i][width] == 0) {
      // can't go any further
      answers[i][valid] = 0; // indicates it is no longer valid
      continue;
    }
    answers[i][gender] = sex;
    if (answers[i][height] == 0 && answers[i][width] == 0) { // self
      answers[i][selfSpouse] = 1;
    } else if (answers[i][height] > 0 && answers[i][width] == 0) { // parent
      answers[i][parentSpouse] = 1;
    } else if (answers[i][height] == 0 && answers[i][width] == 1) { // sibling
      answers[i][siblingSpouse] = 1;
    } else if (answers[i][height] < 0 && answers[i][width] == 0) { // child
      answers[i][childSpouse] = 1;
    } else {
      answers[i][otherSpouse] = 1;
    }

    w = answers[i][width];
    if (w == 0) {
      h = answers[i][height];
      genders[h] = sex;
    }
//@@@@@
  }
  Display();
}

function Ordinal(i) {
  if (i<10 || i>20) {
    if (i%10 == 1) {
      return "1st";
    } else if (i%10 == 2) {
      return "2nd";
    } else if (i%10 == 3) {
      return "3rd";
    }
  }
  return i + "th";
}

function Times(i) {
  if (i == 1) {
    return "once";
  } else if (i == 2) {
    return "twice";
  } else {
    return i + " times";
  }
}

function Great(i) {
  var result = "";
  for (var j=0; j<i; j++) {
    result += "great ";
  }
  return result;
/*
  var result = "";
  for (var j=0; j<i; j++) {
    if (result != "") {
      result += " ";
    }
    result += "great";
  }
  return result + " ";
*/
}

function Grand(i) {
  var result = "";
  for (var j=0; j<i; j++) {
    if (result != "") {
      result += " ";
    }
    if (j != i-1) {
      result += "great";
    } else {
      result += "grand";
    }
  }
  return result;
}

function DebugSuffix(i) {
  var g = answers[i][gender];
  if (g == "") {
    g = "?";
  }
  var answer = "(" +
    answers[i][height] + "," + answers[i][width] + "," + g + "," + answers[i][sibling] + "," +
    answers[i][selfSpouse] + "," + answers[i][parentSpouse] + "," +
    answers[i][siblingSpouse] + "," + answers[i][childSpouse] + "," +
    answers[i][otherSpouse] + "," + answers[i][valid] + ") (";
  for (var j=-5; j<=+5; j++) {
    if (genders[j] != undefined) {
      answer += j + ":" + genders[j] + "|";
    }
  } 
  answer += ")";
  return answer;
}

function Display() {

  // convert array of triplets to displayable text

  var answer = "";
  var answer = "";
  for (var i=0; i<answers.length; i++) {

    // extract the values in this triplet

    var h = answers[i][height];
    var w = answers[i][width];
    var g = answers[i][gender];
    var sbl = answers[i][sibling];
    var ss = answers[i][selfSpouse];
    var ps = answers[i][parentSpouse];
    var sbs = answers[i][siblingSpouse];
    var cs = answers[i][childSpouse];
    var os = answers[i][otherSpouse];
    var v = answers[i][valid]

    // ignore duplicate entries

    var duplicate = 0;
    for (var j=0; j<i; j++) {
      if (answers[j][height] == h && answers[j][width] == w && answers[j][gender] == g && answers[j][sibling] == sbl &&
          answers[j][selfSpouse] == ss && answers[j][parentSpouse] == ps &&
          answers[j][siblingSpouse] == sbs && answers[j][childSpouse] == cs &&
          answers[j][otherSpouse] == os && answers[j][valid] == v) {
        duplicate = 1;
        break;
      }
    }
    if (duplicate) {
      continue;
    }

    // separate alternates by commas

    if (answer != "") {
      answer += ", ";
    }

    if (!v) {
      answer += "???";
      if (debugging) {
        answer += DebugSuffix(i);
      }
      continue;
    }

    if (h == 0) { // same generation
      if (w == 0) {
        if (value != "") {
          if (ss) {
            if (g == 'm') {
              answer += "husband";
            } else if (g == 'f') {
              answer += "wife";
            } else {
              answer += "spouse";
            }
          } else {
            answer += "self";
          }
        }
      } else if (w == 1) {
        if (ps) {
          answer += "step ";
        }
        if (g == 'm') {
          answer += "brother";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", brother";
          }
        } else if (g == 'f') {
          answer += "sister";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", sister";
          }
        } else {
          answer += "sibling";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", sibling";
          }
        }
        if (ss || sbs) {
          answer += " in law";
        }
      } else {
        answer += Ordinal(w-1) + " cousin"; 
      }
    } else if (h > 0) { // relative is on higher generation
      if (ps) {
        answer += "step ";
      }
      if (w == 0) {
        if (g == 'm') {
          answer += Grand(h-1) + "father";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Grand(h-1) + "father";
          }
        } else if (g == 'f') {
          answer += Grand(h-1) + "mother";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Grand(h-1) + "mother";
          }
        } else {
          answer += Grand(h-1) + "parent";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Grand(h-1) + "parent";
          }
        }
        if (ss) {
          answer += " in law";
        }
      } else if (w == 1) {
        if (g == 'm') {
          answer += Great(h-1) + "uncle";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Great(h-1) + "uncle";
          }
        } else if (g == 'f') {
          answer += Great(h-1) + "aunt";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Great(h-1) + "aunt";
          }
        } else {
          answer += Great(h-1) + "uncle/aunt";
          if (ps) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Great(h-1) + "uncle/aunt";
          }
        }
      } else {
        answer += Ordinal(w-1) + " cousin " + Times(h) + " removed";
        if (ps) {
          if (debugging) {
            answer += DebugSuffix(i);
          }
          answer += ", " + Ordinal(w-1) + " cousin " + Times(h) + " removed";
        }
      }

    } else { // h < 0, relative is on lower generation
      h = -h;
      if (w == 0) {
        if (ss) {
          answer += "step ";
        }
        if (g == 'm') {
          answer += Grand(h-1) + "son";
          if (ss) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Grand(h-1) + "son";
          }
        } else if (g == 'f') {
          answer += Grand(h-1) + "daughter";
          if (ss) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Grand(h-1) + "daughter";
          }
        } else {
          answer += Grand(h-1) + "child";
          if (ss) {
            if (debugging) {
              answer += DebugSuffix(i);
            }
            answer += ", " + Grand(h-1) + "child";
          }
        }
        if (cs) {
          answer += " in law";
        }
      } else if (w == 1) {
        if (g == 'm') {
          answer += Great(h-1) + "nephew";
        } else if (g == 'f') {
          answer += Great(h-1) + "niece";
        } else {
          answer += Great(h-1) + "nephew/niece";
        }
      } else {
        answer += Ordinal(w-1) + " cousin " + Times(h) + " removed"; 
      }
    }

    if (debugging) {
      answer += DebugSuffix(i);
    }
  }
  var comma = answer.indexOf(", ");
  if (comma == -1) {
    value = answer;
    value2 = "";
  } else {
    value = answer.substr(0, comma);
    value2 = answer.substr(comma+2);
  }

  if (value != "") {
    if (answers[0][selfSpouse] || answers[0][parentSpouse] || answers[0][siblingSpouse] ||
        answers[0][childSpouse] || answers[0][otherSpouse]) {
      value += "  (non-blood relative)";
    } else {
      value += "  (blood relative)";
    }
  }
}

function NewAnswer(i) {
  answers[i][height] = 0;
  answers[i][width] = 0;
  answers[i][gender] = '';
  answers[i][sibling] = '0';
  answers[i][selfSpouse] = 0;
  answers[i][parentSpouse] = 0;
  answers[i][siblingSpouse] = 0;
  answers[i][childSpouse] = 0;
  answers[i][otherSpouse] = 0;
  answers[i][valid] = 1;
}

function Calculate(delta, sex) {

  // display keystrokes that the user typed

  var input = value;
  if (input != "") {
    input += "'s ";
  }
  if (delta == 1) {
    if (sex == 'm') {
      input += "father";
    } else if (sex == 'f') {
      input += "mother";
    } else { // sex is ''
      input += "parent";
    }
  } else if (delta == 0) {
    if (sex == 'm') {
      input += "brother";
    } else if (sex == 'f') {
      input += "sister";
    } else { // sex is ''
      input += "sibling";
    }
  } else { // delta is -1
    if (sex == 'm') {
      input += "son";
    } else if (sex == 'f') {
      input += "daughter";
    } else { // sex is ''
      input += "child";
    }
  }
  value = input;

  // calculate the relationship as a n-tuple

  var origLength = answers.length
  for (i=0; i<origLength; i++) {
    answers[i][gender] = sex;

    h = answers[i][height];
    w = answers[i][width];
    g = answers[i][gender];
    var sbl = answers[i][sibling];
    var ss = answers[i][selfSpouse];
    var ps = answers[i][parentSpouse];
    var sbs = answers[i][siblingSpouse];
    var cs = answers[i][childSpouse];
    var os = answers[i][otherSpouse];

    if (cs || sbs || os) { // can't get any further relationships
      answers[i][valid] = 0; // indicates it is no longer valid
      continue;
    }

    if (delta == 1) {
      answers[i][height] = ++h;
      if (h == 0 && w == 0) { // e.g., child's parent
        // came from child back to self, so assume it is my spouse
        answers[i][selfSpouse] = 1;
        if (genders[h] == "" || g == "" || genders[h] == g) {
          var len = answers.length;
          answers[len] = [[]];
          NewAnswer(len); // and it could be myself
          answers[len][gender] = (g == "") ? genders[h] : g;
        }
      } else if (h == 0 && w == 1) { // e.g., sibling's child's parent
        if (genders[h] != "" && g != "" && genders[h] != g) {
          answers[i][siblingSpouse] = 1;
        }
      } else if (h < 0) { // e.g., child's child's parent
        if (genders[h] == "" || g == "" || genders[h] == g) {
          answers[i][gender] =  (g == "") ? genders[h] : g;
          var len = answers.length;
          answers[len] = [[]];
          NewAnswer(len);
          answers[len][height] = h;
          answers[len][childSpouse] = 1;
          if (g != "") {
            answers[len][gender] = g;
          } else if (genders[h] == 'm') {
            answers[len][gender] = 'f';
          } else if (genders[h] == 'f') {
            answers[len][gender] = 'm';
          } else {
            answers[len][gender] = "";
          }
        } else {
          answers[i][childSpouse] = 1;
        }
      }
      if (w > 0 && h > 0) {
        answers[i][width] = --w;
      }
    } else if (delta == -1) {
      answers[i][height] = --h;
      if (h >= 0) { // e.g., parent's parent's child
        answers[i][width] = ++w;
        if (w == 1 && (genders[h] == "" || g == "" || genders[h] == g)) {
          var len = answers.length;
          answers[len] = [[]];
          NewAnswer(len);
          answers[len][height] = h;
          answers[len][parentSpouse] = ps;
          answers[len][gender] = (g == "") ? genders[h] : g;
        }
      }
    } else { // delta is 0
      if (h >= 0) { // e.g., parent's or self's sibling
        if (w == 0) {
          if (h == 0) { // self's sibling
            answers[i][sibling] = 1;
          }
          w = 1;
          answers[i][width] = w;
        } else if (w == 1 && (genders[h] == "" || g == "" || genders[h] == g)) {
          var len = answers.length;
          answers[len] = [[]];
          NewAnswer(len);
          answers[len][height] = h;
          answers[len][parentSpouse] = ps;
          answers[len][gender] = (g == "") ? genders[h] : g;
        }
      }
    }


    if (w == 0 || h <= 0) {
//          if (w == 0 && genders[h] == undefined) {
//          if (w == 0 && genders[h] != "") {
      genders[h] = g;
    }
  }

  // display the relationship

  Display();
}

function Clear() {
  value = "";
  answers = [[]];
  genders = [];
  NewAnswer(0);
  genders[0] = "";
  Display();
}


class EnglishKinship {
  /*
    English kinship terms 
  */
  getName(path) {
    Clear()
    if (path == "_"){
      return "You";
    }
    path = path.split('.')
    path.shift()
    
    for (const node of path) {
      switch (node) {
        case '+m':
          Calculate(1, 'm');
          break;
        case '-m':
          Calculate(-1, 'm');
          break;
        case '=m':
        case '>m':
        case '<m':
          Calculate(0, 'm');
          break;
        case '~m':
          Spouse('m');
          break;
        case '+f':
          Calculate(1, 'f');
          break;
        case '-f':
          Calculate(-1, 'f');
          break;
        case '=f':
        case '>f':
        case '<f':
          Calculate(0, 'f');
          break;
        case '~f':
          Spouse('f');
          break;
        default:
          break;
      }
    }
    return value
  }

}

let kinship = new EnglishKinship()

