import React, {Component, useState } from "react";
import useForm from "react-hook-form";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = `https://127.0.0.1:5000/`
function SignUp() {
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

    const { register, handleSubmit} = useForm()
    const [validated, setValidated] = useState(false);
    const check = (data) => {    
        const onSubmit = data => console.log(data)
        handleSubmit(onSubmit)
        const onCheck = data => {
            const form = data.currentTarget;
            if (form.checkValidity() === false) {
                data.preventDefault();
                console.log("check true",data);
                data.stopPropagation();
                console.log("check",data)
            }
            setValidated(true);
            return onCheck()
            };}
        

        return (
            <div className="FullContent">
                <div><h3>Sign Up</h3></div>
                <Form className="form-content" noValidate validated={validated} onSubmit={(data)=>check(data)}>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="firstname"
                            placeholder="First name"
                            ref={register}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please insert you first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="lastname"
                            placeholder="Last name"
                            ref={register}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please insert you last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            type="text"
                            name="username"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                            ref={register}
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            ref={register} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input your email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            required 
                            type="password"
                            name="password"
                            placeholder="Password"
                            ref={register} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Re-Password</Form.Label>
                            <Form.Control 
                            required 
                            type="password"
                            name="repassword"
                            placeholder="Password"
                            ref={register} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" name="gender" ref={register}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control 
                            required 
                            type="day"
                            name="birth"
                            placeholder="Birthday"
                            ref={register} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input you phone.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Label>Number Phone</Form.Label>
                            <Form.Control 
                            required 
                            type="number"
                            name="phone"
                            placeholder="Phone"
                            ref={register} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input you phone.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                            required 
                            type="address"
                            name="address"
                            placeholder="Address"
                            ref={register} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please input your Address.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" name="city" required ref={register}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State" name="state" required ref={register}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                        <Form.Label>Zip code</Form.Label>
                        <Form.Control type="text" placeholder="Zip code" name="zipcode" required ref={register}/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        />
                    </Form.Group>
                    <Button type="submit">Sign in</Button>
                </Form>
            </div>


        )
}
export default SignUp;


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