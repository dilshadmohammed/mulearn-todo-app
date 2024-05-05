import { FormEvent, useState } from 'react';
import Moon from '../components/Moon';
import Sun from '../components/Sun';

interface ThemeState {
    darkTheme: boolean;
    setDarkTheme: (value: boolean) => void;
}

function Signup({ darkTheme, setDarkTheme }: ThemeState) {
    const [signUp, setSignUp] = useState(false);
    const [userName, setUserName] = useState('');
    const [passwd, setPasswd] = useState('');
    const [err,setErr] = useState(false)

    const signInHandler = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')||"") || [];
    
        const user:{userName:string,passwd:string} = existingUsers.find((user:{userName:string,passwd:string}) => user.userName === userName && user.passwd === passwd);
    
        if (user) {
          console.log('Sign in successful');
          localStorage.setItem('user', JSON.stringify(userName));
          localStorage.setItem('signedIn', JSON.stringify(true));
          window.location.reload()
        } else {
          console.log('Invalid credentials');
          setErr(true)
        }
      };
    const signUpHandler = () => {
        const existingUsersJSON = localStorage.getItem('users');
        const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
        const newUser = { userName, passwd};
    

        const updatedUsers = [...existingUsers, newUser];

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        console.log("signedup user")
        setSignUp(false)
      };

      const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
                if(signUp)
                    signUpHandler()
                else
                    signInHandler()

      }

    return (
        <div style={{ backgroundColor: 'light-gray' }} className='h-fit p-5'>

            <div className="bg-[url('banner.jpg')] bg-no-repeat bg-cover h-[18.75rem]"></div>
            <main className='w-[540px] mx-auto -mt-20' >
                <br /><br /><br />
                <div className='flex justify-between items-center mb-11' >
                    <h1 className='text-white text-6xl tracking-[1.2rem]'>{signUp ? "SIGN UP" : "SIGN IN"}</h1>
                    <div onClick={() => { setDarkTheme(!darkTheme) }} className="w-8 h-8 cursor-pointer">
                        {darkTheme ? <Moon /> : <Sun />}
                    </div>
                </div>
                <form className='flex flex-col mb-5 rounded-md ' onSubmit={handleSubmit} >

                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-white dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='text'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        title='username'
                        placeholder='username'
                    />
                    <br />
                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-gray-400 dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='password'
                        value={passwd}
                        onChange={e => setPasswd(e.target.value)}
                        title='password'
                        placeholder='password'
                    />
                </form>
                <div className='bg-#ffffff dark:bg-20242a rounded-md shadow-lg' style={{ 'backgroundColor': `${darkTheme ? '#20242a' : 'white'}` }}>

                </div>
                <div className='text-center bg-bright-blue hover:opacity-90 rounded-lg p-2 mt-10 mb-10 mx-auto text-primary-txt dark:text-dark-primary-txt' onClick={signUp ? signUpHandler : signInHandler}>
                    {signUp ? "Sign Up" : "Sign In"}
                </div>
                <small className='mx-auto' style={{color:'red'}}>{err && "Invalid username or password"}</small>
                
                <div className='flex justify-center' onClick={() =>{ setSignUp(!signUp); setErr(false)}}>
                    <small>
                        {signUp ? (
                            <span>
                                Already have an account?{" "}
                                <span className="underline cursor-pointer">
                                    SignIn
                                </span>
                            </span>
                        ) : (
                            <span>
                                Dont have an account?{" "}
                                <span className="underline cursor-pointer">
                                    SignUp
                                </span>
                            </span>
                        )}
                    </small>
                </div>
            </main>
        </div>
    )
}

export default Signup;
