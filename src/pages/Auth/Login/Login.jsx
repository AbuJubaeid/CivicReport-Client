import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useHook from "../../../hooks/useHook";
import SocialLogin from "../socialLogin/SocialLogin";

const Register = () => {
    const {register, handleSubmit, formState: {errors} } = useForm()
    const { signInWithEmailAndPasswordFunc,} = useHook()

    const handleRegister = (data) =>{
        console.log("after submit",data)
        signInWithEmailAndPasswordFunc(data.email, data.password)
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error)
        })

    }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
              <fieldset className="fieldset">
                {/* email */}
                <label className="label">Email</label>
                <input 
                type="email" 
                {...register('email', {required: true})} 
                className="input" 
                placeholder="Email" />
                {
                    errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                }

                {/* password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register('password', {
                    required: true, 
                    minLength: 6,
                    pattern: /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/ 
                })}
                  className="input"
                  placeholder="Password"
                />
                {
                    errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>
                }
                {
                    errors.password?.type === 'minLength' && <p className="text-red-500">
                        Password must be 6 character or longer
                    </p>
                }
                {
                    errors.password?.type === 'pattern' && <p>
                        Password must have min 8, must include lowercase, uppercase, digit, special char (no spaces)
                    </p>
                }
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>
            <p className="text-center mb-2">Don't have an account? <Link className="text-blue-500"  to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
