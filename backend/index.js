const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./src/config/serverConfig');
const connectDB = require('./src/config/dbConfig');
const routes = require('./src/routes');
const User = require('./src/modles/user');



const { GoogleGenerativeAI } = require("@google/generative-ai");



const app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true,
}))
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);

app.get('/home', (req, res) => {
    res.send("hello")
})


async function analyzeResume() {
    const genAI = await new GoogleGenerativeAI("AIzaSyDCTVFDumnsoJNaFffpdFcisObZfy_Bmds");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const resumeText = `Smit Dankhra + 918866098942 | smitdankhra86@gmail.com | linkedin.com / smit | github.com / smit | leetcode.com / smit Introduction I am currently pursuing my Master of Computer Applications from Dharamsinh Desai University.Aspiring to expand my horizons, I am passionate about learning new technologies and contributing to innovative projects.I am particularly interested in joining your company to apply my skills and knowledge in a dynamic work environment.Additionally, I have actively engaged in problem - solving and have solved over 250 questions on LeetCode.I have also demonstrated my versatility by winning several technical and non - technical events, showcasing my ability to excel in different domains.Education DHARMSINH DESAI UNIVERSITY Nadiad, Guj Master of Computer Applications(Current CGPA: 8.20) Aug. 2023 – May 2025 Veer Narmad South Gujarat University Surat, Guj Bachelor of Computer Applications(CGPA: 8.74) Aug. 2020 – May 2023 Technical Skills Languages HTML, CSS, JavaScript, Java, C, SQL, MongoDB Frameworks and Libraries React, Redux toolkit, Node.js, Tailwind CSS Tools Docker, Git and GitHub Projects Food Point | React.js, Node.js, Express.js, MongoDB, Tailwind CSS code • Developed a full - stack web application with React.js for the frontend and Node.js / Express.js for the backend • Designed four models: Customer, Admin, Restaurant User, and Delivery Boy • Implemented a payment system and order tracking functionality • Used MongoDB for data storage and Tailwind CSS for styling Chat App | React.js, Node.js, Socket.IO, MongoDB, Tailwind CSS code • Developed a real - time chat application with React.js for the frontend and Node.js / Socket.IO for the backend • Implemented end - to - end user chat functionality • Enabled users to create and join groups for communication • Used MongoDB for data persistence Achievements • Chess Champion(1st Place):in Inter - College Competition(2021) - Demonstrated strategic thinking and problem - solving skills under pressure. • Ignite 2024(2nd Place): Secured the runner - up position in a chess competion • Treasure Hunt Winner(1st Place): Cyber Shadez 2024 - Showcased teamwork, critical thinking, and problem - solving abilities in a fast - paced environment. • Code Jigsaw Champion(1st Place): Cyber Shadez 2024 - Exhibited strong coding skills and problem - solving aptitude.`;
        const prompt = `Analyze the following resume and provide detailed suggestions for improvement:\n${resumeText} give me answer in **Strengths:** ,**Areas for Improvement:**,**1. Introduction:**,**2. Education:**,**3. Technical Skills:**,**4. Projects:**,**5. Achievements:**,**6. Formatting:**,**7. Tailoring:**`;

        const response = await model.generateContent(prompt);
        console.log('Response:', response.response.candidates[0].content.parts);

        // const suggestions = response.data.choices[0].text.trim().split('\n').filter(s => s);
        
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
}

const setupAndStartServer = async () => {
    app.listen(ServerConfig.PORT, async () => {
        try {
            await connectDB();
            
            console.log(`Server is running on port ${ServerConfig.PORT}`);
            
            analyzeResume();
        } catch (error) {
            console.log("Not able to connect to the mongodb server");
            console.log(error);
        }
        
        
    });


}

setupAndStartServer();