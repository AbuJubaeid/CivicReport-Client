import axios from "axios";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const CreateIssue = () => {
    const {register, handleSubmit, formState: {errors},} = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useHook()


    const handleCreateReport = data =>{
        console.log(data)
        const profileImg = data.image[0]
        // prepare data for the imgbb
            const formData = new FormData()
            formData.append('image', profileImg)

            const imageApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHostApiKey}`

            axios.post(imageApiURL, formData)
            .then(res=>{
              console.log('after image upload', res.data.data.url)})

              // send report to database
              axiosSecure.post('/reports', data)
              .then(res=>{
                console.log('after saving data to database', res.data)
              })
              .catch(error=>{
                console.log(error)
              })
    }
    return (
      <div>
        <h2>Report a issue</h2>
        <form onSubmit={handleSubmit(handleCreateReport)}>
          <fieldset className="fieldset">
            {/* sender name */}
                <label className="label">Name</label>
                <input 
                type="text" 
                {...register('name', {required: true})} 
                className="input" 
                defaultValue={user?.displayName}
                placeholder="Name" />
                {
                    errors.email?.type === 'required' && <p className="text-red-500">Name is required</p>
                }
            {/* sender email */}
                <label className="label">Email</label>
                <input 
                type="email" 
                {...register('email', {required: true})} 
                className="input" 
                defaultValue={user?.email}
                placeholder="Email" />
                {
                    errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
                }
            {/* image of issue */}
            <label className="label">Image</label>
            <input
              type="file"
              className="file-input file-input-ghost"
              {...register("image", { required: true })}
            />
            {
                    errors.image?.type === 'required' && <p className="text-red-500">Image is required</p>
                }

            {/* title */}
            <label className="label">Title</label>
            <input
              type="text"
              className="input"
              {...register("issue", { required: true })}
              placeholder="Type your issue here"
            />
            {
                    errors.issue?.type === 'required' && <p className="text-red-500">Issue is required</p>
                }

            {/* category */}
            <label className="label">Category</label>
            <select 
            defaultValue="Pick a category"
            {...register('select', {required: true})} 
            className="select">
              <option disabled={true}>Pick a category</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>

            {/*location */}
            <label className="label">Location</label>
            <input
              type="text"
              className="input"
              {...register("location", { required: true })}
              placeholder="Type your Location here"
            />
            {
                    errors.location?.type === 'required' && <p className="text-red-500">Location is required</p>
                }

            <button className="btn btn-neutral mt-4">Report</button>
          </fieldset>
        </form>
      </div>
    );
};

export default CreateIssue;