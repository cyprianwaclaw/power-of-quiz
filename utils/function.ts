
export function ErrorInput(text: string,) {
  let result = {
    plMessage: '',
    errorInput: false
  }
  if (text == "The given data was invalid.") {
    result = {
      plMessage: '',
      errorInput: true
    }
  }
  else if (text == "This User does not exist, check your details") {
    result = {
      plMessage: 'Podany użytkownik  nie istnieje, sprawdź poprawność danych',
      errorInput: true
    }
  }
  return result;
}


export function onInvalidSubmit() {
  const submitBtn:any = document.querySelector("#submit");
  submitBtn.classList.add("invalid");
  setTimeout(() => {
    submitBtn.classList.remove("invalid");
  }, 400);
}


// TODO: Dodać wszystkie linki
export function RouteChange(name: string) {
  let result = "";

  // aktywny domek - menu
  if (name == "/panel") {
    result = "home";
  }

  // aktywne osoby - menu
  else if (name == "/panel/zaproszeni") {
    result = "invite";
  }

  // aktywne konto - menu
  else if (name == "/panel/konto") {
    result = "account";
  }

  else if (name == "/panel/konto/srodki/wyplata") {
    result = "account";
  }
  else if (name == "/panel/konto/srodki") {
    result = "account";
  }
  // aktywny quiz - menu
  else if (name == "/panel/quiz") {
    result = "quiz";
  }


  return result;
}

export function AddAnswer(correct: number, incorrect: number){
  return correct + incorrect
  }

 export  function ChangePlaceholderInput(name: any, text:any){
    let results = {
      placeholder: '',
      class: ''
    }
    if(!name){
      results = {
        placeholder: text,
        class: 'input-not-data'
      }
    } 
    else {
      results = {
        placeholder: name,
        class: 'input-data'
      }
    }
    return results;
}

export function ChangeDataInput(value: any, apiData:any){
  let results = ''
  if(value){
results= value
  } else if(apiData){
    results = apiData
  }
  return results;
}


export function indexBigger (index: number){
  let results = false
  if(index > 0){
  results = true
  }
return results
}

export function changeDifficult(text:any){
  let result:string = ''
  if(text == 'easy'){
    result = 'Łatwy'
  } 
  if(text == 'medium'){
    result = 'Średni'
  } 
  if(text == 'hard'){
    result = 'Trudny'
  } 
  return result;
}

export function changeStatus(number:number){
  let result:string = ''
  if(number == 0){
    result = 'W oczekiwaniu na akceptację'
  } 
  if(number == 1){
    result = 'Aktywny'
  } 
  return result;
}


export const changePayoutsStatus = (name: string)=>{
  let results:any={
      name: '',
      class:''
  }
  if(name == 'success'){
      results = {
          name: 'Wypłacono',
          class: 'font-medium green'
      }
  } else if(name == 'fail'){
      results = {
          name: 'Błąd wypłaty',
          class: 'red font-medium'
      }
  } else {
      results = {
          name: 'W oczekiwaniu',
          class: 'font-medium wait'
      }
  }
  return results;
  }

//   export const isClose = (isOpen:boolean)=>{
//    return true
// }

export  const dataURLtoBlob = (dataURL:any) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};