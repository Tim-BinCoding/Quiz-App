

//=====================================================================================
// VARIBLE

let contianerFirst = document.querySelector(".contianerApp")
let contianerListTitle = document.querySelector(".contianerList")
let contianerCreate = document.querySelector(".contianerForm")
let contianerQuiz = document.querySelector(".contianerQuiz")
let listAddQu = document.querySelector(".setListAdd")
let setLists = document.querySelector(".setList")

let checkAllBox = document.getElementsByName("check")
countAddQ=0

////// LOCAL STORAGE ///////

function myLocalStorages(){
    let localID=localStorage.length
    localStorage.setItem("quiz"+localID,JSON.stringify(primaryStorage))
    primaryStorage=[]
}

//=======================================================================================
// FUNCTION 

function show(element){
    element.style.display="block"
}

function hide(element){
    element.style.display="none"
}


///////////// SELECT ANSWERS ////////////

function selectAnswers(){
    let temporyStorages=[]
    let keyQuestion={}
    let getAnswers=[]
    let quizTitle=document.getElementById("getTitle").value
    let getQuestion=document.getElementById("QuestionId").value
    let answer1=document.getElementById("answer1Id").value
    let answer2=document.getElementById("answer2Id").value
    let answer3=document.getElementById("answer3Id").value
    let answer4=document.getElementById("answer4Id").value
    const checkA1=document.getElementById("A1")
    const checkA2=document.getElementById("A2")
    const checkA3=document.getElementById("A3")
    const checkA4=document.getElementById("A4")
    if (getQuestion!=="" && answer1!=="" && answer2!=="" && answer3!=="" && answer4!==""){
        if (checkA1.checked || checkA2.checked || checkA3.checked || checkA4.checked){
            keyQuestion.question=getQuestion
            for (let N=1; N<=4; N++){
                let keyAnswers={}
                if (N==1){
                    keyAnswers.answer1= answer1
                    keyAnswers.correct=checkA1.checked
                    getAnswers.push(keyAnswers)
                }
                if(N==2){
                    keyAnswers.answer2= answer2
                    keyAnswers.correct=checkA2.checked
                    getAnswers.push(keyAnswers)
                }if (N==3){
                    keyAnswers.answer3= answer3
                    keyAnswers.correct=checkA3.checked
                    getAnswers.push(keyAnswers)
                }if (N==4){
                    keyAnswers.answer4= answer4
                    keyAnswers.correct=checkA4.checked
                    getAnswers.push(keyAnswers)
                }
                
            }
            goodInput()
            addQuestions(getQuestion)
            clearInput()
            temporyStorages.push(keyQuestion)
            temporyStorages.push(getAnswers)
            myAnswers(temporyStorages)
            addTitleQuiz(quizTitle)
            deSelectAnswers()
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot Add',
                text: 'Please select your answer',
                timer: 5000
            })
        }
    }else{
        errorInput()
    }
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
let primaryStorage=[]
function myAnswers(element){
    primaryStorage.push(element)
}

/////// EDIT QUESTION AN ANSWERS //////////////

function CheckToEdit(edit){
    edit.addEventListener("click",(e)=>{
        if (e.target==edit){
            let index=e.target.id
            document.getElementById("QuestionId").value=primaryStorage[index][0].question
            document.getElementById("answer1Id").value=primaryStorage[index][1][0].answer1
            document.getElementById("answer2Id").value=primaryStorage[index][1][1].answer2
            document.getElementById("answer3Id").value=primaryStorage[index][1][2].answer3
            document.getElementById("answer4Id").value=primaryStorage[index][1][3].answer4
            primaryStorage.splice(index,1)
            e.target.parentNode.parentNode.remove()
            document.querySelector(".btnAdd").value="Update"
        }
    })
}

//////////////// DESELECTED /////////////
function deSelectAnswers(){
    checkAllBox.forEach((elBox)=> elBox.checked=false)
    document.querySelector(".btnAdd").value="Add+"
}

//////////////// ADD QUESTION ////////////////////////
function addQuestions(question){
    countAddQ=primaryStorage.length
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
    imgEdit.id=countAddQ
    btn.appendChild(imgEdit)
    let imgDelete=document.createElement("img")
    imgDelete.src="img/delete-icon.png"
    imgDelete.className="deleter"
    btn.appendChild(imgDelete)
    listAddQu.appendChild(li)
    deleteQuestion(imgDelete)
    CheckToEdit(imgEdit)
    console.log("storage: ",primaryStorage);
    
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

//////////// SHOW LIST QUIZ ////////////

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
    goToPlayQuiz(li)

}

/////// GO TO PLAY QUIZ ////////

function goToPlayQuiz(liQuiz){
    liQuiz.addEventListener("click",()=>{
        hide(contianerFirst)
        show(contianerQuiz)
        hide(contianerCreate)
        hide(contianerListTitle)
    })
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
btnAddQuestion.addEventListener("click",selectAnswers)

const btnSave=document.getElementById("btnSaveId")
btnSave.addEventListener("click",()=>{
    let putTitle=document.getElementById("getTitle").value
    if (putTitle!=""){
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Quiz saved',
            showConfirmButton: false,
            timer: 3000
        }) 
        listQuizes(putTitle)
        document.getElementById("getTitle").value=""
    }else{
        swal.fire({
            icon: 'error',
            title: 'Cannot Save',
            text: 'Nothing title',
            timer: 5000
        })
    } 
    myLocalStorages()
})