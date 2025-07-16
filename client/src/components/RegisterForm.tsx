import { useState } from "react";
import { authClient } from "../lib/auth-client";

function RegisterForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data:", formData);
		await authClient.signUp.email(
			{
				email: formData.email,
				password: formData.password,
				name: formData.name,
			},
			{
				onSuccess: (ctx) =>
					console.log("User registered successfully" + ctx),
			}
		);
	};

	const signInWithSocial = async (method: any) => {
		try {
			const data = await authClient.signIn.social({
				provider: method,
				callbackURL: import.meta.env.VITE_BASE_URL,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
				<form onSubmit={handleSubmit}>
					<h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
						Create an Account
					</h2>

					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 font-medium mb-2"
						>
							Name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-medium mb-2"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium mb-2"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
					>
						Register
					</button>
				</form>
				<div className="flex items-center gap-5 my-1">
					<div className="h-px w-full bg-gray-400/50"></div>
					<span>or</span>
					<div className="h-px w-full bg-gray-400/50"></div>
				</div>
				<button
					onClick={() => signInWithSocial("google")}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
				>
					Google
				</button>
				<button
					onClick={() => signInWithSocial("github")}
					className="w-full bg-blue-600 hover:bg-blue-700 mt-1.5 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
				>
					Github
				</button>
			</div>
		</div>
	);
}

export default RegisterForm;
