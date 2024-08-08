import { useForm, SubmitHandler} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { setToast } from "../redux/slice/toastSlice";
import { setAuthLogin } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import LoadingButton from "../components/LoadingButton";

 
type Inputs = {
    email: string,
    password: string,
};

const Login = () =>  {


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [loading, setLoading] = useState<boolean>(false)


    const loginHandler: SubmitHandler<Inputs> = async (payload) => {
        setLoading(true)
        try {
            const auth =  await login(payload)
            dispatch(setToast({ message: 'Đăng nhập vào hệ thống thành công', type: 'success' }))
            dispatch(setAuthLogin(auth))
            auth && navigate('/dashboard') 
        } catch (error) {
           

        } finally {
            setLoading(false); 
        }
    };
  

  return (
    <div className="min-h-screen pt-24 items-center justify-center bg-gray-100">
        
        <div className="max-w-screen-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4">
                    <h2 className="font-bold text-2xl mb-4 text-neutral-500">Welcome to HT Version 1.0.0+</h2>
                    <p className="mb-2 text-gray-500">
                        Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                    </p>
                    <p className="mb-2 text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                    <p className="mb-2 text-gray-500">
                        When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="bg-white p-5 rounded shadow-lg w-full max-w-md">
                    <form onSubmit={handleSubmit(loginHandler)}>
                        <div className="mb-4">
                            <input 
                                type="text"
                                id="email"
                                placeholder="Email" 
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 h-11"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500 text-xs">Bạn phải nhập vào email</span>}
                        </div>
                        <div className="mb-4">
                            <input 
                                type="password"
                                id="password"
                                placeholder="Mật khẩu" 
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 h-11"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500 text-xs">Bạn phải nhập vào mật khẩu</span>}
                        </div>
                        <div className="mb-2">
                            
                        </div>
                        <p className="text-gray-700 mb-2 text-xs">
                            <a href="/" className="text-blue-700">Quên mật khẩu</a>
                        </p>
                        <div className="description text-xs text-gray-700">
                            Chào mừng bạn đến với hệ thống bất động sản version 1.0 của HT
                        </div>
                        <LoadingButton loading={loading} text='Đăng nhập' />
                    </form>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Login;
