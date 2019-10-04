import React, {Component} from "react";
// import { Form, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isSignin: false,
            email: "",
            password: "",
            user: {},
        };
      }

    handleLogin = async e => {
        e.preventDefault();
        // const response = await fetch(`https://127.0.0.1:5000/users/login`)
        // const data = response.json()
        // console.log ("check", data)
        // if (this.state.password !== this.state.repassword) {
        //     alert("Password and Password confirm must match");
        // }
       
        let userlogin = {
        email: this.state.email,
        password: this.state.password,
        };
        console.log("check e.target",userlogin)
        const response = await fetch(`https://127.0.0.1:5000/users/login`, {
            method: "POST",
            body: JSON.stringify(userlogin),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        const data = await response.json()
        console.log("check resp from login",data)
        if (data.status === 200) {
            this.sendToken(data.token)
            localStorage.setItem('token', data.token)
            this.setState({
                user: data.user,
            })
            return window.location.replace(`http://localhost:3000/`);}
            else {return alert('something wrong')}
        };

    sendToken=(token)=>{
        this.props.getToken({token: token})
    }
//     isSignin = () =>{
//     if (this.state.token !== null){
//       this.setState({ isSignin : true})
//     }else {
//       this.setState({isSignin: false})
//     }
//   }


    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        };

    render() {
        console.log("check email",this.state.email);
        
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form  
                    onSubmit={e => this.handleLogin(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required={true}
                        
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small> */}
                    </div>
                    <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        required={true}
                    />
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Login
                    </button>
                </form>
                </div>
            </div>
            </div>
        );
    }
}

// function Login() {
   
//     const [validated, setValidated] = useState(false);

//     const handleSubmit = event => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//         }

//         setValidated(true);
//     };

//         return (
//             <div className="FullContent">
//                 <div><h3>Login</h3></div>
//                 <Form className="form-content" noValidate validated={validated} onSubmit={handleSubmit}>
//                     <Form.Row>
//                         <Form.Group as={Col} md="6" controlId="formHorizontalEmail">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control 
//                             required
//                             type="email" 
//                             placeholder="Email" />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input your email.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group as={Col} md="6" controlId="formHorizontalPassword">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control 
//                             required 
//                             type="password" 
//                             placeholder="Password" />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input password.
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                     </Form.Row>
//                     <Form.Group>
//                         <Form.Check
//                         label="Remember Me"
//                         />
//                     </Form.Group>
//                     <Button type="submit">Sign in</Button>

//                     <Button onClick={()=>window.location.replace("https://127.0.0.1:5000/login/facebook")}>Sign in with FaceBook</Button>
//                 </Form>
//             </div>


//         )
// }
// export default Login;


// class Login extends React.Component {
//     constructor() {
//       super();
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleSubmit(event) {
//         event.preventDefault();
//         const data = new FormData(event.target);

//         const [month, day, year] = data.get('birthdate').split('/');
//         const serverDate = `${year}-${month}-${day}`;

//         data.set('birthdate', serverDate);
//         data.set('username', data.get('username').toUpperCase());
        
//         for (let name of data.keys()) {
//             const input = form.elements[name];
//             const parserName = input.dataset.parse;
      
//             if (parserName) {
//               const parser = inputParsers[parserName];
//               const parsedValue = parser(data.get(name));
//               data.set(name, parsedValue);
//             }
//           }

//         console.log("check data", data)
//     //   fetch('/api/form-submit-url', {
//     //     method: 'POST',
//     //     body: data,
//     //   });
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="username">Enter username</label>
//           <input id="username" name="username" type="text" />
  
//           <label htmlFor="email">Enter your email</label>
//           <input id="email" name="email" type="email" />
  
//           <label htmlFor="birthdate">Enter your birth date</label>
//           <input id="birthdate" name="birthdate" type="text" data-parse="date" />
  
//           <button>Send data!</button>
//         </form>
//       );
//     }
//   }

//   export default Login