const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const frontendDir = path.resolve(__dirname, "..");
const projectDir = path.resolve(frontendDir, "..");

const distDir = path.join(frontendDir, "dist");

const staticDir = path.join(
    projectDir,
    "src",
    "main",
    "resources",
    "static"
);

console.log("Building React application...");

execSync("vite build", {
    cwd: frontendDir,
    stdio: "inherit"
});

console.log("Copying React build to Spring Boot static folder...");

fs.mkdirSync(staticDir, { recursive: true });

// Delete old Spring Boot static files
for (const file of fs.readdirSync(staticDir)) {
    fs.rmSync(path.join(staticDir, file), {
        recursive: true,
        force: true
    });
}

// Copy React production build
fs.cpSync(distDir, staticDir, {
    recursive: true
});

console.log("React build copied successfully!");
console.log(`Output: ${staticDir}`);
