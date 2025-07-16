import { useState } from "react";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import { authClient } from "./lib/auth-client";

const App = () => {
	const { data: session, isPending } = authClient.useSession();
	const [authChoice, setAuthChoice] = useState<string | null>(null);

	const handleSignOut = async () => {
		await authClient.signOut();
		setAuthChoice(null);
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (session) {
		return (
			<div className="h-screen w-full flex flex-col justify-center items-center gap-5">
				<pre>{JSON.stringify(session, null, 2)}</pre>
				<p>{session.session.expiresAt.toLocaleString()}</p>
				<button
					className="bg-blue-500 rounded-md py-2 px-4 text-white font-semibold w-40"
					onClick={handleSignOut}
				>
					Sign Out
				</button>
			</div>
		);
	}

	// Ask user what they want to do
	if (!authChoice) {
		return (
			<div className="h-screen w-full flex flex-col justify-center items-center gap-5">
				<h2>Welcome! What would you like to do?</h2>
				<button
					className="bg-blue-500 rounded-md py-2 px-4 text-white font-semibold w-40"
					onClick={() => setAuthChoice("login")}
				>
					Log In
				</button>
				<button
					className="bg-blue-500 rounded-md py-2 px-4 text-white font-semibold w-40"
					onClick={() => setAuthChoice("register")}
				>
					Register
				</button>
			</div>
		);
	}

	return <div>{authChoice === "login" ? <Login /> : <RegisterForm />}</div>;
};

export default App;
