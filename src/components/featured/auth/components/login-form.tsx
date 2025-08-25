"use client"
import { useState } from 'react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        e.preventDefault();
        setError(null);

        const result = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (result?.error) {
            setError("Invalid email or password. Please try again");
            router.push("/auth/login");
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <Card className='w-full max-w-md p-6 shadow-md rounded-sm'>
            <div className="flex flex-col gap-4 items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 p-4 flex items-center justify-center">
                    <LogIn className='w-8 h-8 text-orange-500' />
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className='text-2xl font-medium'>Sign in with email</h1>
                    <p className='text-gray-400 text-center'>Access your account by entering your email and password below.</p>
                </div>
            </div>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <Input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 p-2 rounded-sm focus-visible:ring-0 focus:outline-none'
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='mb-4 relative'>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 p-2 pr-12 focus-visible:ring-0 focus:outline-none focus:border-black transition-colors rounded-sm'
                        placeholder='Password'
                        required
                    />
                    <Button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-black bg-transparent hover:bg-transparent"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
                    </Button>
                </div>
                {error && (
                    <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
                )}
                <Button
                    type='submit'
                    variant="secondary"
                    className='w-full focus:ring-0 focus:outline-none bg-orange-500 text-white hover:bg-orange-700 transition-colors duration-300 rounded-sm'
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Card>
    )
}

export default LoginForm