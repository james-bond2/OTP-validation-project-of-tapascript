let generatedOTP;

const otpExpireElement = document.getElementById('otp-expire')

let intervalID;

let timeoutID;

function expireOTP (){
    const totalTime = 15000;
    const interval = 1000;

    let slice = totalTime / interval;

    intervalID = setInterval(function (){
        otpExpireElement.innerText = `OTP will expire in ${slice}`;
        slice = slice - 1;
    }, interval)
    timeoutID = setTimeout(function (){
        otpExpireElement.innerText = 'OTP expired'
        clearInterval(intervalID)
        generateOTP()
    },totalTime)
    return timeoutID;
}

function tackleOTPBoxes(){
    const boxes = document.getElementById('box-list')
    boxes.addEventListener('input', function (ev){
        const target = ev.target;
        const value = target.value;

        if (isNaN(value)) {
            target.value = "";
            return;
        }

        const nextElement = target.nextElementSibling;
        if (nextElement){
            nextElement.focus()
        }
        validateOTP()
    })
}


function generateOTP(){
    generatedOTP = Math.floor(1000 + Math.random()*9000);
    const otpElement = document.getElementById('generated-otp')

    otpElement.innerText = `Your OTP : ${generatedOTP}`;
    expireOTP();
}

function newOTP (){
    clearInterval(intervalID)
    clearTimeout(timeoutID)
    generateOTP()
}

function validateOTP(){
    let typedNum = ""
    const boxListElement = document.getElementById('box-list');
    [...boxListElement.children].forEach((elem) => {
        typedNum = typedNum + elem.value
    })

    console.log(generatedOTP,typedNum)
    const result = (generatedOTP === parseInt(typedNum, 10));
    const resultElem = document.getElementById('validation-message')
    if (result){
        resultElem.innerText = 'OTP validated Successfully !!!'
        resultElem.classList.remove('fail')
        resultElem.classList.add('success')
        clearTimeout(timeoutID);
        clearInterval(intervalID);
    } else {
        resultElem.innerText = 'OTP is invalid.'
        resultElem.classList.remove('success')
        resultElem.classList.add('fail')

    }
}



function call(){
    tackleOTPBoxes()
    setTimeout(generateOTP,2000)
    validateOTP()
    console.log('thik ache!')
}
call()