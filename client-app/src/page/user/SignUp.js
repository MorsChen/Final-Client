import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import useForm from "react-hook-form";
// import { Form, Col, InputGroup, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// const URL = `https://127.0.0.1:5000/`
export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            isSignin: false,
            firsname: "",
            lastname: "",
            email: "",
            password: "",
            repassword: "",
            address: "",
            birthday: new Date(),
            phone: "",
            city: "",
            state: "",
            zipcode: "",
        };
      }

    handleRegister = async e => {
        e.preventDefault();
        if (this.state.password !== this.state.repassword) {
            alert("Password and Password confirm must match");
        }
        else {
            let newuser = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            birthday: this.state.birthday,
            phone: this.state.phone,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            };
            console.log(newuser)
            const response = await fetch(`https://127.0.0.1:5000/users/register`, {
            method: "POST",
            body: JSON.stringify(newuser),
            headers: new Headers({
                "Content-Type": "application/json"
            })
            });
            const data = await response.json()
            console.log("check resp from login",data)
            if (data.status === 200) {
                localStorage.setItem('token', data.token)
                this.setState({
                    user: data.user,
                })
               return window.location.replace(`http://localhost:3000/`);
            }
            else return alert('something wrong') 
        }
    };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
    };
    handleDate = date => {
        this.setState({
            birthday: date
        });
    };

    render() {
        console.log("check username",this.state.username);
        console.log(this.state.birthday.toISOString().slice(0, 10))
        console.log(new Date().toISOString().slice(0, 10))
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                    <label for="exampleInputEmail1">Username</label>
                    <input

                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter your username"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input

                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="Enter your firstname"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Last Name</label>
                    <input

                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Enter your lastname"
                        autoFocus
                        required={true}
                    />
                    </div>
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
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
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
                    <div className="form-group">
                    <label for="exampleInputPassword1">Confirm password</label>
                    <input
                        type="password"
                        name="repassword"
                        className="form-control"
                        required={true}
                        placeholder="Re-enter password"
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Your Birthday</label>
                    <DatePicker
                    selected={this.state.birthday}
                    onChange={this.handleDate}
                    required={true}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    />
                    </div>

                    <div className="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input

                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter your address"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">city</label>
                    <input

                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Enter your city"
                        autoFocus
                        required={true}
                    />
                    </div><div className="form-group">
                    <label for="exampleInputEmail1">Number Phone</label>
                    <input

                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter your number phone"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">State</label>
                    <input

                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="Enter your state"
                        autoFocus
                        required={true}
                    />
                    </div><div className="form-group">
                    <label for="exampleInputEmail1">ZipCode</label>
                    <input

                        type="text"
                        name="zipcode"
                        className="form-control"
                        placeholder="Enter Zip Code"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Signup
                    </button>
                </form>
                </div>
            </div>
            </div>
        );
    }
}
    // componentDidMount() {}

    //     const input = {
    //         firsname,
    //         lastname,
    //         email,
    //         password,
    //         repassword,
    //         address,
    //         birth,
    //         phone,
    //         city,
    //         state,
    //         zipcode,
    //     };
    //     if (title && body) {
    //     const response = await fetch(`${URL}/register`, {
    //         method: "POST",
    //         body: JSON.stringify(input),
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
                
    //         }
    //     });
    //     if (response.ok) {
    //         M.toast({
    //         html: "Successfully create issue!",
    //         classes: "green"
    //         });
    //         this.props.fetchIssues();
    //     } else {
    //         alert(`Unsuccessful response: ${response.statusText}`);
    //     }
    //     console.log("RESPONSE", response);
    //     } else {
    //     M.toast({
    //         html: "You need to fill the required fields",
    //         classes: "amber darken-1"
    //     });
    // }

//     const { register} = useForm()
//     const [validated, setValidated] = useState(false);
    
//     const handleSubmit = event => {
//         event.preventDefault();
//         const data = new FormData(event.target);
//         const form =event.currentTarget;
//         if (!form.checkValidity()) {
//             event.preventDefault();
//             console.log("check true",data);
//             event.stopPropagation(); 
//         }
//         setValidated(true);
//         };
        

//         return (
//             <div className="FullContent">
//                 <div><h3>Sign Up</h3></div>
//                 <Form className="form-content" noValidate validated={validated} onSubmit={handleSubmit}>
//                     <Form.Row>
//                         <Form.Group as={Col} md="4">
//                         <Form.Label>First name</Form.Label>
//                         <Form.Control
//                             required
//                             type="text"
//                             name="firstname"
//                             placeholder="First name"
//                             ref={register}
//                         />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please insert you first name.
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="4">
//                         <Form.Label>Last name</Form.Label>
//                         <Form.Control
//                             required
//                             type="text"
//                             name="lastname"
//                             placeholder="Last name"
//                             ref={register}
//                         />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please insert you last name.
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="4">
//                         <Form.Label>Username</Form.Label>
//                         <InputGroup>
//                             <InputGroup.Prepend>
//                             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             aria-describedby="inputGroupPrepend"
//                             required
//                             ref={register}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                             Please choose a username.
//                             </Form.Control.Feedback>
//                         </InputGroup>
//                         </Form.Group>
//                         <Form.Group as={Col} md="4">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control 
//                             required
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             ref={register} />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input your email.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group as={Col} md="4">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control 
//                             required 
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             ref={register} />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input password.
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="4">
//                             <Form.Label>Re-Password</Form.Label>
//                             <Form.Control 
//                             required 
//                             type="password"
//                             name="repassword"
//                             placeholder="Password"
//                             ref={register} />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input password.
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="4">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Control as="select" name="gender" ref={register}>
//                             <option value="male">male</option>
//                             <option value="female">female</option>
//                         </Form.Control>
//                         </Form.Group>

//                         <Form.Group as={Col} md="6">
//                             <Form.Label>Birthday</Form.Label>
//                             <Form.Control 
//                             required 
//                             type="day"
//                             name="birth"
//                             placeholder="Birthday"
//                             ref={register} />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input you phone.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group as={Col} md="4">
//                             <Form.Label>Number Phone</Form.Label>
//                             <Form.Control 
//                             required 
//                             type="number"
//                             name="phone"
//                             placeholder="Phone"
//                             ref={register} />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input you phone.
//                             </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="4">
//                             <Form.Label>Address</Form.Label>
//                             <Form.Control 
//                             required 
//                             type="address"
//                             name="address"
//                             placeholder="Address"
//                             ref={register} />
//                         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                         <Form.Control.Feedback type="invalid">
//                             Please input your Address.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                     </Form.Row>
//                     <Form.Row>
//                         <Form.Group as={Col} md="6">
//                         <Form.Label>City</Form.Label>
//                         <Form.Control type="text" placeholder="City" name="city" required ref={register}/>
//                         <Form.Control.Feedback type="invalid">
//                             Please provide a valid city.
//                         </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="3">
//                         <Form.Label>State</Form.Label>
//                         <Form.Control type="text" placeholder="State" name="state" required ref={register}/>
//                         <Form.Control.Feedback type="invalid">
//                             Please provide a valid state.
//                         </Form.Control.Feedback>
//                         </Form.Group>
//                         <Form.Group as={Col} md="3">
//                         <Form.Label>Zip code</Form.Label>
//                         <Form.Control type="text" placeholder="Zip code" name="zipcode" required ref={register}/>
//                         <Form.Control.Feedback type="invalid">
//                             Please provide a valid zip.
//                         </Form.Control.Feedback>
//                         </Form.Group>
//                     </Form.Row>
//                     <Form.Group>
//                         <Form.Check
//                         required
//                         label="Agree to terms and conditions"
//                         feedback="You must agree before submitting."
//                         />
//                     </Form.Group>
//                     <Button type="submit">Sign in</Button>
//                 </Form>
//             </div>


//         )
// }
// export default SignUp;


// import useForm from 'react-hook-form'

// function SignUp() {
//     const [validated, setValidated] = useState(false);
//     const { register, handleSubmit } = useForm()
//     const onSubmit = data => console.log(data)
   
//   return (
//     <div className="FullContent">
//         <h3>REGISTER</h3>
        
//         <Form className="form-content" noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
//         <Form.Row>
//         UserName   :<input name="username" type="username" placeholder="User Name" ref={register} />
//         First Name :<input name="firstname" type="firstname" placeholder="First Name" ref={register} />
//         Last Name  :<input name="lastname" type="lastname" placeholder="Last Name" ref={register} />
//         Password   :<input name="password" type="password" placeholder="Password" ref={register} />
//         Re-Password:<input name="re-password" type="password" placeholder="Re-Password" ref={register} />
//         </Form.Row>
//         Gender     :<select name="gender" ref={register}>
//                             <option value="male">male</option>
//                             <option value="female">female</option>
//                         </select>
//         Birthday   :<input name="birthday" type="brithday" placeholder="Birthday" ref={register} />
//         Address    :<input name="address" type="address" placeholder="Address" ref={register} />
//         Num.Phone  :<input name="phone" type="number" placeholder="Number Phone" ref={register} />
//         City       :<input name="city" type="city" placeholder="City" ref={register} />
//         State      :<input name="state" type="state" placeholder="State" ref={register} />
//         ZipCode    :<input name="zipcode" type="zip" placeholder="ZipCode" ref={register} />
//         <input type="submit" class="btn"/>
//         </Form>
//     </div>
//   );
// }

// export default SignUp