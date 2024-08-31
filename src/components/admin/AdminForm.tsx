export default function AdminForm() {

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch("/api/saveToken", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log(data);

    }

    return (
        <form
            onSubmit={submit}
            class="mx-auto bg-gray-800 p-6 rounded-lg shadow-md"
        >
            <label for="text" class="block text-gray-200 font-semibold mb-2">
                Enter Token:
            </label>
            <textarea
                id="token"
                name="token"
                //@ts-ignore
                rows="4"
                class="w-full p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900 resize-none"
                placeholder="Enter your token"
                required
            ></textarea>
            <button
                type="submit"
                class="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
                Save Token
            </button>
        </form>
    );
}
