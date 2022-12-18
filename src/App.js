import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

const validate=(values)=>{
  const errors={}
  if(values.name && values.name.length<4 ){
      errors.name="username should have at least 4 characters"
      
  }
  if(values.surname && values.surname.length<4){
    errors.surname="surname should have at least 4 characters"
}
  if(values.email && !values.email.includes("@gmail.com")){
      errors.email="email should include @gmail.com"
  }
  if(values.age && values.age<18){
    errors.age="min 18 year"
  }
  if(!values.gender){
    errors.gender="gender is important"
  }
  console.log(values.gender)
  return errors
}
function UserList({userList,setUserList }) {

  return (
    <ul>
      {userList.map((elem, index) => {

        return (
          <li key={elem.id}> {elem.name}
          {" "}{elem.surname}  {" "}
           {elem.age} years old   {" "}
           {elem.gender}  {" "} id: {elem.id}
            <button>EDIT</button>   
            <button onClick={()=>{
              const newList=userList.filter((item,indexs)=>{
                return index !==indexs
              })
              setUserList(newList)
            }}>DELETE</button>
          </li>

        )

      })}
    </ul>
  )
}
function Errortext({formErrors}){
  return(
    <div>
        {formErrors.name && <p style={{color:"red"}}>{formErrors.name}</p>}
      {formErrors.surname && <p style={{color:"red"}}>{formErrors.surname} </p>}
      {formErrors.email && <p style={{color:"red"}}>{formErrors.email}</p>}
      {formErrors.age && <p style={{color:"red"}}>{formErrors.age}</p>}
      {formErrors.gender && <p style={{color:"red"}}>{formErrors.gender}</p>}
    </div>

  )
}
function Inputdiv({saveUser,formValue,formErrors,onFormChange,isFormValid,onChange}){
  return(  <form onSubmit={saveUser}>
        <label>userName</label> <br></br>
        <input type="text" name="name" placeholder='userName' value={formValue.name} onChange={onFormChange} className={`${formErrors.name ? "red":"black" }`}/><br></br>

        <label>surName</label> <br></br>
        <input type="text" name="surname" placeholder='surName' value={formValue.surname} onChange={onFormChange} className={formErrors.surname ? "red":"black"} /><br></br>

        <label>mail</label> <br></br>
        <input type="text" name="email" placeholder='email' value={formValue.email} onChange={onFormChange} className={formErrors.email ? "red":"black"} /><br></br>

        <label>age</label> <br></br>
        <input type="number" min="0"name="age" placeholder='age' value={formValue.age} onChange={onFormChange} className={formErrors.age ? "red":"black"}  /><br></br>

        {/* <label>gender</label> */}
        <select onChange={onFormChange} name="gender" value={formValue.gender}  className={formErrors.gender ? "red":"black"} >
          <option >choose gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select> <br></br>

          <button disabled={!isFormValid}>submit</button>


      </form>
  )
}

function App() {

  const [formValue, setFormValue] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
    gender: "",
    id: ""

  })
  const [formErrors,setFormErrors]=useState({})
  const [userList, setUserList] = useState([])
  const [isFormValid,setIsFormValid]=useState(false)

  const onFormChange = (e) => {
    setFormValue((prev) => ({
      ...prev, [e.target.name]: e.target.value

    }))

  }
  const saveUser = (e) => {
    e.preventDefault()

    const unique = () => {
      return Math.floor(Math.random() * (500 - 200 + 1)) + 200
    }

   formValue.id=unique()
  
    setFormValue(
        
        {
        name: "",
        surname: "",
        email: "",
        age: "",
        gender: "",
        id: ""
      }
       
      )
      
    setUserList(prevuserslist => [...prevuserslist, formValue])

    setIsFormValid(false)
    

  }

  useEffect(()=>{
   
    const timer=setTimeout(()=>{
        const validationResult=validate(formValue)
        setFormErrors(validationResult);
        if(formValue.name&&
        !validationResult.name&&
        formValue.surname&&
        !validationResult.surname&&
        !validationResult.email&&
        formValue.age&&
        !validationResult.age
        &&
        formValue.gender&&
        !validationResult.gender
        ){
          setIsFormValid(true)
        }else{
          setIsFormValid(false)

        }
    },500);
    return ()=>{
        clearTimeout(timer)
    }
},[formValue])



  return (
    <> 
      
    <div className='input_div'>
    <h1 style={{textAlign:"center"}}> controlled component</h1>
      <Inputdiv 
      saveUser={saveUser}
      formValue={formValue}
      formErrors={formErrors}
      isFormValid={isFormValid}
      onFormChange={onFormChange}
      />
     
    <Errortext
     formErrors={formErrors} >

     </Errortext>

     <UserList
      userList={userList}
      setUserList={setUserList}
      />

    </div>
    </>
  
  )
}

export default App;
