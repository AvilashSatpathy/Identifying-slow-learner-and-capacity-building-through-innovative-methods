const quiz = [
    {
        question: "The average of Sohan's marks in 6 subjects is 74. If his average in five subjects excluding science is 70, how many marks he obtained in science?",
        ans1text: "94",
        ans2text: "92",
        ans3text: "90",
        ans4text: "88",
        answer: "94",
    },
    {
        question: "Average age of a group of 30 boys is 16 years. A boy of age 19 leaves the group and a new boy joins the group. If the new average age of the group is 15.8 years, find the age of the new boy.",
        ans1text: "12 years",
        ans2text: "13 years",
        ans3text: "14 years",
        ans4text: "15 years",
        answer: "13 years",
    },{
        question: "The average weight of 10 men is decreased by 2 kg when one of them whose weight is 60 kg is replaced by a new man. What is the weight of the new man?",
        ans1text: "35 kg",
        ans2text: "40 kg",
        ans3text: "45 kg",
        ans4text: "50 kg",
        answer: "40 kg",
    },
    {
        question: "What is the average of first five natural numbers?",
        ans1text: "5",
        ans2text: "2",
        ans3text: "3",
        ans4text: "4",
        answer: "3",

    },{
        question: "Mohan gets a salary of Rs. 6435, Rs. 6927, Rs. 6855, Rs. 7230 and Rs. 6562 for 5 months. How much salary he must have in the sixth month so that he gets an average of Rs. 6500?",
        ans1text: "4091",
        ans2text: "4991",
        ans3text: "3499",
        ans4text: "3344",
        answer: "4991",

    }
]
const question = document.getElementById("quiz-question");
console.log(question);
console.log(question.textContent)
const option_a = document.getElementById("text_option_a");
const option_b = document.getElementById("text_option_b");
const option_c = document.getElementById("text_option_c");
const option_d = document.getElementById("text_option_d");
const answerElement = document.querySelectorAll(".answer");
console.log(option_a);
console.log(option_b);  
console.log(option_c);
console.log(option_d);
console.log(option_a.textContent);
console.log(option_b.textContent);
console.log(option_c.textContent);
console.log(option_d.textContent);

const submit = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

console.log(quiz[currentQuestion].question);
console.log(quiz[currentQuestion].ans1text);
console.log(quiz[currentQuestion].ans2text);
console.log(quiz[currentQuestion].ans3text);
console.log(quiz[currentQuestion].ans4text);

question.textContent = quiz[currentQuestion].question;
option_a.textContent = quiz[currentQuestion].ans1text;
option_b.textContent = quiz[currentQuestion].ans2text;
option_c.textContent = quiz[currentQuestion].ans3text;
option_d.textContent = quiz[currentQuestion].ans4text;


submit.addEventListener("click", () => {
    const checkedAns = document.querySelector('input[type="radio"]:checked')
    console.log(checkedAns);
    // console.log(checkedAns.nextElementSibling.textContent);
    if( checkedAns === null){
        alert("Please select an answer");
    }else{
        if( checkedAns.nextElementSibling.textContent === quiz[currentQuestion].answer){
            score++;
        }

        currentQuestion++;
        if( currentQuestion < quiz.length){
            question.textContent = quiz[currentQuestion].question;
            option_a.textContent = quiz[currentQuestion].ans1text;
            option_b.textContent = quiz[currentQuestion].ans2text;
            option_c.textContent = quiz[currentQuestion].ans3text;
            option_d.textContent = quiz[currentQuestion].ans4text;
            checkedAns.checked = false;
        }else{
            alert("Your score is " + score + " out of " + quiz.length);
            location.reload();
        }

    }
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Add the "active" class to trigger the fade-in animation
    document.getElementById("quiz-question").classList.add("active");
    document.querySelectorAll(".answer label").forEach(function (label) {
        label.classList.add("active");
    });
});

