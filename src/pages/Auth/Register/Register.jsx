import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useHook from "../../../hooks/useHook";
import SocialLogin from "../socialLogin/SocialLogin";

const Register = () => {
    const {register, handleSubmit, formState: {errors} } = useForm()
    const { createUserWithEmailAndPasswordFunc, updateProfileFunc } = useHook()

    const handleRegister = (data) =>{
        console.log("after submit",data)
        const profileImg = data.photo[0]
        createUserWithEmailAndPasswordFunc(data.email, data.password)
        .then(result=>{
            console.log(result.user)
            // prepare data for the imgbb
            const formData = new FormData()
            formData.append('image', profileImg)

            const imageApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHostApiKey}`

            axios.post(imageApiURL, formData)
            .then(res=>{
              console.log('after image upload', res.data.data.url)

              // update user profile
              const userProfile = {
                displayName: data.name,
                photoURL: res.data.data.url
              }

              updateProfileFunc(userProfile)
              .then()
              .catch(error=>{
                console.log(error)
              })

            })
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
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input 
                type="text" 
                {...register('name', {required: true})} 
                className="input" 
                placeholder="Name" />
                {
                    errors.email?.type === 'required' && <p className="text-red-500">Name is required</p>
                }

                {/* photo */}
                <label className="label">Photo</label>
                <input 
                type="file" 
                {...register('photo', {required: true})} 
                className="file-input file-input-ghost" 
                placeholder="Your Photo" />
                {
                    errors.photo?.type === 'required' && <p className="text-red-500">Photo is required</p>
                }

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
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
            <SocialLogin></SocialLogin>
            <p className="text-center mb-2">Already have an account? <Link className="text-blue-500"  to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
