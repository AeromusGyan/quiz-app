import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {


  listQuestions: any;
  allQuestion: any=[
    {
    "id": 65,"question": "Process of inserting an element in stack is called","option1": "Create", "option2": "Push","option3": "Evolution","option4": "Pop","answer": "Push","department": "CS"
    },
    {
    "id": 62, "question": "The quantity of double word is___", "option1": "16 bits", "option2": "32 bits", "option3": "4 bits", "option4": "8 bits", "answer": "32 bits","department": "CS"
    },
    {
    "id": 61,"question": "Any signed negative binary number is recognised by ___","option1": "MSB", "option2": "LSB","option3": "BYTE", "option4": "NIBBLE","answer": "MSB","department": "CS"
    },
    {
    "id": 64, "question": "A linear collection of data elements where the linear node is given by means of pointer is called ?","option1": "Linked List",  "option2": "Node List", "option3": "Primitive List","option4": "Unordered List","answer": "Linked List","department": "CS"
    },
    {
    "id": 63,"question": "Which of the following is used to choose between incrementing the PC or performing ALU operations ?","option1": "Conditional Units","option2": "Multiplexer","option3": "Control Codes","option4": "Memory Bus","answer": "Multiplexer", "department": "CS"
    },
    {
    "id": 66,"question": "Circular Queue is also known as ___","option1": "Ring Buffer","option2": "Square Buffer", "option3": "Rectangle Buffer","option4": "Curve Buffer",  "answer": "Ring Buffer","department": "CS"
    },
    {
    "id": 67,"question": "Two sets are called disjoint if there ___ id the empty set ?", "option1": "Union","option2": "Difference", "option3": "Intersection", "option4": "Complement","answer": "Intersection","department": "CS"
    },
    {
    "id": 68,"question": "Minimum subgroup of a group is called ____","option1": "a commutative subgroup","option2": "a lattice","option3": "a trivial group","option4": "a monoid","answer": "a trivial group","department": "CS"
    },
    {
    "id": 69,"question": "Which of the following sorting algorithm can be used to sort a random linked list with minimum complexity?", "option1": "Insertion Sort","option2": "Quick Sort","option3": "Heap sort", "option4": "Merge Sort", "answer": "Merge Sort",  "department": "CS"},
    {
    "id": 70,"question": "The Operation of processing each element in the list is known as", "option1": "Sorting", "option2": "Merging","option3": "Inserting","option4": "Traversal", "answer": "Traversal","department": "CS" }
    ];
  totalLength: any;
  page: number = 1;
  correct: any;
  incorrect: any;
  department: any;
  marks: any = false;
  qnsCount: number = 0;
  arrayLength: number = 0;
  next = false;
  selectedAns: any;
  selectedIndex: any;
  option = false;
  data: any;
  userprofile: any = [];
  allUser: any =  [
    {"id": 1,"userid": "Gyan Prakash", "email": "aeromusgyan@gmail.com","password": "1234","status": "active", "quizmarks": 20,rank: '1st'
    },
    {
    "id": 16,"userid": "Akshat Maurya", "email": "aaravsingh1362@gmail.com","password": "123456","status": "active","quizmarks": 18,rank: '2nd'
    },
    {
    "id": 15,"userid": "Admin", "email": "admin@minigans.com","password": "admin", "status": "active","quizmarks": 16,rank: '3rd'
    },
    {
    "id": 14,"userid": "Anand Verma", "email": "vermaanand278@gmail.com", "password": "123456", "status": "active","quizmarks": 0,rank: ''
    },
    {
    "id": 13, "userid": "Nitish","email": "nitish@gmail.com", "password": "123","status": "active","quizmarks": 0,rank: ''
    },
    {
    "id": 17, "userid": "Anshi Mitra","email": "minigans22@gmail.com","password": "1234", "status": "active","quizmarks": 0,rank: ''
    }];

  profile = [
    {userid: "GYAN PRAKASH",email: "admin@minigans.com",password: "admin", quizmarks: '18',rank: '2nd'
  }];

  constructor(private api: ApiService) {
    this.data = localStorage.getItem("userdata");
    if (this.data != null) {
      this.userprofile = JSON.parse(this.data);
    }
  }
  ngOnInit(): void {
    // this.api.getAllQuestion().subscribe((res) => {
    //   this.allQuestion = res.data;
    //   this.totalLength = res.length;
       this.arrayLength = this.allQuestion.length;
       this.allQuestion.sort(() => 0.5 - Math.random());
       for (var i in this.allQuestion) {
         this.allQuestion[i].userans = "";
       }
    // })
  }

  userans(pos: any, ans: any) {
    this.allQuestion[pos].userans = ans;
    //console.log(this.allQuestion[pos].userans);
    localStorage.setItem('qans', this.allQuestion[pos].userans);
    this.selectedIndex = this.allQuestion[pos].answer;
    if (this.allQuestion[pos]) {
      this.option = true;
    }
    this.checkResult();
  }

  checkResult() {
    var correctAns: any = 0, incorrectAns: any = 0, x = 0;
    x = this.allQuestion.length;
    for (var i in this.allQuestion) {
      if (this.allQuestion[i].userans == this.allQuestion[i].answer) {
        correctAns++;
        this.correct = correctAns;
        localStorage.setItem('Correct Answer', this.correct = correctAns)
      }
      else {
        incorrectAns++;
        this.incorrect = incorrectAns;
      }
    }
  }

  QuizSubmit() {
    this.checkResult();
    this.marks = true;
    window.location.href = '/result';
  }
  nextQns() {
    this.checkResult();
    this.qnsCount++;
    this.option = false;
    if (this.qnsCount == this.arrayLength) {
      this.marks = true;
      this.next = true;
      this.allQuestion.sort(() => 0.5 - Math.random());
      this.leaderboard();
    }
  }
  prevQns(){
    if(this.qnsCount>0){
      this.qnsCount--;
    }
  }
  restart() {
    window.location.href = '/quizes';
  }
  leaderboard() {
    this.allUser;
    // this.api.getAllUser().subscribe((res) => {
       //= res.data;
   // }
   // )
  }
}
