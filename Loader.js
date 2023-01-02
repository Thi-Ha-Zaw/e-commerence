import { loader } from "./main"

export const Loader = function () {
    // const loader = document.getElementById("loader");
    loader.innerHTML = `
            <div class=" d-flex min-vh-100 justify-content-center align-items-center fixed-top bg-white">
                <div class="spinner-border text-info Loader" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `
}