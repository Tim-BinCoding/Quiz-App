

//=====================================================================================
// VARIBLE

let contianerFirst = document.querySelector(".contianerApp")
let contianerListTitle = document.querySelector(".contianerList")
let contianerCreate = document.querySelector(".contianerForm")
let contianerQuiz = document.querySelector(".contianerQuiz")
let listAddQu = document.querySelector(".setListAdd")
let setLists = document.querySelector(".setList")
let temporyStorage=[]

let teporyStorages=[
    { question: "Hello"},
    {answers:[
        {answer1:"hi",correct:true},
        {answer2:"hello",correct:false},
        {answer3:"Good day",correct:true},
        {answer4:"What's up?", correct:false}
        ]
    }
]

let primaryStorage = localStorage
primaryStorage.setItem("div",JSON.stringify(teporyStorages))

//=======================================================================================
// FUNCTION 

function show(element){
    element.style.display="block"
}

function hide(element){
    element.style.display="none"
}

////////////// GET VALUE FROM USER INPPUT /////////////////

function getValueFromInputs(){
    
    let getTitleQuiz=document.getElementById("getTitle").value
    let getQuestion=document.getElementById("QuestionId").value
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    if (getQuestion!=="" && answer1!=="" && answer2!=="" && answer3!=="" && answer4!==""){
        goodInput()

        addQuestions(getQuestion)
        clearInput()
    }else{
        errorInput()
    }
    addTitleQuiz(getTitleQuiz)
}

///////////////// CLEAR INFORMATION ////////

function clearInput(){
    document.getElementById("QuestionId").value=""
    document.getElementById("answer1Id").value=""
    document.getElementById("answer2Id").value=""
    document.getElementById("answer3Id").value=""
    document.getElementById("answer4Id").value=""
}

///////////// GET ANSWERS ///////////

function myAnswers(element){
    let arrayAnswers=[]
    let keyAnswers={}
    keyAnswers.answer1=element
}

///////////// SELECT ANSWERS ////////////

function selectAnswers(){
    let getAnswers=[]
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    const checkA1=document.getElementById("A1")
    const checkA2=document.getElementById("A2")
    const checkA3=document.getElementById("A3")
    const checkA4=document.getElementById("A4")

    // if (checkA1.checked){
    //     getAnswers.answer1=answer1
    // }if (checkA2.checked){
    //     getAnswers.answer2=answer2
    // }
    // if (checkA3.checked){
    //     getAnswers.answer3=answer3
    // }
    // if (checkA4.checked){
    //     getAnswers.answer4=answer4
    // }
}



//////////////// ADD QUESTION ////////////////////////

function addQuestions(question){
    const li = document.createElement("li")
    li.className = "li-getquestion"
    const span = document.createElement("span")
    span.className = "getValue"
    span.textContent=question
    li.appendChild(span)
    let btn=document.createElement("button")
    btn.className = "btnInQuest"
    li.appendChild(btn)
    const imgEdit=document.createElement("img")
    imgEdit.src="img/edit.png"
    imgEdit.className="editor"
    btn.appendChild(imgEdit)
    let imgDelete=document.createElement("img")
    imgDelete.src="img/delete-icon.png"
    imgDelete.className="deleter"
    btn.appendChild(imgDelete)
    listAddQu.appendChild(li)
    deleteQuestion(imgDelete)
}

////////////// ADD QUIZ ////////////

function addTitleQuiz(quiz){
    if (quiz!==""){
        document.getElementById("quizTitle").textContent=quiz
        document.querySelector(".titleQuiz").classList.remove("hide")
    }
}

/////////// DELETE QUESTION ////////////

function deleteQuestion(deletes){
    deletes.addEventListener("click",(e)=>{
        if (e.target==deletes){
            e.target.parentNode.parentNode.remove()
        }
    })
}

function goodInput(){
    swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Question added',
        showConfirmButton: false,
        timer: 3000
    }) 
}

function errorInput(){
    swal.fire({
        icon: 'error',
        title: 'Cannot Add',
        text: 'You need complete all',
        timer: 5000
    })
}

        ///////// SHOW LIST QUIZ ////////

function listQuizes(element){
    const li = document.createElement("li")
    li.className="li-item"
    const span = document.createElement("span")
    span.className="span-quiz"
    span.textContent="Quiz"
    const br=document.createElement("br")
    const spantitle = document.createElement("span")
    spantitle.className="title-quiz"
    spantitle.textContent=element
    li.appendChild(span)
    li.appendChild(br)
    li.appendChild(spantitle)
    setLists.appendChild(li)
}


// =====================================================================================
// EVENT BUTTON
let btnToListTitle=document.querySelector(".btn-ToQuiz")
btnToListTitle.addEventListener("click",()=>{
    hide(contianerFirst)
    hide(contianerQuiz)
    hide(contianerCreate)
    show(contianerListTitle)
})

let btnToCreate=document.querySelector(".btn-ToCreat")
btnToCreate.addEventListener("click",()=>{
    hide(contianerFirst)
    hide(contianerQuiz)
    show(contianerCreate)
    hide(contianerListTitle)
})

let btnBackToFirst=document.querySelectorAll(".imgBack")
btnBackToFirst.forEach((btnEl) =>{
    btnEl.addEventListener("click",()=>{
        hide(contianerListTitle)
        hide(contianerQuiz)
        hide(contianerCreate)
        show(contianerFirst)
    })
})

const btnAddQuestion = document.querySelector(".btnAdd")
btnAddQuestion.addEventListener("click",getValueFromInputs)

const btnSave=document.getElementById("btnSaveId")
btnSave.addEventListener("click",()=>{
    swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Quiz saved',
        showConfirmButton: false,
        timer: 3000
    }) 
    let valueTitleQuiz=document.getElementById("quizTitle").textContent
    listQuizes(valueTitleQuiz)
    document.getElementById("getTitle").value=""
    
})